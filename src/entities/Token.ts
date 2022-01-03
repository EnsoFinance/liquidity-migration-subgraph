import { BigDecimal } from "@graphprotocol/graph-ts";
import { StakedToken } from "../../generated/schema";

export function ensureStakedToken(stakedTokenId: string): StakedToken {
  let token = StakedToken.load(stakedTokenId);
  if (token) {
    return token;
  }

  token = new StakedToken(stakedTokenId);
  token.amount = BigDecimal.fromString("0");
  token.save();

  return token;
}
