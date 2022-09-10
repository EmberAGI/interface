import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'react-feather';
import AppBody from '../../../legacy/pages/AppBody';
import { HideSmall, TYPE } from '../../../legacy/theme';
import { Text } from 'rebass';
import { RowBetween, RowFixed } from '../../../legacy/components/Row';
import { ButtonPrimary } from '../../../legacy/components/Button';

/*const TitleRow = styled.div`
  padding: 12px 1rem 0px 1.5rem;
  margin-bottom: 0.4rem;
  display: flex;
  justify-content: space-between;
`;*/
const StyledArrowLeft = styled(ArrowLeft)`
  color: ${({ theme }) => theme.text1};
`;

const TitleRow = styled(RowBetween)`
  padding: 8px 16px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-wrap: wrap;
    width: 100%;
  `};
`;

const ButtonRow = styled(RowFixed)`
  flex: 1
  gap: 8px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 100%;
    flex-direction: row-reverse;
    justify-content: space-between;
  `};
`;

const ResponsiveButtonPrimary = styled(ButtonPrimary)`
  width: fit-content;
`;

const EdgeWrapper = styled.div`
  flex: 1;
  display: flex;
  min-width: -webkit-min-content;
`;

interface YieldFarmManageHeaderProps {
  page: 'stake' | 'withdraw';
  farmContractAddress: string;
}
export default function YieldFarmManageHeader(props: YieldFarmManageHeaderProps) {
  const { farmContractAddress } = props;
  return (
    <AppBody>
      <TitleRow style={{ margin: '0rem' }} padding={'0.4rem'}>
        <EdgeWrapper>
          <Link to="/farm">
            <StyledArrowLeft />
          </Link>
        </EdgeWrapper>
        <TYPE.black fontWeight={500}>{props.page == 'stake' ? 'Stake' : 'Withdraw'}</TYPE.black>
        <EdgeWrapper style={{ justifyContent: 'flex-end' }}>
          {props.page != 'stake' && (
            <ResponsiveButtonPrimary as={Link} padding="6px 10px" to={`/stake/${farmContractAddress}`}>
              <Text fontWeight={500} fontSize={16}>
                Stake
              </Text>
            </ResponsiveButtonPrimary>
          )}
          {props.page != 'withdraw' && (
            <ResponsiveButtonPrimary
              id="join-pool-button"
              as={Link}
              padding="6px 10px"
              to={`/withdraw/${farmContractAddress}`}
            >
              <Text fontWeight={500} fontSize={16}>
                Withdraw
              </Text>
            </ResponsiveButtonPrimary>
          )}
        </EdgeWrapper>
      </TitleRow>
    </AppBody>
  );
}
