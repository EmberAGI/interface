import React, { useContext, useRef, useState } from 'react';
import { X } from 'react-feather';
import {ReactComponent as Settings} from "../../assets/svg/settings.svg";
import { Text } from 'rebass';
import styled, { ThemeContext } from 'styled-components';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { ApplicationModal } from '../../state/application/actions';
import { useModalOpen, useToggleSettingsMenu } from '../../state/application/hooks';
import {
  useExpertModeManager,
  useUserTransactionTTL,
  useUserSlippageTolerance,
  useUserSingleHopOnly,
} from '../../state/user/hooks';
import { TYPE } from '../../theme';
import { ButtonError } from '../Button';
import { AutoColumn } from '../Column';
import Modal from '../Modal';
import QuestionHelper from '../QuestionHelper';
import { RowBetween, RowFixed } from '../Row';
import Toggle from '../Toggle';
import TransactionSettings from '../TransactionSettings';

const StyledMenuIcon = styled(Settings)`
  height: 28px;
  width: 28px;

  > * {
    stroke: ${({ theme }) => theme.text2};
  }

  :hover {
    opacity: 0.7;
  }
`;

const StyledCloseIcon = styled(X)`
  height: 20px;
  width: 20px;
  :hover {
    cursor: pointer;
  }

  > * {
    stroke: ${({ theme }) => theme.text1};
  }
`;

const StyledMenuButton = styled.button`
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 35px;

  padding: 0.15rem 0.5rem;
  border-radius: 0.5rem;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
  }

  svg {
    margin-top: 2px;
  }
`;
const EmojiWrapper = styled.div`
  position: absolute;
  bottom: -6px;
  right: 0px;
  font-size: 14px;
`;

const StyledMenu = styled.div`
  margin-left: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
  text-align: left;
`;

const MenuFlyout = styled.span`
  min-width: 420px;
  background-color: ${({ theme }) => theme.bg2};
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  position: absolute;
  top: 3rem;
  right: 0rem;
  padding: 32px;
  z-index: 100;
  border-radius: 40px;
  border: 1px solid var(--neutral-100, #E6E6E6);
  background: var(--neutral-0, #FFF);

  /* Shadows/4 */
  box-shadow: 0px 8px 24px 0px rgba(47, 43, 67, 0.10);
  
  @media (max-width: 500px) {
    right: -24px;
    padding: 24px;
    min-width: auto;
    width: calc(100vw - 33px);
  }
`;

const Break = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.bg3};
`;

const ModalContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  background-color: ${({ theme }) => theme.bg2};
  border-radius: 20px;
`;

const StyledTitle = styled.p`
  color: #0E0E0E;
  font-family: Inter, sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 26px; /* 144.444% */
  letter-spacing: -0.216px;
  margin: 0 0 24px;
`;

export default function SettingsTab() {
  const node = useRef<HTMLDivElement>();
  const open = useModalOpen(ApplicationModal.SETTINGS);
  const toggle = useToggleSettingsMenu();

  const theme = useContext(ThemeContext);
  const [userSlippageTolerance, setUserslippageTolerance] = useUserSlippageTolerance();

  const [ttl, setTtl] = useUserTransactionTTL();

  const [expertMode, toggleExpertMode] = useExpertModeManager();

  const [singleHopOnly, setSingleHopOnly] = useUserSingleHopOnly();

  // show confirmation view before turning on
  const [showConfirmation, setShowConfirmation] = useState(false);

  useOnClickOutside(node, open ? toggle : undefined);

  return (
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
    <StyledMenu ref={node as any}>
      <Modal isOpen={showConfirmation} onDismiss={() => setShowConfirmation(false)} maxHeight={100}>
        <ModalContentWrapper>
          <AutoColumn gap="lg">
            <RowBetween style={{ padding: '0 2rem' }}>
              <div />
              <Text fontWeight={500} fontSize={20}>
                Are you sure?
              </Text>
              <StyledCloseIcon onClick={() => setShowConfirmation(false)} />
            </RowBetween>
            <Break />
            <AutoColumn gap="lg" style={{ padding: '0 2rem' }}>
              <Text fontWeight={500} fontSize={20}>
                Expert mode turns off the confirm transaction prompt and allows high slippage trades that often result
                in bad rates and lost funds.
              </Text>
              <Text fontWeight={600} fontSize={20}>
                ONLY USE THIS MODE IF YOU KNOW WHAT YOU ARE DOING.
              </Text>
              <ButtonError
                error={true}
                padding={'12px'}
                onClick={() => {
                  if (window.prompt(`Please type the word "confirm" to enable expert mode.`) === 'confirm') {
                    toggleExpertMode();
                    setShowConfirmation(false);
                  }
                }}
              >
                <Text fontSize={20} fontWeight={500} id="confirm-expert-mode">
                  Turn On Expert Mode
                </Text>
              </ButtonError>
            </AutoColumn>
          </AutoColumn>
        </ModalContentWrapper>
      </Modal>
      <StyledMenuButton onClick={toggle} id="open-settings-dialog-button">
        <StyledMenuIcon />
        {expertMode ? (
          <EmojiWrapper>
            <span role="img" aria-label="wizard-icon">
              🧙
            </span>
          </EmojiWrapper>
        ) : null}
      </StyledMenuButton>
      {open && (
        <MenuFlyout>
          <AutoColumn gap="md">
            <StyledTitle>
              Transaction Settings
            </StyledTitle>
            <TransactionSettings
              rawSlippage={userSlippageTolerance}
              setRawSlippage={setUserslippageTolerance}
              deadline={ttl}
              setDeadline={setTtl}
            />
            <StyledTitle>
              Interface Settings
            </StyledTitle>
            <RowBetween marginBottom={16}>
              <RowFixed>
                <TYPE.black fontWeight={400} fontSize={14} color={theme.text2}>
                  Toggle Expert Mode
                </TYPE.black>
                <QuestionHelper text="Bypasses confirmation modals and allows high slippage trades. Use at your own risk." />
              </RowFixed>
              <Toggle
                id="toggle-expert-mode-button"
                isActive={expertMode}
                toggle={
                  expertMode
                    ? () => {
                        toggleExpertMode();
                        setShowConfirmation(false);
                      }
                    : () => {
                        toggle();
                        setShowConfirmation(true);
                      }
                }
              />
            </RowBetween>
            <RowBetween>
              <RowFixed>
                <TYPE.black fontWeight={400} fontSize={14} color={theme.text2}>
                  Disable Multihops
                </TYPE.black>
                <QuestionHelper text="Restricts swaps to direct pairs only." />
              </RowFixed>
              <Toggle
                id="toggle-disable-multihop-button"
                isActive={singleHopOnly}
                toggle={() => (singleHopOnly ? setSingleHopOnly(false) : setSingleHopOnly(true))}
              />
            </RowBetween>
          </AutoColumn>
        </MenuFlyout>
      )}
    </StyledMenu>
  );
}
