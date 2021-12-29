import {
  Staked,
  OwnershipTransferred,
} from "../generated/LiquidityMigration/LiquidityMigration";
import { createStakedEvent } from "./entities/stakedEvent";
import { AdapterV1 } from "../generated/schema";
import { adaptersV1, adaptersNames } from "./constants";
import { ensureStrategyToken } from "./entities/Token";
import { ensureUser } from "./entities/user";

export function handleStaked(event: Staked): void {
  createStakedEvent(event);

  ensureUser(event.params.account);

  let adapter = AdapterV1.load(event.params.adapter.toHex());
  if (adapter === null) {
    return;
  }
  adapter.staked = adapter.staked + 1;
  adapter.save();

  let strategyToken = ensureStrategyToken(event.params.strategy);
  strategyToken.amount = strategyToken.amount.plus(
    event.params.amount.toBigDecimal()
  );
  strategyToken.owner = event.params.account.toHexString();
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
