import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'react-feather';
import { AppDispatch } from 'legacy/state';
import { resetMintState } from 'legacy/state/mint/actions';
import { useDispatch } from 'react-redux';
import AppBody from '../../../legacy/pages/AppBody';

export default function YieldFarmStakeWithdrawHeaderView() {
  const TitleRow = styled.div`
    padding: 12px 1rem 0px 1.5rem;
    margin-bottom: 0.4rem;
    display: flex;
    justify-content: space-between;
  `;
  const StyledArrowLeft = styled(ArrowLeft)`
    color: ${({ theme }) => theme.text1};
  `;
  const dispatch = useDispatch<AppDispatch>();
  return (
    <AppBody>
      <TitleRow>
        <Link
          to="/farm"
          onClick={() => {
            dispatch(resetMintState());
          }}
        >
          <StyledArrowLeft />
        </Link>
        <Link to="/stake/AMB/0xA9646A0281996fDcB88f8f6f01Af52BB0268c494">
          <div>Stake</div>
        </Link>
        <Link to="/withdraw/AMB/0xA9646A0281996fDcB88f8f6f01Af52BB0268c494">
          <div>Withdraw</div>
        </Link>
      </TitleRow>
    </AppBody>
  );
}
