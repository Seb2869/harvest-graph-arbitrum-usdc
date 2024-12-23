import { SharePriceChangeLog } from '../generated/Controller/ControllerContract';
import { Vault } from '../generated/schema';
import { BigDecimal, BigInt } from '@graphprotocol/graph-ts';
import { calculateAndSaveApyAutoCompound } from './types/apy';
import { BD_TEN } from './utils/Constant';
import { pow } from './utils/MathUtils';
import { getOrCreateVault } from './utils/VaultUtils';


export function handleSharePriceChangeLog(event: SharePriceChangeLog): void {
  const vault = getOrCreateVault(event.params.vault, event.block.timestamp);
  let apy = BigDecimal.zero();
  if (vault.lastShareTimestamp.gt(BigInt.fromI32(0))) {
    const lastShareTimestamp = vault.lastShareTimestamp
    const lastSharePrice = event.params.oldSharePrice;
    const diffSharePrice = event.params.newSharePrice.minus(lastSharePrice).divDecimal(pow(BD_TEN, vault.decimals))
    const diffTimestamp = event.params.timestamp.minus(lastShareTimestamp)
    apy = calculateAndSaveApyAutoCompound(`${event.transaction.hash.toHex()}-${vault.id}`, diffSharePrice, diffTimestamp, vault, event.block)
  }
  vault.apy = apy
  vault.sharePrice = event.params.newSharePrice;
  vault.lastShareTimestamp = event.block.timestamp;
  vault.save();
}