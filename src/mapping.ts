import { Staked } from "../generated/LiquidityMigration/LiquidityMigration";
import { createStakedEvent } from "./entities/stakedEvent";

export function handleStaked(event: Staked): void {
  createStakedEvent(event);
}
