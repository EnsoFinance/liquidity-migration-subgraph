import { Staked } from "../../generated/LiquidityMigration/LiquidityMigration";
import { StakedEvent } from "../../generated/schema";

export function createStakedEvent(event: Staked): void {
  let stakedEvent = new StakedEvent(event.transaction.hash.toHex());
  stakedEvent.staker = event.params.account.toHexString();
  stakedEvent.adapter = event.params.adapter.toHexString();
  stakedEvent.strategy = event.params.strategy.toHexString();
  stakedEvent.amount = event.params.amount.toBigDecimal();
  stakedEvent.save();
}
