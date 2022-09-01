import { BigNumber, ethers } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { useState, useEffect } from 'react';
import { ERC20_ABI } from '../../legacy/constants/abis/erc20';
import farmingContractABI from '../../legacy/constants/abis/farmingContract.json';
import { useActiveWeb3React } from '../../legacy/hooks';
import { ApprovalState, useApproveCallback } from '../../legacy/hooks/useApproveCallback';

export interface UserApprovedAmount {
  approvedAmount: string;
}

const initialFarmStats = {
  approvedAmount: '10',
};

export default function useTokenApproval(
  spendableTokenAmount: number,
  spendableTokenAddress: string,
  spenderAddress: string
) {
  const { library, account } = useActiveWeb3React();
  const [approvalState, approvalStateCallback] = useApproveCallback(parsedAmounts[Field.CURRENCY_A], ROUTER_ADDRESS);
  const [isApproved, setIsApproved] = useState(true);
  const [pendingApproval, setPendingApproval] = useState(false);

  useEffect(() => {
    switch (approvalState) {
      case ApprovalState.UNKNOWN:
      case ApprovalState.NOT_APPROVED:
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

  const approve = () => {};

  return {
    isApproved,
    pendingApproval,
    approve,
  };
}
