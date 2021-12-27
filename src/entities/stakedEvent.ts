import { Staked } from "../../generated/LiquidityMigration/LiquidityMigration";
import { StakedEvent } from "../../generated/schema";

export function createStakedEvent(event: Staked): void {
  let stakedEvent = new StakedEvent(event.transaction.hash.toHex());
  stakedEvent.staker = event.params.account;
  stakedEvent.adapter = event.params.adapter;
  stakedEvent.strategy = event.params.strategy;
  stakedEvent.save();
}
