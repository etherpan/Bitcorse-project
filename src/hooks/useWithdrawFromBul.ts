import {useCallback} from 'react';
import useBulFinance from './useBulFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useWithdrawFromBul = () => {
  const bombFinance = useBulFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleWithdraw = useCallback(
    (amount: string) => {
      handleTransactionReceipt(bombFinance.withdrawFromBul(amount), `Redeem ${amount} BCE from xBCE Staking`);
    },
    [bombFinance, handleTransactionReceipt],
  );
  return {onWithdraw: handleWithdraw};
};

export default useWithdrawFromBul;
