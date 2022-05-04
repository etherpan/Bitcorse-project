import {useCallback} from 'react';
import useBulFinance from './useBulFinance';
import {Bank} from '../bomb-finance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useRedeem = (bank: Bank) => {
  const bombFinance = useBulFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleRedeem = useCallback(() => {
    handleTransactionReceipt(bombFinance.exit(bank.contract, bank.poolId), `Redeem ${bank.contract}`);
  }, [bank, bombFinance, handleTransactionReceipt]);

  return {onRedeem: handleRedeem};
};

export default useRedeem;
