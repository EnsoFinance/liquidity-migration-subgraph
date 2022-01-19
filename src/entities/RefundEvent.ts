import { Refunded } from '../../generated/LiquidityMigration/LiquidityMigration'
import { RefundedEvent } from '../../generated/schema'

export function createRefundedEvent(event: Refunded): void {
  let stakedEvent = new RefundedEvent(event.transaction.hash.toHex())
  stakedEvent.user = event.params.account.toHexString()
  stakedEvent.strategy = event.params.lp.toHexString()
  stakedEvent.amount = event.params.amount.toBigDecimal()
  stakedEvent.save()
}
