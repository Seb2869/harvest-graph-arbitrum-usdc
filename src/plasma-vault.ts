import {
  Approval as ApprovalEvent,
  AuthorityUpdated as AuthorityUpdatedEvent,
  Deposit as DepositEvent,
  Initialized as InitializedEvent,
  ManagementFeeDataConfigured as ManagementFeeDataConfiguredEvent,
  ManagementFeeRealized as ManagementFeeRealizedEvent,
  MarketBalancesUpdated as MarketBalancesUpdatedEvent,
  MarketSubstratesGranted as MarketSubstratesGrantedEvent,
  PerformanceFeeDataConfigured as PerformanceFeeDataConfiguredEvent,
  PriceOracleMiddlewareChanged as PriceOracleMiddlewareChangedEvent,
  Transfer as TransferEvent,
  Withdraw as WithdrawEvent,
  WithdrawManagerChanged as WithdrawManagerChangedEvent
} from "../generated/PlasmaVault/PlasmaVault"
import {
  Approval,
  AuthorityUpdated,
  Deposit,
  Initialized,
  ManagementFeeDataConfigured,
  ManagementFeeRealized,
  MarketBalancesUpdated,
  MarketSubstratesGranted,
  PerformanceFeeDataConfigured,
  PriceOracleMiddlewareChanged,
  Transfer,
  Withdraw,
  WithdrawManagerChanged
} from "../generated/schema"

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.spender = event.params.spender
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAuthorityUpdated(event: AuthorityUpdatedEvent): void {
  let entity = new AuthorityUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.authority = event.params.authority

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDeposit(event: DepositEvent): void {
  let entity = new Deposit(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.sender = event.params.sender
  entity.owner = event.params.owner
  entity.assets = event.params.assets
  entity.shares = event.params.shares

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleInitialized(event: InitializedEvent): void {
  let entity = new Initialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.version = event.params.version

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleManagementFeeDataConfigured(
  event: ManagementFeeDataConfiguredEvent
): void {
  let entity = new ManagementFeeDataConfigured(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.feeAccount = event.params.feeAccount
  entity.feeInPercentage = event.params.feeInPercentage

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleManagementFeeRealized(
  event: ManagementFeeRealizedEvent
): void {
  let entity = new ManagementFeeRealized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.unrealizedFeeInUnderlying = event.params.unrealizedFeeInUnderlying
  entity.unrealizedFeeInShares = event.params.unrealizedFeeInShares

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMarketBalancesUpdated(
  event: MarketBalancesUpdatedEvent
): void {
  let entity = new MarketBalancesUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.marketIds = event.params.marketIds
  entity.deltaInUnderlying = event.params.deltaInUnderlying

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMarketSubstratesGranted(
  event: MarketSubstratesGrantedEvent
): void {
  let entity = new MarketSubstratesGranted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.marketId = event.params.marketId
  entity.substrates = event.params.substrates

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePerformanceFeeDataConfigured(
  event: PerformanceFeeDataConfiguredEvent
): void {
  let entity = new PerformanceFeeDataConfigured(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.feeAccount = event.params.feeAccount
  entity.feeInPercentage = event.params.feeInPercentage

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePriceOracleMiddlewareChanged(
  event: PriceOracleMiddlewareChangedEvent
): void {
  let entity = new PriceOracleMiddlewareChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newPriceOracleMiddleware = event.params.newPriceOracleMiddleware

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWithdraw(event: WithdrawEvent): void {
  let entity = new Withdraw(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.sender = event.params.sender
  entity.receiver = event.params.receiver
  entity.owner = event.params.owner
  entity.assets = event.params.assets
  entity.shares = event.params.shares

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWithdrawManagerChanged(
  event: WithdrawManagerChangedEvent
): void {
  let entity = new WithdrawManagerChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newWithdrawManager = event.params.newWithdrawManager

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
