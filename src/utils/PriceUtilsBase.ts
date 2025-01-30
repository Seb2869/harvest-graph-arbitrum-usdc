import { Address, BigDecimal, BigInt, ethereum, log } from '@graphprotocol/graph-ts';
import {
  AXL_WBTC_BASE, BASE_SWAP_FACTORY,
  BI_18,
  BI_TEN,
  DEFAULT_DECIMAL,
  DEFAULT_PRICE, USDC_BASE,
  USDC_DECIMAL, WETH_BASE,
} from './Constant';
import { powBI } from "./MathUtils";

import { PancakeFactoryContract } from '../../generated/Controller/PancakeFactoryContract';
import { PancakePairContract } from '../../generated/Controller/PancakePairContract';
import { fetchContractDecimal } from './ERC20Utils';

export function getPriceForBaseCoin(address: Address): BigInt {
  if (isBtc(address.toHex())) {
    return getPriceForCoinWithSwap(AXL_WBTC_BASE, USDC_BASE, BASE_SWAP_FACTORY)
  }

  if (isEth(address.toHex())) {
    return getPriceForCoinWithSwap(WETH_BASE, USDC_BASE, BASE_SWAP_FACTORY)
  }

  return BI_18;
}

function getPriceForCoinWithSwap(address: Address, stableCoin: Address, factory: Address): BigInt {
  const uniswapFactoryContract = PancakeFactoryContract.bind(factory)
  const tryGetPair = uniswapFactoryContract.try_getPair(stableCoin, address)
  if (tryGetPair.reverted) {
    return DEFAULT_PRICE
  }

  const poolAddress = tryGetPair.value

  const uniswapPairContract = PancakePairContract.bind(poolAddress);
  const tryGetReserves = uniswapPairContract.try_getReserves()
  if (tryGetReserves.reverted) {
    log.log(log.Level.WARNING, `Can not get reserves for ${poolAddress.toHex()}`)

    return DEFAULT_PRICE
  }
  const reserves = tryGetReserves.value
  const decimal = fetchContractDecimal(address)

  const delimiter = powBI(BI_TEN, decimal.toI32() - USDC_DECIMAL + DEFAULT_DECIMAL)

  return reserves.get_reserve1().times(delimiter).div(reserves.get_reserve0())
}

function isBtc(address: string): boolean {
  return address.toLowerCase() == '0x370A3D2800b1ea990634835a5709fB31082de6d9'.toLowerCase();
}

function isEth(address: string): boolean {
  return address.toLowerCase() == '0x31A36d3eAB4A8e0d365eB72EE9079603aF6C421c'.toLowerCase()
}