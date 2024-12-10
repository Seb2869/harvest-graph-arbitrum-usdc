import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
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
} from "../generated/PlasmaVault/PlasmaVault"

export function createApprovalEvent(
  owner: Address,
  spender: Address,
  value: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("spender", ethereum.Value.fromAddress(spender))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return approvalEvent
}

export function createAuthorityUpdatedEvent(
  authority: Address
): AuthorityUpdated {
  let authorityUpdatedEvent = changetype<AuthorityUpdated>(newMockEvent())

  authorityUpdatedEvent.parameters = new Array()

  authorityUpdatedEvent.parameters.push(
    new ethereum.EventParam("authority", ethereum.Value.fromAddress(authority))
  )

  return authorityUpdatedEvent
}

export function createDepositEvent(
  sender: Address,
  owner: Address,
  assets: BigInt,
  shares: BigInt
): Deposit {
  let depositEvent = changetype<Deposit>(newMockEvent())

  depositEvent.parameters = new Array()

  depositEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  depositEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  depositEvent.parameters.push(
    new ethereum.EventParam("assets", ethereum.Value.fromUnsignedBigInt(assets))
  )
  depositEvent.parameters.push(
    new ethereum.EventParam("shares", ethereum.Value.fromUnsignedBigInt(shares))
  )

  return depositEvent
}

export function createInitializedEvent(version: BigInt): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(version)
    )
  )

  return initializedEvent
}

export function createManagementFeeDataConfiguredEvent(
  feeAccount: Address,
  feeInPercentage: BigInt
): ManagementFeeDataConfigured {
  let managementFeeDataConfiguredEvent =
    changetype<ManagementFeeDataConfigured>(newMockEvent())

  managementFeeDataConfiguredEvent.parameters = new Array()

  managementFeeDataConfiguredEvent.parameters.push(
    new ethereum.EventParam(
      "feeAccount",
      ethereum.Value.fromAddress(feeAccount)
    )
  )
  managementFeeDataConfiguredEvent.parameters.push(
    new ethereum.EventParam(
      "feeInPercentage",
      ethereum.Value.fromUnsignedBigInt(feeInPercentage)
    )
  )

  return managementFeeDataConfiguredEvent
}

export function createManagementFeeRealizedEvent(
  unrealizedFeeInUnderlying: BigInt,
  unrealizedFeeInShares: BigInt
): ManagementFeeRealized {
  let managementFeeRealizedEvent = changetype<ManagementFeeRealized>(
    newMockEvent()
  )

  managementFeeRealizedEvent.parameters = new Array()

  managementFeeRealizedEvent.parameters.push(
    new ethereum.EventParam(
      "unrealizedFeeInUnderlying",
      ethereum.Value.fromUnsignedBigInt(unrealizedFeeInUnderlying)
    )
  )
  managementFeeRealizedEvent.parameters.push(
    new ethereum.EventParam(
      "unrealizedFeeInShares",
      ethereum.Value.fromUnsignedBigInt(unrealizedFeeInShares)
    )
  )

  return managementFeeRealizedEvent
}

export function createMarketBalancesUpdatedEvent(
  marketIds: Array<BigInt>,
  deltaInUnderlying: BigInt
): MarketBalancesUpdated {
  let marketBalancesUpdatedEvent = changetype<MarketBalancesUpdated>(
    newMockEvent()
  )

  marketBalancesUpdatedEvent.parameters = new Array()

  marketBalancesUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "marketIds",
      ethereum.Value.fromUnsignedBigIntArray(marketIds)
    )
  )
  marketBalancesUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "deltaInUnderlying",
      ethereum.Value.fromSignedBigInt(deltaInUnderlying)
    )
  )

  return marketBalancesUpdatedEvent
}

export function createMarketSubstratesGrantedEvent(
  marketId: BigInt,
  substrates: Array<Bytes>
): MarketSubstratesGranted {
  let marketSubstratesGrantedEvent = changetype<MarketSubstratesGranted>(
    newMockEvent()
  )

  marketSubstratesGrantedEvent.parameters = new Array()

  marketSubstratesGrantedEvent.parameters.push(
    new ethereum.EventParam(
      "marketId",
      ethereum.Value.fromUnsignedBigInt(marketId)
    )
  )
  marketSubstratesGrantedEvent.parameters.push(
    new ethereum.EventParam(
      "substrates",
      ethereum.Value.fromFixedBytesArray(substrates)
    )
  )

  return marketSubstratesGrantedEvent
}

export function createPerformanceFeeDataConfiguredEvent(
  feeAccount: Address,
  feeInPercentage: BigInt
): PerformanceFeeDataConfigured {
  let performanceFeeDataConfiguredEvent =
    changetype<PerformanceFeeDataConfigured>(newMockEvent())

  performanceFeeDataConfiguredEvent.parameters = new Array()

  performanceFeeDataConfiguredEvent.parameters.push(
    new ethereum.EventParam(
      "feeAccount",
      ethereum.Value.fromAddress(feeAccount)
    )
  )
  performanceFeeDataConfiguredEvent.parameters.push(
    new ethereum.EventParam(
      "feeInPercentage",
      ethereum.Value.fromUnsignedBigInt(feeInPercentage)
    )
  )

  return performanceFeeDataConfiguredEvent
}

export function createPriceOracleMiddlewareChangedEvent(
  newPriceOracleMiddleware: Address
): PriceOracleMiddlewareChanged {
  let priceOracleMiddlewareChangedEvent =
    changetype<PriceOracleMiddlewareChanged>(newMockEvent())

  priceOracleMiddlewareChangedEvent.parameters = new Array()

  priceOracleMiddlewareChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newPriceOracleMiddleware",
      ethereum.Value.fromAddress(newPriceOracleMiddleware)
    )
  )

  return priceOracleMiddlewareChangedEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  value: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return transferEvent
}

export function createWithdrawEvent(
  sender: Address,
  receiver: Address,
  owner: Address,
  assets: BigInt,
  shares: BigInt
): Withdraw {
  let withdrawEvent = changetype<Withdraw>(newMockEvent())

  withdrawEvent.parameters = new Array()

  withdrawEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam("receiver", ethereum.Value.fromAddress(receiver))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam("assets", ethereum.Value.fromUnsignedBigInt(assets))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam("shares", ethereum.Value.fromUnsignedBigInt(shares))
  )

  return withdrawEvent
}

export function createWithdrawManagerChangedEvent(
  newWithdrawManager: Address
): WithdrawManagerChanged {
  let withdrawManagerChangedEvent = changetype<WithdrawManagerChanged>(
    newMockEvent()
  )

  withdrawManagerChangedEvent.parameters = new Array()

  withdrawManagerChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newWithdrawManager",
      ethereum.Value.fromAddress(newWithdrawManager)
    )
  )

  return withdrawManagerChangedEvent
}
