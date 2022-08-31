import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'react-feather';
import AppBody from '../../../legacy/pages/AppBody';

const TitleRow = styled.div`
  padding: 12px 1rem 0px 1.5rem;
  margin-bottom: 0.4rem;
  display: flex;
  justify-content: space-between;
`;
const StyledArrowLeft = styled(ArrowLeft)`
  color: ${({ theme }) => theme.text1};
`;
interface YieldFarmCardStatsProps {
  farmContractAddress: string;
}
export default function YieldFarmStakeWithdrawHeaderView(props: YieldFarmCardStatsProps) {
  const { farmContractAddress } = props;
  return (
    <AppBody>
      <TitleRow>
        <Link to="/farm">
          <StyledArrowLeft />
        </Link>
        <Link to={`/stake/${farmContractAddress}`}>
          <div>Stake</div>
        </Link>
        <Link to={`/withdraw/${farmContractAddress}`}>
          <div>Withdraw</div>
        </Link>
      </TitleRow>
    </AppBody>
  );
}
