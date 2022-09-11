import { useState, useEffect } from 'react';
import { ROUTER_ADDRESS } from '../../../legacy/constants';
import { useCurrency } from '../../../legacy/hooks/Tokens';
import { ApprovalState, useApproveCallback } from '../../../legacy/hooks/useApproveCallback';
import { tryParseAmount } from '../../../legacy/state/swap/hooks';

export default function useTokenApproval(
  spendableTokenAmount?: string,
  spendableTokenAddress?: string,
  spenderAddress: string = ROUTER_ADDRESS
) {
  const currency = useCurrency(spendableTokenAddress) ?? undefined;
  const currencyAmount = tryParseAmount(spendableTokenAmount, currency);
  const [approvalState, approveCallback] = useApproveCallback(currencyAmount, spenderAddress);
  const [approvalRequired, setApprovalRequired] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [pendingApproval, setPendingApproval] = useState(false);

  useEffect(() => {
    //DEBUG
    console.log(`approvalState: ${approvalState}`);
    switch (approvalState) {
      case ApprovalState.UNKNOWN:
        setApprovalRequired(false);
        setIsApproved(false);
        setPendingApproval(false);
        return;
      case ApprovalState.NOT_APPROVED:
        setApprovalRequired(true);
        setIsApproved(false);
        setPendingApproval(false);
        return;
      case ApprovalState.PENDING:
        setIsApproved(false);
        setPendingApproval(true);
        return;
      case ApprovalState.APPROVED:
        setIsApproved(true);
        setPendingApproval(false);
        return;
    }
  }, [approvalState]);

  const approve = () => {
    approveCallback();
  };

  return {
    approvalRequired,
    isApproved,
    pendingApproval,
    approve,
  };
}
