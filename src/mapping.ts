import {
  Staked,
  OwnershipTransferred,
} from "../generated/LiquidityMigration/LiquidityMigration";
import { createStakedEvent } from "./entities/stakedEvent";
import { ensureAdapters } from "./entities/adapter";

export function handleStaked(event: Staked): void {
  createStakedEvent(event);
}

// This is the first event in the contract. It will be used to create Adapters entities
export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  ensureAdapters();
}
