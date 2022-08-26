import React from 'react';
import AppBody from '../../../legacy/pages/AppBody';
import styled from 'styled-components';

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
        <div>Withdraw</div>
        <div>Stake</div>
      </TitleRow>
    </AppBody>
  );
}
