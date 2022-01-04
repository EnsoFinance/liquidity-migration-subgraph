import { Address } from "@graphprotocol/graph-ts";
import { Token } from "../../generated/schema";
import {
  getTokenName,
  getTokenSymbol,
  getTokenDecimals,
} from "../helpers/tokens";

export function ensureToken(address: Address): Token {
  let token = Token.load(address.toHexString());
  if (token) {
    return token;
  }

  token = new Token(address.toHex());
  token.symbol = getTokenSymbol(address);
  token.name = getTokenName(address);
  token.decimals = getTokenDecimals(address);
  token.save();

  return token;
}
