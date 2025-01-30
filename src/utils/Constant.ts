import { Address, BigDecimal, BigInt } from '@graphprotocol/graph-ts';

export const UNKNOWN = 'unknown';

export const SECONDS_OF_YEAR = BigDecimal.fromString('31557600');
export const DEFAULT_DECIMAL = 18;
export const DEFAULT_PRICE = BigInt.fromI32(0);
export const YEAR_PERIOD = BigDecimal.fromString('365')
export const BI_TEN = BigInt.fromI64(10)
export const BI_18 = BigInt.fromI64(10 ** 18)
export const BD_18 = BigDecimal.fromString('1000000000000000000')
export const BD_ZERO = BigDecimal.fromString('0')
export const BD_ONE = BigDecimal.fromString('1')
export const BD_TEN = BigDecimal.fromString('10')
export const BD_ONE_HUNDRED = BigDecimal.fromString('100')
export const USDC_DECIMAL = 6;
export const TWO_WEEKS_IN_SECONDS = BigInt.fromString('1209600');

export const DEFAULT_IFARM_PRICE = BigInt.fromString('40000000000000000000')

export const EVERY_24_HOURS = 86400;
export const BI_EVERY_24_HOURS = BigInt.fromString('86400');
export const EVERY_7_DAYS = 604800;
export const BI_EVERY_7_DAYS = BigInt.fromString('604800');
export const MODULE_RESULT = 75600;
export const MODULE_RESULT_V2 = 518400;

// BASE
export const AXL_WBTC_BASE = Address.fromString('0x1a35EE4640b0A3B87705B0A4B45D227Ba60Ca2ad');
export const WETH_BASE = Address.fromString('0x4200000000000000000000000000000000000006');
export const USDC_BASE = Address.fromString('0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA');
export const BASE_SWAP_FACTORY = Address.fromString('0xFDa619b6d20975be80A10332cD39b9a4b0FAa8BB');



