import { Staked } from '../../generated/LiquidityMigration/LiquidityMigration'
import { FilteredStakedEvent } from '../../generated/schema'

export function createFilteredStakedEvent(event: Staked): void {
  let stakedEvent = new FilteredStakedEvent(event.transaction.hash.toHex())
  stakedEvent.staker = event.params.account.toHexString()
  stakedEvent.adapter = event.params.adapter.toHexString()
  stakedEvent.strategy = event.params.strategy.toHexString()
  stakedEvent.amount = event.params.amount.toBigDecimal()
  stakedEvent.save()
}
