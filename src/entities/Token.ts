import { Address, BigDecimal } from "@graphprotocol/graph-ts";
import { StrategyToken } from "../../generated/schema";

export function ensureToken(address: Address): StrategyToken {
  let token = StrategyToken.load(address.toHexString());
  if (token) {
    return token;
  }

  token = new StrategyToken(address.toHex());
  token.amount = BigDecimal.fromString("0");
  token.save();

  return token;
}
