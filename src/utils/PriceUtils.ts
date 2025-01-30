import { Address, BigInt, dataSource } from '@graphprotocol/graph-ts';
import { BI_18 } from './Constant';
import { getPriceForBaseCoin } from './PriceUtilsBase';

export function getPriceForCoin(address: Address): BigInt {
  if (dataSource.network() == 'base') {
    return getPriceForBaseCoin(address);
  }
  return BI_18;
}