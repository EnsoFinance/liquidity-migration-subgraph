import {
  Staked,
  OwnershipTransferred,
} from "../generated/LiquidityMigration/LiquidityMigration";
import { createStakedEvent } from "./entities/stakedEvent";
import { AdapterV1 } from "../generated/schema";
import { adaptersV1, adaptersNames, Coordinator, ZERO_BI } from "./constants";
import { ensureStakedToken } from "./entities/StakedToken";
import { ensureUser } from "./entities/user";
import { ensureToken } from "./entities/Token";

export function handleStaked(event: Staked): void {
  // To avoid duplicates from the V2 migration, we filter the coorinator address
  if (event.transaction.from.toHexString() === Coordinator) {
    return;
  }

  // To create the entities, we require staked amount greater than zero
  if (!event.params.amount.gt(ZERO_BI)) {
    return;
  }

  createStakedEvent(event);

  ensureUser(event.params.account);

  let adapter = AdapterV1.load(event.params.adapter.toHex());
  if (adapter === null) {
    return;
  }
  adapter.staked = adapter.staked + 1;
  adapter.save();

  let token = ensureToken(event.params.strategy);

  let stakedTokenId =
    event.params.strategy.toHexString() +
    "-" +
    event.params.account.toHexString();
  let strategyToken = ensureStakedToken(stakedTokenId);
  strategyToken.amount = strategyToken.amount.plus(
    event.params.amount.toBigDecimal()
  );
  strategyToken.owner = event.params.account.toHexString();
  strategyToken.token = token.id;
  strategyToken.save();
}

// This is the first event in the contract. It will be used to create Adapters entities
export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  for (let i = 0; i < adaptersV1.length; i++) {
    let adapter = AdapterV1.load(adaptersV1[i]);
    if (!adapter) {
      adapter = new AdapterV1(adaptersV1[i]);
      adapter.name = adaptersNames[i];
      adapter.staked = 0;
      adapter.save();
    }
  }
}
