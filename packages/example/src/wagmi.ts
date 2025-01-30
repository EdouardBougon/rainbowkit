import { type Chain, getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  berasigWallet,
  bestWallet,
  bifrostWallet,
  binanceWallet,
  bitgetWallet,
  bitskiWallet,
  bitverseWallet,
  bloomWallet,
  bybitWallet,
  clvWallet,
  coin98Wallet,
  coinbaseWallet,
  compassWallet,
  coreWallet,
  dawnWallet,
  desigWallet,
  enkryptWallet,
  foxWallet,
  frameWallet,
  frontierWallet,
  gateWallet,
  imTokenWallet,
  iopayWallet,
  kaiaWallet,
  kaikasWallet,
  krakenWallet,
  kresusWallet,
  ledgerWallet,
  magicEdenWallet,
  metaMaskWallet,
  mewWallet,
  nestWallet,
  oktoWallet,
  okxWallet,
  omniWallet,
  oneInchWallet,
  oneKeyWallet,
  paraSwapWallet,
  phantomWallet,
  rabbyWallet,
  rainbowWallet,
  ramperWallet,
  roninWallet,
  safeWallet,
  safeheronWallet,
  safepalWallet,
  subWallet,
  tahoWallet,
  talismanWallet,
  tokenPocketWallet,
  tokenaryWallet,
  trustWallet,
  uniswapWallet,
  valoraWallet,
  walletConnectWallet,
  wigwamWallet,
  xdefiWallet,
  zealWallet,
  zerionWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { publicActions } from 'viem';
import {
  arbitrum,
  arbitrumSepolia,
  avalancheFuji,
  base,
  baseSepolia,
  blast,
  blastSepolia,
  bsc,
  bscTestnet,
  celo,
  celoAlfajores,
  holesky,
  inkSepolia,
  klaytn,
  klaytnBaobab,
  mainnet,
  mantle,
  mantleTestnet,
  optimism,
  optimismSepolia,
  polygon,
  polygonMumbai,
  ronin,
  sepolia,
  zetachain,
  zetachainAthensTestnet,
  zkSync,
  zora,
  zoraSepolia,
} from 'wagmi/chains';

const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? 'YOUR_PROJECT_ID';

const avalanche = {
  id: 43_114,
  name: 'Avalanche',
  iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5805.png',
  iconBackground: '#fff',
  nativeCurrency: { name: 'Avalanche', symbol: 'AVAX', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://api.avax.network/ext/bc/C/rpc'] },
  },
  blockExplorers: {
    default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 11_907_934,
    },
  },
} as const satisfies Chain;

const sei = {
  id: 713715,
  name: 'Sei',
  iconUrl:
    'https://s3.coinmarketcap.com/static-gravity/image/992744cfbd5e40f5920018ee7a830b98.png',
  iconBackground: '#fff',
  nativeCurrency: { name: 'Sei', symbol: 'SEI', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://evm-rpc.arctic-1.seinetwork.io'] },
  },
  blockExplorers: {
    default: { name: 'Sei Explorer', url: 'https://www.seiscan.app' },
  },
  contracts: {},
} as const satisfies Chain;

const ink = {
  id: 57073,
  name: 'Ink',
  iconUrl: 'https://inkonchain.com/icons/ink-sepolia-logo.svg',
  iconBackground: '#fff',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc-gel.inkonchain.com'] },
  },
  blockExplorers: {
    default: { name: 'Blockscout', url: 'https://explorer.inkonchain.com/' },
  },
  contracts: {},
} as const satisfies Chain;

// Enable Smart Wallet and EOA
// Testing `preference` type
coinbaseWallet.preference = 'all';

export const config = getDefaultConfig({
  appName: 'RainbowKit Demo',
  appUrl: 'https://rainbow.me',
  appIcon:
    'https://framerusercontent.com/images/Hml6PtJwt03gwFtTRYmbpo7EarY.png',
  projectId,
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    bsc,
    avalanche,
    zora,
    blast,
    ink,
    zkSync,
    zetachain,
    ronin,
    klaytn,
    sei,
    mantle,
    celo,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true'
      ? [
          sepolia,
          holesky,
          polygonMumbai,
          optimismSepolia,
          arbitrumSepolia,
          baseSepolia,
          bscTestnet,
          avalancheFuji,
          zoraSepolia,
          blastSepolia,
          inkSepolia,
          zetachainAthensTestnet,
          klaytnBaobab,
          mantleTestnet,
          celoAlfajores,
        ]
      : []),
  ],
  wallets: [
    {
      groupName: 'Popular',
      wallets: [
        safeWallet,
        rainbowWallet,
        coinbaseWallet,
        metaMaskWallet,
        walletConnectWallet,
      ],
    },
    {
      groupName: 'Other',
      wallets: [
        argentWallet,
        berasigWallet,
        bestWallet,
        bifrostWallet,
        binanceWallet,
        bitgetWallet,
        bitskiWallet,
        bitverseWallet,
        bloomWallet,
        bybitWallet,
        clvWallet,
        coin98Wallet,
        compassWallet,
        coreWallet,
        dawnWallet,
        desigWallet,
        enkryptWallet,
        foxWallet,
        frameWallet,
        frontierWallet,
        gateWallet,
        imTokenWallet,
        iopayWallet,
        kaiaWallet,
        kaikasWallet,
        krakenWallet,
        kresusWallet,
        ledgerWallet,
        magicEdenWallet,
        mewWallet,
        nestWallet,
        oktoWallet,
        okxWallet,
        omniWallet,
        oneInchWallet,
        oneKeyWallet,
        paraSwapWallet,
        phantomWallet,
        rabbyWallet,
        ramperWallet,
        roninWallet,
        safeheronWallet,
        safepalWallet,
        subWallet,
        tahoWallet,
        talismanWallet,
        tokenPocketWallet,
        tokenaryWallet,
        trustWallet,
        uniswapWallet,
        valoraWallet,
        wigwamWallet,
        xdefiWallet,
        zealWallet,
        zerionWallet,
      ],
    },
  ],
  ssr: true,
});

export const publicClient = config.getClient().extend(publicActions);
