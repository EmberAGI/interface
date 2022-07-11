import React, { useContext, useMemo } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { SwapPoolTabs } from '../../components/NavigationTabs';
import AppBody from '../AppBody';
import { ethers } from 'ethers';
//import FullPositionCard from '../../components/PositionCard';
import { useTokenBalancesWithLoadingIndicator } from '../../state/wallet/hooks';
import { TYPE, HideSmall } from '../../theme';
import { Text } from 'rebass';
import Card from '../../components/Card';
import { RowBetween, RowFixed } from '../../components/Row';
import { ButtonPrimary } from '../../components/Button';
import { AutoColumn } from '../../components/Column';
// import { useFaucetTokenContract } from '../../hooks/useContract';
import { useActiveWeb3React } from '../../hooks';
import { usePairs } from '../../data/Reserves';
import { toV2LiquidityToken, useTrackedTokenPairs } from '../../state/user/hooks';
import { Dots } from '../../components/swap/styleds';
import FAUCETERC20_ABI from '../../constants/abis/faucetErc20.json';
import MetamaskIcon from '../../assets/images/metamask.png';

const PageWrapper = styled(AutoColumn)`
  max-width: 640px;
  width: 100%;
  padding: 1rem;
`;

const IconWrapper = styled.div<{ size?: number }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  color: #ff00ff;
  cursor: pointer;
  & > img,
  span {
    height: ${({ size }) => (size ? size + 'px' : '32px')};
    width: ${({ size }) => (size ? size + 'px' : '32px')};
  }
  ${({ theme }) => theme.mediaWidth.upToMedium`
    align-items: flex-end;
  `};
`;

const TitleRow = styled(RowBetween)`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-wrap: wrap;
    gap: 12px;
    width: 100%;
    flex-direction: column-reverse;
  `};
`;

const ButtonRow = styled(RowFixed)`
  gap: 8px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 100%;
    flex-direction: row-reverse;
    justify-content: space-between;
  `};
`;

const ResponsiveButtonPrimary = styled(ButtonPrimary)`
  width: fit-content;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 48%;
  `};
`;

const EmptyProposals = styled.div`
  border: 1px solid ${({ theme }) => theme.text4};
  padding: 16px 12px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function Faucet() {
  const ethereum = window.ethereum as any;
  const theme = useContext(ThemeContext);
  const { account } = useActiveWeb3React();
  const getTokenDrip = async (xeenux: boolean) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    await provider.send('eth_requestAccounts', []);
    const signer = await provider.getSigner();
    const faucet = xeenux
      ? new ethers.Contract('0xfEaAA5C7d9572a118cf219C934DE2f9511AD8790', FAUCETERC20_ABI, signer)
      : new ethers.Contract('0x97a9E635Ae18c34a8E294871Fc6433f1c0506101', FAUCETERC20_ABI, signer);
    await faucet.drip();
  };

  const addTokenFunction = async (xeenux: boolean) => {
    try {
      const wasAdded = await ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: xeenux
              ? '0xfEaAA5C7d9572a118cf219C934DE2f9511AD8790'
              : '0x97a9E635Ae18c34a8E294871Fc6433f1c0506101',
            symbol: xeenux ? 'XEENUS' : 'WEENUS',
            decimals: 18,
          },
        },
      });

      if (wasAdded) {
        console.log('Added token');
      } else {
        console.log('Token was not added');
      }
    } catch (error) {
      console.log(error);
    }
  };
  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs();
  const tokenPairsWithLiquidityTokens = useMemo(
    () => trackedTokenPairs.map((tokens) => ({ liquidityToken: toV2LiquidityToken(tokens), tokens })),
    [trackedTokenPairs]
  );
  const liquidityTokens = useMemo(
    () => tokenPairsWithLiquidityTokens.map((tpwlt) => tpwlt.liquidityToken),
    [tokenPairsWithLiquidityTokens]
  );
  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
    account ?? undefined,
    liquidityTokens
  );

  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        v2PairsBalances[liquidityToken.address]?.greaterThan('0')
      ),
    [tokenPairsWithLiquidityTokens, v2PairsBalances]
  );

  const v2Pairs = usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens));
  const v2IsLoading =
    fetchingV2PairBalances ||
    v2Pairs?.length < liquidityTokensWithBalances.length ||
    v2Pairs?.some((V2Pair) => !V2Pair);

  return (
    <AppBody>
      <PageWrapper>
        <SwapPoolTabs active={'faucet'} />
        <AutoColumn gap="lg" justify="center">
          <AutoColumn gap="lg" style={{ width: '100%' }}>
            <TitleRow style={{ marginTop: '1rem' }} padding={'0'}>
              <HideSmall>
                <TYPE.mediumHeader style={{ justifySelf: 'flex-start' }}>Faucet Cookies</TYPE.mediumHeader>
              </HideSmall>
            </TitleRow>

            {!account ? (
              <Card padding="40px">
                <TYPE.body color={theme.text3} textAlign="center">
                  Connect to a wallet to view faucet.
                </TYPE.body>
              </Card>
            ) : v2IsLoading ? (
              <EmptyProposals>
                <TYPE.body color={theme.text3} textAlign="center">
                  <Dots>Loading</Dots>
                </TYPE.body>
              </EmptyProposals>
            ) : (
              <ButtonRow>
                <ResponsiveButtonPrimary padding="6px 10px" onClick={() => getTokenDrip(true)}>
                  <Text fontWeight={200} fontSize={14}>
                    Drip Xeenus
                  </Text>
                </ResponsiveButtonPrimary>
                <IconWrapper size={16} onClick={() => addTokenFunction(true)}>
                  +
                  <img src={MetamaskIcon} alt={'metamask logo'} />
                </IconWrapper>
                <ResponsiveButtonPrimary id="join-pool-button" padding="6px 10px" onClick={() => getTokenDrip(false)}>
                  <Text fontWeight={200} fontSize={14}>
                    Drip Weenus
                  </Text>
                </ResponsiveButtonPrimary>
                <IconWrapper size={16} onClick={() => addTokenFunction(false)}>
                  +
                  <img src={MetamaskIcon} alt={'metamask logo'} />
                </IconWrapper>
              </ButtonRow>
            )}
          </AutoColumn>
        </AutoColumn>
      </PageWrapper>
    </AppBody>
  );
}
