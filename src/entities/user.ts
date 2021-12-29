import { Address } from "@graphprotocol/graph-ts";
import { User } from "../../generated/schema";

export function ensureUser(address: Address): User {
  let user = User.load(address.toHexString());
  if (user) {
    return user;
  }

  user = new User(address.toHex());
  user.save();

  return user;
}
