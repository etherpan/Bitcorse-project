import {useEffect, useState} from 'react';
import {BigNumber} from 'ethers';
import useBulFinance from './useBulFinance';
import useRefresh from './useRefresh';

const useStakedBulBalance = () => {
  const {slowRefresh} = useRefresh();
  const [balance, setBalance] = useState(BigNumber.from(0));
  const bombFinance = useBulFinance();
  useEffect(() => {
    async function fetchBalance() {
      try {
        setBalance(await bombFinance.getTotalStakedBul());
      } catch (e) {
        console.error(e);
      }
    }
    fetchBalance();
  }, [slowRefresh, bombFinance]);
  return balance;
};

export default useStakedBulBalance;
