import React from 'react';
import styled from 'styled-components';
import AppBody from '../../../legacy/pages/AppBody';

export default function YieldFarmStakeWithdrawHeaderView() {
  const TitleRow = styled.div`
    padding: 12px 1rem 0px 1.5rem;
    margin-bottom: 0.4rem;
    display: flex;
    justify-content: space-around;
  `;
  return (
    <AppBody>
      <TitleRow>
        <div>Stake</div>
        <div>Withdraw</div>
      </TitleRow>
    </AppBody>
  );
}
