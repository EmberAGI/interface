import { useWeb3React } from '@web3-react/core';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { NetworkContextName } from '../../constants';
import useENSName from '../../hooks/useENSName';
import { useWalletModalToggle } from '../../state/application/hooks';
import { isTransactionRecent, useAllTransactions } from '../../state/transactions/hooks';
import { TransactionDetails } from '../../state/transactions/reducer';
import Loader from '../Loader';

import WalletModal from '../WalletModal';

const Web3StatusGeneric = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  align-items: center;
  border-radius: 12px;
  cursor: pointer;
  user-select: none;
  display: flex;
  flex-wrap: nowrap;
`;

const Web3StatusConnected = styled(Web3StatusGeneric)<{ pending?: boolean }>`
  color: ${({ pending, theme }) => (pending ? theme.white : theme.text1)};
`;

const Text = styled.p`
  background: linear-gradient(135deg, #d5dff3 0%, #cbd5e9 100%);
  border: 1px solid rgba(69, 126, 255, 0.3);
  color: #3568dd;
  width: 100%;
  padding: 8px 12px;
  border-radius: 15px;
  font-size: 18px;
  font-weight: 400;
`;

// we want the latest one to come first, so return negative if a is after b
function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
  return b.addedTime - a.addedTime;
}

function Web3StatusInner() {
  // const { t } = useTranslation();
  const { account } = useWeb3React();

  // const { ENSName } = useENSName(account ?? undefined);

  const allTransactions = useAllTransactions();

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions);
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst);
  }, [allTransactions]);

  const pending = sortedRecentTransactions.filter((tx) => !tx.receipt).map((tx) => tx.hash);

  const hasPendingTransactions = !!pending.length;
  const toggleWalletModal = useWalletModalToggle();

  if (account) {
    return (
      <Web3StatusConnected id="web3-status-connected" onClick={toggleWalletModal} pending={hasPendingTransactions}>
        {hasPendingTransactions ? (
          <Text>
            {pending?.length} Pending <Loader stroke="black" />
          </Text>
        ) : null}
      </Web3StatusConnected>
    );
  } else {
    return null;
  }
}

export default function Web3Status() {
  const { active, account } = useWeb3React();
  const contextNetwork = useWeb3React(NetworkContextName);
  const { ENSName } = useENSName(account ?? undefined);
  const allTransactions = useAllTransactions();

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions);
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst);
  }, [allTransactions]);

  const pending = sortedRecentTransactions.filter((tx) => !tx.receipt).map((tx) => tx.hash);
  const confirmed = sortedRecentTransactions.filter((tx) => tx.receipt).map((tx) => tx.hash);

  if (!contextNetwork.active && !active) {
    return null;
  }

  return (
    <>
      <Web3StatusInner />
      <WalletModal ENSName={ENSName ?? undefined} pendingTransactions={pending} confirmedTransactions={confirmed} />
    </>
  );
}
