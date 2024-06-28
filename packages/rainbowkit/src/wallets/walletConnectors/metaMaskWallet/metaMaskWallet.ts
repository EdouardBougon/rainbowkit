import { createConnector } from 'wagmi';
import type { CreateConnectorFn } from 'wagmi';
import { type MetaMaskParameters, metaMask } from 'wagmi/connectors';
import { isMobile } from '../../../utils/isMobile';
import type { CreateWalletFn, Wallet, WalletDetailsParams } from '../../Wallet';
import { hasInjectedProvider } from '../../getInjectedConnector';

export const METAMASK_WALLET_ID = 'metamask';

export type MetaMaskWalletOptions = Pick<
  Parameters<CreateWalletFn>[0],
  'appName' | 'appIcon'
>;

export interface MetamaskWallet {
  (params: MetaMaskWalletOptions): Wallet;
  parameters?: Pick<MetaMaskParameters, 'infuraAPIKey'> &
    Pick<Exclude<MetaMaskParameters['dappMetadata'], undefined>, 'url'>;
}

export interface MetaMaskConnector extends ReturnType<CreateConnectorFn> {}

export const metaMaskWallet: MetamaskWallet = (
  dappParams: MetaMaskWalletOptions,
): Wallet => {
  const isExtensionInjected = hasInjectedProvider({ flag: 'isMetaMask' });

  return {
    id: METAMASK_WALLET_ID,
    name: 'MetaMask',
    rdns: 'io.metamask',
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
            name: dappParams.appName,
            iconUrl: dappParams.appIcon,
            url: metaMaskWallet.parameters?.url,
          },
          headless: true,
        })(config);

        /**
         * Override getChainId to avoid metamask error
         *
         * @see https://github.com/rainbow-me/rainbowkit/blob/cdcaa25d66b522119852502f71c8efc02b1abdd9/packages/rainbowkit/src/wallets/useWalletConnectors.ts#L57
         * And @see https://github.com/wevm/wagmi/blob/275cccb51437908a2d7d3dab0549c6050b6340d3/packages/connectors/src/metaMask.ts#L154
         */
        const getChainId = metamaskConnector.getChainId;
        metamaskConnector.getChainId = async () => {
          try {
            return await getChainId();
          } catch {
            return config.chains[0]?.id ?? 1;
          }
        };

        return {
          ...metamaskConnector,
          ...walletDetails,
        };
      });
    },
  };
};
