import React, { useEffect } from 'react';
import AppBody from '../../legacy/pages/AppBody';
import styled from 'styled-components';
import { TYPE } from 'legacy/theme';
import YieldFarmCardView from './components/YieldFarmCardView';
import { SwapPoolTabs } from 'legacy/components/NavigationTabs';
import useYieldFarmViewModel from './useYieldFarmViewModel';

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

  return (
    <AppBody>
      <SwapPoolTabs active={'farm'} />
      <TitleRow>
        <TYPE.black fontWeight={500}>Farm</TYPE.black>
      </TitleRow>
      {viewModel.yieldFarms.map((yieldFarm) => (
        <TitleRow key={yieldFarm.stakingTokenName}>
          <TYPE.black fontWeight={500}>TVL: {yieldFarm.farmStats.tvl}</TYPE.black>
          <TYPE.black fontWeight={500}>APR: {yieldFarm.farmStats.apr}</TYPE.black>
          <TYPE.black fontWeight={500}>Daily ROI: {yieldFarm.farmStats.dailyROI}</TYPE.black>
        </TitleRow>
        /*<PageWrapper key={yieldFarm.stakingTokenName}>
          <YieldFarmCardView />
        </PageWrapper>*/
      ))}
    </AppBody>
  );
}
