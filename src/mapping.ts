import {
  Staked,
  OwnershipTransferred,
} from "../generated/LiquidityMigration/LiquidityMigration";
import { createStakedEvent } from "./entities/stakedEvent";
import { ensureAdapters, useAdapter } from "./entities/adapter";

export function handleStaked(event: Staked): void {
  createStakedEvent(event);
  let adapter = useAdapter(event.params.adapter.toHexString());
  adapter.staked = adapter.staked + 1;
  adapter.save();
}

// This is the first event in the contract. It will be used to create Adapters entities
export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  ensureAdapters();
}
