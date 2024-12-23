import { calculateAprAutoCompound, calculateApy } from '../utils/ApyUtils';
import { BigDecimal, BigInt, ethereum } from '@graphprotocol/graph-ts';
import { stringIdToBytes } from '../utils/IdUtils';
import { ApyAutoCompound, Vault } from '../../generated/schema';

export function calculateAndSaveApyAutoCompound(id: string, diffSharePrice: BigDecimal, diffTimestamp: BigInt, vault: Vault, block: ethereum.Block): BigDecimal {
  let apyAutoCompound = ApyAutoCompound.load(stringIdToBytes(id));
  if (apyAutoCompound == null) {
    apyAutoCompound = new ApyAutoCompound(stringIdToBytes(id));
    apyAutoCompound.createAtBlock = block.number
    apyAutoCompound.timestamp = block.timestamp
    apyAutoCompound.apr = calculateAprAutoCompound(diffSharePrice, diffTimestamp.toBigDecimal())
    const apy = calculateApy(apyAutoCompound.apr);
    apyAutoCompound.apy = apy;
    apyAutoCompound.vault = vault.id
    apyAutoCompound.diffSharePrice = diffSharePrice
    apyAutoCompound.diffTimestamp = diffTimestamp.toBigDecimal()
    apyAutoCompound.save()
  }
  return apyAutoCompound.apr
}