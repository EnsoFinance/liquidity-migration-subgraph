import { log } from "@graphprotocol/graph-ts";
import { Adapter } from "../../generated/schema";
import { adapters, adaptersNames } from "../constants";

export function ensureAdapters(): void {
  for (let i: i32 = 0; i < adapters.length; i++) {
    let adapter = Adapter.load(adapters[i]) as Adapter;
    if (adapter == null) {
      adapter = new Adapter(adapters[i]);
      adapter.name = adaptersNames[i];
      adapter.staked = 0;
      adapter.save();
    }
  }
}

export function useAdapter(adapterAddress: string): Adapter {
  let adapter = Adapter.load(adapterAddress) as Adapter;
  if (adapter == null) {
    log.critical("Adapter does not exist", []);
  }

  return adapter;
}
