import { DeploymentCompleted, MegaFactoryContract } from '../generated/MegaFactory/MegaFactoryContract';
import { Vault } from '../generated/schema';
import { VaultContract } from '../generated/Controller/VaultContract';
import { BigDecimal, BigInt } from '@graphprotocol/graph-ts';
import { powBI } from './utils/MathUtils';
import { getOrCreateVault } from './utils/VaultUtils';

export function handleDeploymentCompleted(event: DeploymentCompleted): void {
  const megaFactory = MegaFactoryContract.bind(event.address)
  const result = megaFactory.completedDeployments(event.params.id);
  const vaultAdr = result.getNewVault();
  getOrCreateVault(vaultAdr, event.block.timestamp);
}