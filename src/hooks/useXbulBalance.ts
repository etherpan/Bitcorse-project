import {useEffect, useState} from 'react';
import {BigNumber} from 'ethers';
import useBulFinance from './useBulFinance';
import useRefresh from './useRefresh';
import {parseUnits} from 'ethers/lib/utils';

const useXbulBalance = () => {
  const {slowRefresh} = useRefresh();
  const [balance, setBalance] = useState(BigNumber.from(0));
  const bombFinance = useBulFinance();
  useEffect(() => {
    async function fetchBalance() {
      try {
        const rate = await bombFinance.getXbulExchange();
        setBalance(rate);
      } catch (e) {
        console.error(e);
      }
    }

    fetchBalance();
  }, [setBalance, slowRefresh, bombFinance]);
  return balance;
};

export default useXbulBalance;
