import React, { useEffect } from 'react';
import AppBody from '../../../legacy/pages/AppBody';
import styled from 'styled-components';
import { TYPE } from 'legacy/theme';
import YieldFarmCard from '../components/YieldFarmCard';
import Card from '../../../legacy/components/Card';
import { SwapPoolTabs } from 'legacy/components/NavigationTabs';
import useYieldFarmViewModel from './useYieldFarmViewModel';
import { useWeb3React } from '@web3-react/core';

const PageWrapper = styled.div`
  padding: 12px 1rem 0px 1.5rem;
  margin-bottom: 0.4rem;
  width: 100%;
  color: ${({ theme }) => theme.text2};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleRow = styled.div`
  padding: 12px 1rem 0px 1.5rem;
  margin-bottom: 0.4rem;
`;
export default function YieldFarmView() {
  const { viewModel } = useYieldFarmViewModel();
  const { account } = useWeb3React();
  return (
    <AppBody>
      <SwapPoolTabs active={'farm'} />
      <TitleRow>
        <TYPE.black fontWeight={500}>Yield Farm</TYPE.black>
      </TitleRow>
      {!account ? (
        <Card padding="40px">
          <TYPE.body textAlign="center">Connect to a wallet to view Farms.</TYPE.body>
        </Card>
      ) : (
        viewModel.yieldFarms.map((yieldFarm) => (
          <TitleRow key={yieldFarm.contractAddress}>
            <PageWrapper>
              <YieldFarmCard farmContractAddress={yieldFarm.contractAddress} />
            </PageWrapper>
          </TitleRow>
        ))
      )}
    </AppBody>
  );
}
