import { Address, BigDecimal } from "@graphprotocol/graph-ts";
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

export function useStakedToken(id: string): StakedToken {
  let token = StakedToken.load(id)!;
  return token;
}

export function createStakedTokenId(strategy:Address, account:Address): string {
  return strategy.toHexString() + "-" + account.toHexString();
}
