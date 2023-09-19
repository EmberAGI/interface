import React from 'react';
import styled from 'styled-components';

const ToggleElement = styled.span<{ isActive?: boolean; isOnSwitch?: boolean }>`
  padding: 0.25rem 0.5rem;
  background: ${({ theme, isActive, isOnSwitch }) => (isActive ? (isOnSwitch ? 'white' : 'white') : 'none')};
  font-size: 1rem;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  font-weight: ${({ isOnSwitch }) => (isOnSwitch ? '500' : '400')};
`;

const StyledToggle = styled.button<{ isActive?: boolean; activeElement?: boolean }>`
  border-radius: 12px;
  border: none;
  background: ${({ theme, isActive }) => isActive ? theme.primary1 : theme.bg3};
  display: flex;
  width: fit-content;
  cursor: pointer;
  outline: none;
  padding: 2px;
`;

export interface ToggleProps {
  id?: string;
  isActive: boolean;
  toggle: () => void;
}

export default function Toggle({ id, isActive, toggle }: ToggleProps) {
  return (
    <StyledToggle id={id} isActive={isActive} onClick={toggle}>
      <ToggleElement isActive={!isActive} isOnSwitch={false} />
      <ToggleElement isActive={isActive} isOnSwitch={true} />
    </StyledToggle>
  );
}
