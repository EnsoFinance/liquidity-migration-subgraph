import { LiquidityMigration } from "../../generated/schema";

export function ensureLiquidityMigration(): LiquidityMigration {
  let migration = LiquidityMigration.load("SINGLETON");
  if (migration) {
    return migration;
  }

  migration = new LiquidityMigration("SINGLETON");
  migration.usersCount = 0;
  migration.save();

  return migration;
}

export function useLiquidityMigration(): LiquidityMigration {
  let migration = LiquidityMigration.load("SINGLETON")!;
  return migration;
}
