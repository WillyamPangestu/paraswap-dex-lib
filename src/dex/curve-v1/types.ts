import { Interface } from '@ethersproject/abi';
import { Address } from '../../types';

export interface ICurveV1PriceHandler {
  get_dy(state: PoolState, i: number, j: number, dx: bigint): bigint;

  get_dy_underlying(state: PoolState, i: number, j: number, dx: bigint): bigint;
}

export type PoolConstants = {
  COINS: Address[];
  coins_decimals: number[];
  base_coins_decimals: number[];
  rate_multipliers: bigint[];
  rate_multiplier: bigint;
};

export type PoolState = {
  A: bigint; // factory get_A()
  balances: bigint[]; // factory get_balances()
  fee: bigint; // factory get_fees()
  constants: PoolConstants;
  totalSupply: bigint;
  virtualPrice: bigint;
  basePoolState?: PoolState;
  exchangeRateCurrent: bigint[];
};

export type PoolStateWithUpdateInfo<T> = {
  blockNumber: number;
  lastUpdatedAt: number;
  poolState: T;
};

export type CurveV1Data = {
  exchange: Address;
  i: number;
  j: number;
  underlyingSwap: boolean;
};

export type PoolConfig = {
  underlying: string[];
  coins: string[];
  address: string;
  name: string;
  isLending: boolean;
  isMetapool: boolean;
  liquidityUSD?: number;
  isFeeOnTransferSupported?: boolean;
};

export enum ImplementationNames {
  BASE_THREE_POOL = 'base_three_pool',
  BASE_FRAX_POOL = 'base_frax_pool',
  BASE_BTC_POOL = 'base_btc_pool',

  FACTORY_META_3POOL_2_8 = 'factory_meta_3pool_2_8',
  FACTORY_META_3POOL_2_15 = 'factory_meta_3pool_2_15',
  FACTORY_META_3POOL_3_1 = 'factory_meta_3pool_3_1',
  FACTORY_META_3POOL_ERC20_FEE_TRANSFER = 'factory_meta_3pool_erc20_fee_transfer',
  FACTORY_META_SBTC_ERC20 = 'factory_meta_sbtc_erc20',

  FACTORY_PLAIN_2COIN_NATIVE = 'factory_plain_2coin_native',
  FACTORY_PLAIN_2COIN_ERC20 = 'factory_plain_2coin_erc20',
  FACTORY_PLAIN_2COIN_ERC20_18DEC = 'factory_plain_2coin_erc20_18dec', // 18DEC = 18 decimals
  FACTORY_PLAIN_2COIN_ERC20_FEE_TRANSFER = 'factory_plain_2coin_erc20_fee_transfer',

  FACTORY_PLAIN_3COIN_ERC20 = 'factory_plain_3coin_erc20',
  FACTORY_PLAIN_3COIN_ERC20_FEE_TRANSFER = 'factory_plain_3coin_erc20_fee_transfer',
  FACTORY_PLAIN_3COIN_ERC20_18DEC = 'factory_plain_3coin_erc20_18dec',

  FACTORY_PLAIN_4COIN_ERC20 = 'factory_plain_4coin_erc20',
  FACTORY_PLAIN_4COIN_ERC20_18DEC = 'factory_plain_4coin_erc20_18dec',
}

export type FactoryImplementation = {
  name: ImplementationNames;
  address: Address;
  isWrapNative: boolean;
};

export type DexParams = {
  factoryAddress: string | null;
  pools: Record<string, PoolConfig>;
  factoryImplementations: Record<string, FactoryImplementation>;
};

export enum CurveSwapFunctions {
  exchange = 'exchange',
  exchange_underlying = 'exchange_underlying',
}

export type CurveV1Ifaces = {
  exchangeRouter: Interface;
  factory: Interface;
};
