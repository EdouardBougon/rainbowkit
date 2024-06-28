import { createStore } from 'mipd';
import { createConnector } from 'wagmi';
import { metaMask } from 'wagmi/connectors';
import { isMobile } from '../../../utils/isMobile';
import type { CreateWalletFn, Wallet, WalletDetailsParams } from '../../Wallet';

export type MetaMaskWalletOptions = Parameters<CreateWalletFn>[0];

const metaMaskExtensionRdns = 'io.metamask';

export const metaMaskWallet = (dappParams: MetaMaskWalletOptions): Wallet => {
  const isExtensionInjected = isEIP6963MetaMaskExist();

  return {
    id: 'metamask',
    name: 'MetaMask',
    rdns: metaMaskExtensionRdns,
    iconUrl: async () => (await import('./metaMaskWallet.svg')).default,
    iconAccent: '#f6851a',
    iconBackground: '#fff',
    installed: isExtensionInjected ? true : undefined,
    downloadUrls: {
      android: 'https://play.google.com/store/apps/details?id=io.metamask',
      ios: 'https://apps.apple.com/us/app/metamask/id1438144202',
      mobile: 'https://metamask.io/download',
      qrCode: 'https://metamask.io/download',
      chrome:
        'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
      edge: 'https://microsoftedge.microsoft.com/addons/detail/metamask/ejbalbakoplchlghecdalmeeeajnimhm',
      firefox: 'https://addons.mozilla.org/firefox/addon/ether-metamask',
      opera: 'https://addons.opera.com/extensions/details/metamask-10',
      browserExtension: 'https://metamask.io/download',
    },
    mobile: isMobile()
      ? {
          getUri: (uri: string) => uri,
        }
      : undefined,
    qrCode: !isExtensionInjected
      ? {
          getUri: (uri: string) => uri,
          instructions: {
            learnMoreUrl: 'https://metamask.io/faqs/',
            steps: [
              {
                description:
                  'wallet_connectors.metamask.qr_code.step1.description',
                step: 'install',
                title: 'wallet_connectors.metamask.qr_code.step1.title',
              },
              {
                description:
                  'wallet_connectors.metamask.qr_code.step2.description',
                step: 'create',
                title: 'wallet_connectors.metamask.qr_code.step2.title',
              },
              {
                description:
                  'wallet_connectors.metamask.qr_code.step3.description',
                step: 'refresh',
                title: 'wallet_connectors.metamask.qr_code.step3.title',
              },
            ],
          },
        }
      : undefined,
    extension: !isExtensionInjected
      ? {
          instructions: {
            learnMoreUrl: 'https://metamask.io/faqs/',
            steps: [
              {
                description:
                  'wallet_connectors.metamask.extension.step1.description',
                step: 'install',
                title: 'wallet_connectors.metamask.extension.step1.title',
              },
              {
                description:
                  'wallet_connectors.metamask.extension.step2.description',
                step: 'create',
                title: 'wallet_connectors.metamask.extension.step2.title',
              },
              {
                description:
                  'wallet_connectors.metamask.extension.step3.description',
                step: 'refresh',
                title: 'wallet_connectors.metamask.extension.step3.title',
              },
            ],
          },
        }
      : undefined,
    createConnector: (walletDetails: WalletDetailsParams) => {
      return createConnector((config) => {
        const metamaskConnector = metaMask({
          dappMetadata: {
            connector: 'rainbowKit',
            name: dappParams.walletConnectParameters?.metadata?.name,
            iconUrl: dappParams.walletConnectParameters?.metadata?.icons[0],
            url: dappParams.walletConnectParameters?.metadata?.url,
          },
          headless: true,
        })(config);

        /**
         * Override getChainId to avoid metamask error
         *
         * @see https://github.com/rainbow-me/rainbowkit/blob/cdcaa25d66b522119852502f71c8efc02b1abdd9/packages/rainbowkit/src/wallets/useWalletConnectors.ts#L57
         * And @see https://github.com/wevm/wagmi/blob/275cccb51437908a2d7d3dab0549c6050b6340d3/packages/connectors/src/metaMask.ts#L154
         */
        return {
          ...metamaskConnector,
          ...walletDetails,
          getChainId: async () => {
            try {
              return await metamaskConnector.getChainId();
            } catch {
              return config.chains[0]?.id ?? 1;
            }
          },
        };
      });
    },
  };
};

/**
 * Check if the metamask extension is injected in the browser
 * Use EIP-6963 to check if the extension is injected
 */
const isEIP6963MetaMaskExist = () => {
  const store = createStore();
  const providers = store.getProviders();

  const isMetamask = providers.some(
    (provider) => provider.info.rdns === metaMaskExtensionRdns,
  );
  store.destroy();

  return isMetamask;
};
