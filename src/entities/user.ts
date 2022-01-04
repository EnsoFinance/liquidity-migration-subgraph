import { Address } from "@graphprotocol/graph-ts";
import { User } from "../../generated/schema";
import { useLiquidityMigration } from "./LiquidityMigration";

export function ensureUser(address: Address): User {
  let user = User.load(address.toHexString());
  if (user) {
    return user;
  }

  user = new User(address.toHex());
  user.save();

  let migration = useLiquidityMigration();
  migration.usersCount = migration.usersCount + 1;
  migration.save();

  return user;
}
