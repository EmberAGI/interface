import React from 'react';
import styled from 'styled-components';

export const BodyWrapper = styled.div`
  position: relative;
  max-width: 500px;
  width: 100%;
  padding: 32px;
  margin: 0 0 64px 0;
  border-radius: 40px;
  border: 1px solid var(--neutral-100, #E6E6E6);
  background: var(--neutral-0, #FFF);
  background: ${({ theme }) => theme.bg1};

  @media (max-width: 600px) {
    padding: 24px;
  }
`;

export default function AppBody({ children }: { children: React.ReactNode }) {
  return <BodyWrapper>{children}</BodyWrapper>;
}
