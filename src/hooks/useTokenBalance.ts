import {useCallback, useEffect, useState} from 'react';
import {BigNumber} from 'ethers';
import ERC20 from '../bomb-finance/ERC20';
import useBulFinance from './useBulFinance';
import config from '../config';

const useTokenBalance = (token: ERC20) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const bombFinance = useBulFinance();
  const isUnlocked = bombFinance?.isUnlocked;

  const fetchBalance = useCallback(async () => {
    console.log('=========>', token, bombFinance.myAccount)
    setBalance(await token.balanceOf(bombFinance.myAccount));
  }, [token, bombFinance.myAccount]);

  useEffect(() => {
    if (isUnlocked) {
      fetchBalance().catch((err) => console.error(`Failed to fetch token balance: ${err.stack}`));
      let refreshInterval = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshInterval);
    }
  }, [isUnlocked, token, fetchBalance, bombFinance]);

  return balance;
};

export default useTokenBalance;
