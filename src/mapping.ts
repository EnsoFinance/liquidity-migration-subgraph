import {
  Staked,
  OwnershipTransferred,
  Refunded,
} from "../generated/LiquidityMigration/LiquidityMigration";
import { createStakedEvent } from "./entities/StakedEvent";
import { Adapter } from "../generated/schema";
import { adaptersV1, adaptersNames, Migrator, ZERO_BI } from "./constants";
import { createStakedTokenId, ensureStakedToken, useStakedToken } from "./entities/StakedToken";
import { ensureUser } from "./entities/user";
import { ensureToken, useToken } from "./entities/Token";
import { ensureLiquidityMigration } from "./entities/LiquidityMigration";
import { Address } from "@graphprotocol/graph-ts";
import {createRefundedEvent} from "./entities/RefundEvent";
import {createFilteredStakedEvent} from "./entities/FilteredStakeEvent";

export function handleStaked(event: Staked): void {
  // To avoid duplicates from the V2 migration, we filter the coorinator address owner
  if (event.transaction.from.equals(Address.fromString(Migrator))) {
    createFilteredStakedEvent(event);
    return;
  }

  // To create the entities, we require staked amount greater than zero
  if (!event.params.amount.gt(ZERO_BI)) {
    return;
  }

  createStakedEvent(event);

  ensureUser(event.params.account);

  let adapter = Adapter.load(event.params.adapter.toHex());
  if (adapter === null) {
    return;
  }
  adapter.staked = adapter.staked + 1;
  adapter.save();

  let strategy = event.params.strategy
  let account = event.params.account

  let token = ensureToken(event.params.strategy);
  token.stakedAmount = token.stakedAmount.plus(
    event.params.amount.toBigDecimal()
  );
  token.save();

  let stakedTokenId = createStakedTokenId(strategy,account)
  let strategyToken = ensureStakedToken(stakedTokenId);
  strategyToken.amount = strategyToken.amount.plus(
    event.params.amount.toBigDecimal()
  );
  strategyToken.owner = event.params.account.toHexString();
  strategyToken.token = token.id;
  strategyToken.save();
}

// This is the first event in the contract. It will be used to create Adapters and migration entities
export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  ensureLiquidityMigration();
  for (let i = 0; i < adaptersV1.length; i++) {
    let adapter = Adapter.load(adaptersV1[i]);
    if (!adapter) {
      adapter = new Adapter(adaptersV1[i]);
      adapter.name = adaptersNames[i];
      adapter.staked = 0;
      adapter.save();
    }
  }
}

export function handleRefunded(event: Refunded): void {
  createRefundedEvent(event);

  let lp = event.params.lp
  let account = event.params.account
  let amount = event.params.amount

  let token = useToken(lp)
  token.stakedAmount = token.stakedAmount.minus(
    amount.toBigDecimal()
  );
  token.save();
 

  let stakedTokenId =createStakedTokenId(lp,account)  
  let strategyToken = useStakedToken(stakedTokenId);

  strategyToken.amount = strategyToken.amount.minus(
    amount.toBigDecimal()
  );

  strategyToken.save();
}
