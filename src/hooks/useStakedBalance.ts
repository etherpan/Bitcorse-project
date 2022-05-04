import {useCallback, useEffect, useState} from 'react';

import {BigNumber} from 'ethers';
import useBulFinance from './useBulFinance';
import {ContractName} from '../bomb-finance';
import config from '../config';

const useStakedBalance = (poolName: ContractName, poolId: Number) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const bombFinance = useBulFinance();
  const isUnlocked = bombFinance?.isUnlocked;

  const fetchBalance = useCallback(async () => {
    const balance = await bombFinance.stakedBalanceOnBank(poolName, poolId, bombFinance.myAccount);
    setBalance(balance);
  }, [poolName, poolId, bombFinance]);

  useEffect(() => {
    if (isUnlocked) {
      fetchBalance().catch((err) => console.error(err.stack));

      const refreshBalance = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshBalance);
    }
  }, [isUnlocked, poolName, setBalance, bombFinance, fetchBalance]);

  return balance;
};

export default useStakedBalance;
