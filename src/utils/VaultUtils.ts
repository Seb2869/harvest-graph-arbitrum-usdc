import { Vault } from '../../generated/schema';
import { VaultContract } from '../../generated/Controller/VaultContract';
import { Address, BigDecimal, BigInt } from '@graphprotocol/graph-ts';
import { powBI } from './MathUtils';

export function getOrCreateVault(vaultAdr: Address, timestamp: BigInt): Vault {
  let vault = Vault.load(vaultAdr.toHexString());
  if (vault == null) {
    const vaultContract = VaultContract.bind(vaultAdr);
    vault = new Vault(vaultAdr.toHexString());
    vault.name = vaultContract.name()
    vault.symbol = vaultContract.symbol()
    vault.decimals = vaultContract.decimals()
    vault.tvl = BigDecimal.zero();
    vault.apy = BigDecimal.zero();
    vault.lastShareTimestamp = BigInt.fromI32(0);
    vault.sharePrice = powBI(BigInt.fromString('10'), vault.decimals);
    vault.timestamp = timestamp;
    vault.save();
  }

  return vault;
}