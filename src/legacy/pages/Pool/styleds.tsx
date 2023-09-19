import { Text } from 'rebass';
import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  padding-top: 1rem;
`;

export const ClickableText = styled(Text)`
  font-family: Inter, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 142.857% */
  letter-spacing: -0.14px;
  :hover {
    cursor: pointer;
  }
  color: ${({ theme }) => '#676B73'};
`;
export const MaxButton = styled.button<{ width: string }>`
  border-radius: 1000px;
  background: var(--alpha-black-5, rgba(14, 14, 14, 0.05));
  padding: 12px 16px;
  color: var(--neutral-900, #0E0E0E);
  text-align: center;
  font-family: Inter, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 150% */
  letter-spacing: -0.16px;
  border: 0;
  cursor: pointer;
`;

export const Dots = styled.span`
  &::after {
    display: inline-block;
    animation: ellipsis 1.25s infinite;
    content: '.';
    width: 1em;
    text-align: left;
  }
  @keyframes ellipsis {
    0% {
      content: '.';
    }
    33% {
      content: '..';
    }
    66% {
      content: '...';
    }
  }
`;
