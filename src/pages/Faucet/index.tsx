import React, { useContext, useMemo, useEffect, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { SwapPoolTabs } from '../../components/NavigationTabs';
import { useETHBalances } from '../../state/wallet/hooks';
import AppBody from '../AppBody';
import { BigNumber, ethers } from 'ethers';
//import { Log } from '@ethersproject/abstract-provider/src.ts';
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
//import { useTransactionAdder } from 'state/transactions/hooks';

const PageWrapper = styled(AutoColumn)`
  max-width: 640px;
  width: 100%;
  padding: 1rem;
`;

const FixedHeightRow = styled(RowBetween)`
  height: 24px;
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
  //const addTransaction = useTransactionAdder();
  const [tokenBalance, setTokenBalance] = useState({ bigToken: 0, smallToken: 0 });
  const { account } = useActiveWeb3React();
  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? ''];
  const getNewTokenBalances = async () => {
    const bigTokenBalanceHex = await getTokenBalance(true);
    const bigNumberDecimal = bigNumberToDecimal18(bigTokenBalanceHex);
    const smlTokenBalanceHex = await getTokenBalance(false);
    const smlTokenBalance = bigNumberToDecimal18(smlTokenBalanceHex);
    setTokenBalance({
      ...tokenBalance,
      bigToken: bigNumberDecimal,
      smallToken: smlTokenBalance,
    });
  };
  useEffect(() => {
    getNewTokenBalances();
  }, []);
  const ethereum = window.ethereum as any;
  const theme = useContext(ThemeContext);

  const bigNumberToDecimal18 = (bigNumber: BigNumber) => {
    return parseInt(bigNumber._hex, 16) / 10 ** 18;
  };
  const getTokenDrip = async (BigToken: boolean) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const faucet = BigToken
      ? new ethers.Contract('0x8FB30d1A78d7E622CCB10376A585383Cf9dEc920', FAUCETERC20_ABI, signer)
      : new ethers.Contract('0xD45f1F799097a30243605E9ba938FcB0e3f5cBC3', FAUCETERC20_ABI, signer);
    const res = await faucet.drip();
    console.log(res, 'res');
    await getNewTokenBalances();
  };

  const getTokenBalance = async (BigToken: boolean) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    await provider.send('eth_requestAccounts', []);
    const faucetContract = BigToken
      ? new ethers.Contract('0x8FB30d1A78d7E622CCB10376A585383Cf9dEc920', FAUCETERC20_ABI, provider)
      : new ethers.Contract('0xD45f1F799097a30243605E9ba938FcB0e3f5cBC3', FAUCETERC20_ABI, provider);
    return faucetContract.balanceOf(account);
  };
  const addTokenFunction = async (bigToken: boolean) => {
    try {
      const wasAdded = await ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: bigToken
              ? '0x8FB30d1A78d7E622CCB10376A585383Cf9dEc920'
              : '0xD45f1F799097a30243605E9ba938FcB0e3f5cBC3',
            symbol: bigToken ? 'BIG' : 'SML',
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
              <>
                <ButtonRow>
                  <ResponsiveButtonPrimary padding="6px 10px" onClick={() => getTokenDrip(true)}>
                    <Text fontWeight={200} fontSize={14}>
                      Get BigTkn
                    </Text>
                  </ResponsiveButtonPrimary>
                  <IconWrapper size={16} onClick={() => addTokenFunction(true)}>
                    <img src={MetamaskIcon} alt={'metamask logo'} />
                  </IconWrapper>
                  <ResponsiveButtonPrimary id="join-pool-button" padding="6px 10px" onClick={() => getTokenDrip(false)}>
                    <Text fontWeight={200} fontSize={14}>
                      Get SmlTkn
                    </Text>
                  </ResponsiveButtonPrimary>
                  <IconWrapper size={16} onClick={() => addTokenFunction(false)}>
                    <img src={MetamaskIcon} alt={'metamask logo'} />
                  </IconWrapper>
                </ButtonRow>
                <FixedHeightRow>
                  <Text fontSize={16} fontWeight={500}>
                    Your test Amb balance:
                  </Text>
                  <Text fontSize={16} fontWeight={500}>
                    {userEthBalance?.toSignificant(8)}
                  </Text>
                </FixedHeightRow>
                <FixedHeightRow>
                  <Text fontSize={16} fontWeight={500}>
                    Your BigToken Balance:
                  </Text>
                  <Text fontSize={16} fontWeight={500}>
                    {tokenBalance.bigToken.toFixed(3)}
                  </Text>
                </FixedHeightRow>
                <FixedHeightRow>
                  <Text fontSize={16} fontWeight={500}>
                    Your SmallToken Balance:
                  </Text>
                  <Text fontSize={16} fontWeight={500}>
                    {tokenBalance.smallToken.toFixed(3)}
                  </Text>
                </FixedHeightRow>
              </>
            )}
          </AutoColumn>
        </AutoColumn>
      </PageWrapper>
    </AppBody>
  );
}
