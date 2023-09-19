import React from 'react';
import styled from 'styled-components';
import Settings from '../Settings';
import { RowBetween } from '../Row';
import { TYPE } from '../../theme';

const StyledSwapHeader = styled.div`
  margin-bottom: 16px;
  width: 100%;
  color: ${({ theme }) => theme.text2};
`;

const StyledHeader = styled.div`
  color: var(--neutral-800, #191919);
  font-family: Inter, sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px; /* 133.333% */
  letter-spacing: -0.384px;
`;

export default function SwapHeader() {
  return (
    <StyledSwapHeader>
      <RowBetween>
        <StyledHeader>Swap</StyledHeader>
        <Settings />
      </RowBetween>
    </StyledSwapHeader>
  );
}
