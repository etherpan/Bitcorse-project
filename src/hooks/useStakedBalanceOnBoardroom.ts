import {useEffect, useState} from 'react';
import {BigNumber} from 'ethers';
import useBulFinance from './useBulFinance';
import useRefresh from './useRefresh';

const useStakedBalanceOnBoardroom = () => {
  const {slowRefresh} = useRefresh();
  const [balance, setBalance] = useState(BigNumber.from(0));
  const bombFinance = useBulFinance();
  const isUnlocked = bombFinance?.isUnlocked;
  useEffect(() => {
    async function fetchBalance() {
      try {
        setBalance(await bombFinance.getStakedSharesOnBoardroom());
      } catch (e) {
        console.error(e);
      }
    }
    if (isUnlocked) {
      fetchBalance();
    }
  }, [slowRefresh, isUnlocked, bombFinance]);
  return balance;
};

export default useStakedBalanceOnBoardroom;
