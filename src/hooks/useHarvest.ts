import {useCallback} from 'react';
import useBulFinance from './useBulFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import {Bank} from '../bomb-finance';

const useHarvest = (bank: Bank) => {
  const bombFinance = useBulFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleReward = useCallback(() => {
    handleTransactionReceipt(
      bombFinance.harvest(bank.contract, bank.poolId),
      `Claim ${bank.earnTokenName} from ${bank.contract}`,
    );
  }, [bank, bombFinance, handleTransactionReceipt]);

  return {onReward: handleReward};
};

export default useHarvest;
