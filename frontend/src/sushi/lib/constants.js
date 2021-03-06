import BigNumber from 'bignumber.js/bignumber'

export const SUBTRACT_GAS_LIMIT = 100000

const ONE_MINUTE_IN_SECONDS = new BigNumber(60)
const ONE_HOUR_IN_SECONDS = ONE_MINUTE_IN_SECONDS.times(60)
const ONE_DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS.times(24)
const ONE_YEAR_IN_SECONDS = ONE_DAY_IN_SECONDS.times(365)

export const INTEGERS = {
  ONE_MINUTE_IN_SECONDS,
  ONE_HOUR_IN_SECONDS,
  ONE_DAY_IN_SECONDS,
  ONE_YEAR_IN_SECONDS,
  ZERO: new BigNumber(0),
  ONE: new BigNumber(1),
  ONES_31: new BigNumber('4294967295'), // 2**32-1
  ONES_127: new BigNumber('340282366920938463463374607431768211455'), // 2**128-1
  ONES_255: new BigNumber(
    '115792089237316195423570985008687907853269984665640564039457584007913129639935',
  ), // 2**256-1
  INTEREST_RATE_BASE: new BigNumber('1e18'),
}

export const addressMap = {
  uniswapFactory: '0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95',
  uniswapFactoryV2: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
  YFI: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e',
  YCRV: '0xdF5e0e81Dff6FAF3A7e52BA697820c5e32D806A8',
  UNIAmpl: '0xc5be99a02c6857f9eac67bbce58df5572498f40c',
  WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  UNIRouter: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
  LINK: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
  MKR: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
  SNX: '0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F',
  COMP: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
  LEND: '0x80fB784B7eD66730e8b1DBd9820aFD29931aab03',
  SUSHIYCRV: '0x2C7a51A357d5739C5C74Bf3C96816849d2c9F726',
}

export const contractAddresses = {
  sushi: {
    1: '0x734b73ce38d771b1509645589f9f57fa6f8c530d',
  },
  masterChef: {
    1: '0xdbedc89859f75991a5006485ea191718677398f8',
  },
  sellerPool: {
    1: '0xaA7b0f7F063Fba14a1E2827dd82849442f74D69f',
  },
  sellerLpToken: {
    1: '0x973387fd927c7313d94dfcd00f16314fec6eaf09',
  },
  weth: {
    1: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  },
  usdc: {
    1: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  },
  usdcWeth: {
    1: '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc',
  },
  priceLp: {
    1: '0x1448a079866321c317b11788b8eda3d439e55076',
  },
}

/*
UNI-V2 LP Address on mainnet for reference
==========================================
0  USDT 0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852
1  USDC 0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc
2  DAI  0xa478c2975ab1ea89e8196811f51a7b7ade33eb11
3  sUSD 0xf80758ab42c3b07da84053fd88804bcb6baa4b5c
4  COMP 0xcffdded873554f362ac02f8fb1f02e5ada10516f
5  LEND 0xab3f9bf1d81ddb224a2014e98b238638824bcf20
6  SNX  0x43ae24960e5534731fc831386c07755a2dc33d47
7  UMA  0x88d97d199b9ed37c29d846d00d443de980832a22
8  LINK 0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974
9  BAND 0xf421c3f2e695c2d4c0765379ccace8ade4a480d9
10 AMPL 0xc5be99a02c6857f9eac67bbce58df5572498f40c
11 YFI  0x2fdbadf3c4d5a8666bc06645b8358ab803996e28
12 SUSHI 0xce84867c3c02b05dc570d0135103d3fb9cc19433
*/

