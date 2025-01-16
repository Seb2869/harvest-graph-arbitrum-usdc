import { MarketBalancesUpdated, Transfer } from '../generated/PlasmaVault/PlasmaVault';
import { PlasmaVault, PlasmaVaultHistory, UserBalance, UserBalanceHistory, Vault } from '../generated/schema';
import { Address, BigDecimal, BigInt, log } from '@graphprotocol/graph-ts';
import { stringIdToBytes } from './utils/IdUtils';
import { PlasmaVaultContract } from '../generated/PlasmaVault/PlasmaVaultContract';
import { bdToBI, pow, powBI } from './utils/MathUtils';
import { FuseContract } from '../generated/PlasmaVault/FuseContract';
import { BD_ONE_HUNDRED, BD_TEN, BD_ZERO, BI_TEN } from './utils/Constant';
import { getOrCreateVault } from './utils/VaultUtils';

export function handleTransfer(event: Transfer): void {
  const vaultContract = PlasmaVaultContract.bind(event.address);
  let vault = PlasmaVault.load(event.address.toHexString());
  if (vault == null) {
    vault = new PlasmaVault(event.address.toHexString());
    vault.name = vaultContract.name();
    vault.symbol = vaultContract.symbol();
    vault.decimals = vaultContract.decimals();
    vault.historySequenceId = BigInt.fromI32(0);
    vault.tvl = BigDecimal.zero();
    vault.apy = BigDecimal.zero();
    vault.assetOld = BigDecimal.zero();
    vault.assetNew = BigDecimal.zero();
    vault.allocDatas = [];
    vault.newAllocDatas = [];
    vault.timestamp = event.block.timestamp;
    vault.createAtBlock = event.block.number;
  }
  createUserBalance(event.params.from, event.params.value, event.block.timestamp, false);
  createUserBalance(event.params.to, event.params.value, event.block.timestamp, true);

  // for USDC use 6 decimals
  vault.tvl = vaultContract.totalAssets().divDecimal(pow(BD_TEN, 6));
  vault.save();
}

