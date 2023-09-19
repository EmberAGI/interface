import React, { useContext } from 'react';
import { AlertCircle, CheckCircle } from 'react-feather';
import styled, { ThemeContext } from 'styled-components';
import { useActiveWeb3React } from '../../hooks';
import { TYPE } from '../../theme';
import { ExternalLink } from '../../theme/components';
import { getEtherscanLink } from '../../utils';
import { AutoColumn } from '../Column';
import { AutoRow } from '../Row';

const RowNoFlex = styled(AutoRow)`
  flex-wrap: nowrap;
  border-radius: 13px;
  border: 1px solid var(--teal-200, #73E5B7);
  background: var(--teal-100, #C3FBE5);
  padding: 12px;
`;

const StyledTitle = styled.p`
  color: var(--neutral-700, #222426);
  font-family: Inter, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 150% */
  letter-spacing: -0.16px;
  margin: 0 0 8px;
`;

const StyledLink = styled.p`
  color: var(--neutral-700, #222426);
  font-family: Inter, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
  letter-spacing: -0.14px;
  text-decoration-line: underline;
  margin: 0;
`;

export default function TransactionPopup({
  hash,
  success,
  summary,
}: {
  hash: string;
  success?: boolean;
  summary?: string;
}) {
  const { chainId } = useActiveWeb3React();

  const theme = useContext(ThemeContext);

  return (
    <RowNoFlex>
      <div style={{ paddingRight: 16 }}>
        {success ? <CheckCircle color={theme.green1} size={24} /> : <AlertCircle color={theme.red1} size={24} />}
      </div>
      <AutoColumn gap="8px">
        <StyledTitle>
          Transaction successful!
        </StyledTitle>
        <a href=""></a>
        {chainId && <ExternalLink href={getEtherscanLink(chainId, hash, 'transaction')}>
          <StyledLink>
            See details
          </StyledLink>
        </ExternalLink>}
      </AutoColumn>
    </RowNoFlex>
  );
}