export const supportedPools = [
  {
    pid: 0,
    lpAddresses: {
      1: '0x1448a079866321c317b11788b8eda3d439e55076',
    },
    tokenAddresses: {
      1: '0x734b73ce38d771b1509645589f9f57fa6f8c530d',
    },
    name: 'HPP Party!',
    symbol: 'HPP-ETH UNI-V2 LP',
    tokenSymbol: 'HPP',
    icon: '🍲',
    link: 'https://uniswap.info/pair/0x1448a079866321c317b11788b8eda3d439e55076',
  },
  {
    pid: 1,
    lpAddresses: {
      1: '0xd3d2e2692501a5c9ca623199d38826e513033a17',
    },
    tokenAddresses: {
      1: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
    },
    name: 'UNI Unicorn',
    symbol: 'UNI-ETH UNI-V2 LP',
    tokenSymbol: 'UNI-ETH',
    icon: '🦄',
    link: 'https://uniswap.info/pair/0xd3d2e2692501a5c9ca623199d38826e513033a17',
  },
  {
    pid: 2,
    lpAddresses: {
      1: '0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974',
    },
    tokenAddresses: {
      1: '0x514910771af9ca656af840dff83e8264ecf986ca',
    },
    name: 'Toadie Marine',
    symbol: 'LINK-ETH UNI-V2 LP',
    tokenSymbol: 'LINK-ETH',
    icon: '🐸',
    link: 'https://uniswap.info/pair/0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974',
  },
  {
    pid: 3,
    lpAddresses: {
      1: '0xc5be99a02c6857f9eac67bbce58df5572498f40c',
    },
    tokenAddresses: {
      1: '0xd46ba6d942050d489dbd938a2c909a5d5039a161',
    },
    name: 'Ample Chicks',
    symbol: 'AMPL-ETH UNI-V2 LP',
    tokenSymbol: 'AMPL-ETH',
    icon: '🐥',
    link: 'https://uniswap.info/pair/0xc5be99a02c6857f9eac67bbce58df5572498f40c',
  },
  {
    pid: 4,
    lpAddresses: {
      1: '0x5a3de33ae548aae7abaa40cc25a4eddfe4222b3b',
    },
    tokenAddresses: {
      1: '0x7b6f71c8b123b38aa8099e0098bec7fbc35b8a13',
    },
    name: 'NerveNetwork',
    symbol: 'NVT-ETH UNI-V2 LP',
    tokenSymbol: 'NVT-ETH',
    icon: '🐊',
    link: 'https://uniswap.info/pair/0x5a3de33ae548aae7abaa40cc25a4eddfe4222b3b',
  },
  {
    pid: 5,
    lpAddresses: {
      1: '0x795065dcc9f64b5614c407a6efdc400da6221fb0',
    },
    tokenAddresses: {
      1: '0x6b3595068778dd592e39a122f4f5a5cf09c90fe2',
    },
    name: 'Sushi Chef',
    symbol: 'SUSHI-ETH SUSHI SLP',
    tokenSymbol: 'SUSHI-ETH',
    icon: '🍣',
    link: 'https://sushiswap.vision/pair/0x795065dcc9f64b5614c407a6efdc400da6221fb0',
  },
  {
    pid: 6,
    lpAddresses: {
      1: '0x088ee5007c98a9677165d78dd2109ae4a3d04d0c',
    },
    tokenAddresses: {
      1: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e',
    },
    name: 'YFI Whale',
    symbol: 'YFI-ETH SUSHI SLP',
    tokenSymbol: 'YFI-ETH',
    icon: '🐋',
    link: 'https://sushiswap.vision/pair/0x088ee5007c98a9677165d78dd2109ae4a3d04d0c',
  },
  {
    pid: 7,
    lpAddresses: {
      1: '0xa1d7b2d891e3a1f9ef4bbc5be20630c2feb1c470',
    },
    tokenAddresses: {
      1: '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f',
    },
    name: 'Synthetic Snake',
    symbol: 'SNX-ETH SUSHI SLP',
    tokenSymbol: 'SNX-ETH',
    icon: '🐍',
    link: 'https://sushiswap.vision/pair/0xa1d7b2d891e3a1f9ef4bbc5be20630c2feb1c470',
  },
  {
    pid: 8,
    lpAddresses: {
      1: '0x31503dcb60119a812fee820bb7042752019f2355',
    },
    tokenAddresses: {
      1: '0xc00e94cb662c3520282e6f5717214004a7f26888',
    },
    name: 'Compound Truffle',
    symbol: 'COMP-ETH SUSHI SLP',
    tokenSymbol: 'COMP-ETH',
    icon: '🍄',
    link: 'https://sushiswap.vision/pair/0x31503dcb60119a812fee820bb7042752019f2355',
  },
  {
    pid: 9,
    lpAddresses: {
      1: '0x5e63360e891bd60c69445970256c260b0a6a54c6',
    },
    tokenAddresses: {
      1: '0x80fb784b7ed66730e8b1dbd9820afd29931aab03',
    },
    name: 'Aave Boar',
    symbol: 'LEND-ETH SUSHI SLP',
    tokenSymbol: 'LEND-ETH',
    icon: '🐗',
    link: 'https://sushiswap.vision/pair/0x5e63360e891bd60c69445970256c260b0a6a54c6',
  },
  {
    pid: 10,
    lpAddresses: {
      1: '0xa75f7c2f025f470355515482bde9efa8153536a8',
    },
    tokenAddresses: {
      1: '0xba11d00c5f74255f56a5e366f4f77f5a186d7f55',
    },
    name: 'Band-osaurus',
    symbol: 'BAND-ETH SUSHI SLP',
    tokenSymbol: 'BAND-ETH',
    icon: '🦖',
    link: 'https://sushiswap.vision/pair/0xa75f7c2f025f470355515482bde9efa8153536a8',
  },
  {
    pid: 11,
    lpAddresses: {
      1: '0x001b6450083e531a5a7bf310bd2c1af4247e23d4',
    },
    tokenAddresses: {
      1: '0x04fa0d235c4abf4bcf4787af4cf447de572ef828',
    },
    name: 'Umami Squid',
    symbol: 'UMA-ETH SUSHI SLP',
    tokenSymbol: 'UMA-ETH',
    icon: '🦑',
    link: 'https://sushiswap.vision/pair/0x001b6450083e531a5a7bf310bd2c1af4247e23d4',
  },
]


export const addressUinV2LpMap = {
  '0xdac17f958d2ee523a2206206994597c13d831ec7': '0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852',//USDT
  '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48': '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc',//USDC
  '0x6b175474e89094c44da98b954eedeac495271d0f': '0xa478c2975ab1ea89e8196811f51a7b7ade33eb11',//DAI
  '0x57ab1ec28d129707052df4df418d58a2d46d5f51': '0xf80758ab42c3b07da84053fd88804bcb6baa4b5c',//sUSD
}
