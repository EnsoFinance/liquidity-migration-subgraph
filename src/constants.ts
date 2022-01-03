import { BigInt } from "@graphprotocol/graph-ts";

export const LiquidityMigration = "0x0092DECCA5E2f26466289011ad41465763BeA4cE";
export const ERC1155 = "0x3a1c88addeC56e725ba2a432bC89eeaA5D068753";
export const Claimable = "0xE39d9712F3749b9663627331d9BCa15Ac69b6170";
export const Coordinator = "0x6CD0df59370B38261E251Bd786B2f320595005d1";

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export let adaptersV1 = new Array<string>();
adaptersV1 = [
  "0x9c9326c521895c78414bd3c2945e47afc4ef16cc",
  "0x8f516c0fb0bcf44cfc8d42d60dad3e4cdb35ce26",
  "0x0a883a62660328ead442eb6c2311668ba9c12e57",
  "0x5f2c716d912ce400a8a49fb87db722e8257257a7",
  "0xae6859311c341bac4e0bceca0242247c16718ff1",
  "0xe149b1f2ef564a289dc094215835f3c8df1695aa",
];

export let adaptersNames = new Array<string>();
adaptersNames = [
  "IndexCoopAdapter",
  "IndexedAdapter",
  "PowerPoolAdapter",
  "TokenSetsAdapter",
  "DHedgeAdapter",
  "PieDaoAdapter",
];

export const ZERO_BI = BigInt.fromString("0");
