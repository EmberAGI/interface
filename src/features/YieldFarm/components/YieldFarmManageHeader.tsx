import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'react-feather';
import { TYPE } from '../../../legacy/theme';
import { RowBetween } from '../../../legacy/components/Row';
import { ButtonPrimary } from '../../../legacy/components/Button';

const StyledArrowLeft = styled(ArrowLeft)`
  color: ${({ theme }) => theme.text1};
`;

const TitleRow = styled(RowBetween)`
  padding: 1rem 1rem 0 1rem;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-wrap: wrap;
    width: 100%;
  `};
`;

const ResponsiveButtonPrimary = styled(ButtonPrimary)`
  width: fit-content;
  font-size: 0.8rem;
  padding: 6px 10px;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    font-size: 0.75rem;
  `};
`;

const EdgeWrapper = styled.div`
  flex: 1;
  display: flex;
  min-width: -webkit-min-content;
`;

const Tabs = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  border-radius: 3rem;
  justify-content: space-evenly;
`;

interface YieldFarmManageHeaderProps {
  page: 'stake' | 'withdraw';
  farmContractAddress: string;
}
export default function YieldFarmManageHeader(props: YieldFarmManageHeaderProps) {
  const { farmContractAddress } = props;
  return (
    <Tabs>
      <TitleRow style={{ margin: '0rem' }}>
        <EdgeWrapper>
          <Link to="/farm">
            <StyledArrowLeft />
          </Link>
        </EdgeWrapper>
        <TYPE.black fontWeight={500} fontSize={20}>
          {props.page == 'stake' ? 'Stake' : 'Withdraw'}
        </TYPE.black>
        <EdgeWrapper style={{ justifyContent: 'flex-end' }}>
          {props.page != 'stake' && (
            <ResponsiveButtonPrimary as={Link} to={`/stake/${farmContractAddress}`}>
              Stake
            </ResponsiveButtonPrimary>
          )}
          {props.page != 'withdraw' && (
            <ResponsiveButtonPrimary
              id="join-pool-button"
              as={Link}
              padding="6px 10px"
              to={`/withdraw/${farmContractAddress}`}
            >
              Withdraw
            </ResponsiveButtonPrimary>
          )}
        </EdgeWrapper>
      </TitleRow>
    </Tabs>
  );
}
