import {
  Staked,
  OwnershipTransferred,
} from "../generated/LiquidityMigration/LiquidityMigration";
import { createStakedEvent } from "./entities/stakedEvent";
import { Adapter } from "../generated/schema";
import { adapters, adaptersNames } from "./constants";

export function handleStaked(event: Staked): void {
  createStakedEvent(event);

  let adapter = Adapter.load(event.params.adapter.toHexString());
  if (adapter) {
    adapter.staked = adapter.staked + 1;
    adapter.save();
  }
}

// This is the first event in the contract. It will be used to create Adapters entities
export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  for (let i = 0; i < adapters.length; i++) {
    let adapter = Adapter.load(adapters[i]);
    if (adapter != null) {
      return;
    }
    adapter = new Adapter(adapters[i]);
    adapter.name = adaptersNames[i];
    adapter.staked = 0;
    adapter.save();
  }
}
