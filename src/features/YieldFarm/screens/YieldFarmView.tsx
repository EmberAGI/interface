import React from 'react';
import AppBody from '../../../legacy/pages/AppBody';
import styled from 'styled-components';
import { TYPE } from 'legacy/theme';
import YieldFarmCard from '../components/YieldFarmCard';
import Card from '../../../legacy/components/Card';
import { SwapPoolTabs } from 'legacy/components/NavigationTabs';
import useYieldFarmViewModel from './useYieldFarmViewModel';
import { useWeb3React } from '@web3-react/core';
import { AutoColumn } from '../../../legacy/components/Column';

const PageWrapper = styled.div`
  padding: 12px 1rem 20px 1rem;
  margin-bottom: 0.4rem;
  width: 100%;
  color: ${({ theme }) => theme.text2};
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    padding: 12px;
  `};
`;

const TitleRow = styled.div`
  padding: 12px 1rem 0px 1rem;
  margin-bottom: 0.4rem;
`;

export default function YieldFarmView() {
  const { viewModel } = useYieldFarmViewModel();
  const { account } = useWeb3React();
  return (
    <AppBody>
      <PageWrapper>
        <SwapPoolTabs active={'farm'} />
        <AutoColumn gap="lg" style={{ width: '100%' }}>
          <TitleRow>
            <TYPE.black fontWeight={500}>Yield Farm</TYPE.black>
          </TitleRow>
          {!account ? (
            <Card padding="40px">
              <TYPE.body textAlign="center">Connect to a wallet to view Farms.</TYPE.body>
            </Card>
          ) : (
            viewModel.yieldFarms.map((yieldFarm) => (
              <YieldFarmCard
                key={yieldFarm.farmContractAddress}
                farmContractAddress={yieldFarm.farmContractAddress}
                stakeToken={yieldFarm.stakeToken}
                rewardToken={yieldFarm.rewardToken}
                lpAddress={yieldFarm.lpAddress}
                tokenImg1={yieldFarm.tokenImg1}
                tokenImg2={yieldFarm.tokenImg2}
              />
            ))
          )}
        </AutoColumn>
      </PageWrapper>
    </AppBody>
  );
}