export function handleMarketBalancesUpdated(event: MarketBalancesUpdated): void {
  const vaultContract = PlasmaVaultContract.bind(event.address);
  let vault = PlasmaVault.load(event.address.toHexString());
  if (vault == null) {
    vault = new PlasmaVault(event.address.toHexString());
    vault.name = vaultContract.name();
    vault.symbol = vaultContract.symbol();
    vault.decimals = vaultContract.decimals();
    vault.historySequenceId = BigInt.fromI32(0);
    vault.tvl = BigDecimal.zero();
    vault.apy = BigDecimal.zero();
    vault.assetOld = BigDecimal.zero();
    vault.assetNew = BigDecimal.zero();
    vault.allocDatas = [];
    vault.newAllocDatas = [];
    vault.timestamp = event.block.timestamp;
    vault.createAtBlock = event.block.number;
    vault.save();
  }

  let assetOld = BigDecimal.zero();
  let assetNew = BigDecimal.zero();
  const allocDatas: BigDecimal[] = [];
  const newAllocDatas: BigDecimal[] = [];

  const fuses = vaultContract.getInstantWithdrawalFuses();
  for (let i = 0; i < fuses.length; i++) {
    const fuseContract = FuseContract.bind(fuses[i]);
    const marketId = fuseContract.MARKET_ID();
    // TODO change logic
    const pVaultTemp = vaultContract.getInstantWithdrawalFusesParams(fuses[i], BigInt.fromI32(i))[1].toHexString().slice(26)

    // let pVaultHH = '';
    // for (let j = 0; j < pVaultTemp.length; j++) {
    //   if (pVaultTemp.charAt(j) !== '0') {
    //     pVaultHH = pVaultTemp.slice(j);
    //     break;
    //   }
    // }
    const pVault = '0x' + pVaultTemp

    log.log(log.Level.INFO, `Fetch vault ${pVault}`);
    log.log(log.Level.INFO, `Market id ${marketId.toString()}`);

    const hVault = getOrCreateVault(Address.fromString(pVault), event.block.timestamp);

    if (hVault != null) {
      log.log(log.Level.INFO, `Vault ${pVault} found, market id ${marketId.toString()}`);
      const marketInAssetOnchain = vaultContract.totalAssetsInMarket(marketId).toBigDecimal();
      const marketInAsset = marketInAssetOnchain.div(pow(BD_TEN, vault.decimals));
      assetOld = assetOld.plus(marketInAsset);
      const tempAssetNew = marketInAsset.times(BD_ONE_HUNDRED.plus(hVault.apy));
      log.log(log.Level.INFO, `asset ${tempAssetNew.toString()}, apy ${hVault.apy.toString()}`);
      if (tempAssetNew.gt(BD_ZERO)) {
        assetNew = assetNew.plus(tempAssetNew.div(BD_ONE_HUNDRED));
      }
      allocDatas.push(marketInAsset);
    } else {
      log.log(log.Level.WARNING, `Can not find vault ${pVault}`);
    }
  }

  for (let i = 0; i < allocDatas.length; i++) {
    if (allocDatas[i].gt(BD_ZERO) && assetOld.gt(BD_ZERO)) {
      newAllocDatas.push(allocDatas[i].div(assetOld).times(BD_ONE_HUNDRED));
    } else {
      newAllocDatas.push(BD_ZERO);
    }
  }

  let apy = BigDecimal.zero();
  if (assetOld.gt(BD_ZERO)) {
    apy = assetNew.minus(assetOld).div(assetOld).times(BD_ONE_HUNDRED);
  }

  vault.historySequenceId = vault.historySequenceId.plus(BigInt.fromI32(1));
  vault.assetOld = assetOld;
  vault.assetNew = assetNew;
  vault.apy = apy;
  vault.allocDatas = allocDatas;
  vault.newAllocDatas = newAllocDatas;
  vault.save();

  const vaultHistory = new PlasmaVaultHistory(stringIdToBytes(`${event.transaction.hash.toHex()}-${event.address.toHexString()}`));
  vaultHistory.tvl = vault.tvl;
  vaultHistory.apy = vault.apy;
  vaultHistory.historySequenceId = vault.historySequenceId;
  vaultHistory.priceUnderlying = BigDecimal.fromString('1');
  vaultHistory.sharePrice = bdToBI(
    vaultContract.totalAssets().
    divDecimal(pow(BD_TEN, 6))
      .div(vaultContract.totalSupply().divDecimal(pow(BD_TEN, 8)))
      .times(pow(BD_TEN, 6))
  );
  vaultHistory.assetOld = vault.assetOld;
  vaultHistory.assetNew = vault.assetNew;
  vaultHistory.allocDatas = vault.allocDatas;
  vaultHistory.newAllocDatas = vault.newAllocDatas;
  vaultHistory.timestamp = event.block.timestamp;
  vaultHistory.createAtBlock = event.block.number;
  vaultHistory.save();
}

function createUserBalance(user: Address, amount: BigInt, timestamp: BigInt, isDeposit: boolean): void {
  let userBalance = UserBalance.load(stringIdToBytes(user.toHexString()));
  if (userBalance == null) {
    userBalance = new UserBalance(stringIdToBytes(user.toHexString()));
    userBalance.userAddress = user.toHexString();
    userBalance.value = BigDecimal.zero();
    userBalance.timestamp = timestamp;
  }

  if (isDeposit) {
    userBalance.value = userBalance.value.plus(amount.toBigDecimal());
  } else {
    userBalance.value = userBalance.value.minus(amount.toBigDecimal());
  }

  userBalance.save();

  const userBalanceHistory = new UserBalanceHistory(stringIdToBytes(`${user.toHexString()}-${timestamp.toString()}-${amount.toString()}`));
  userBalanceHistory.userAddress = user.toHexString();
  userBalanceHistory.value = userBalance.value;
  userBalanceHistory.timestamp = timestamp;
  userBalanceHistory.save();
}