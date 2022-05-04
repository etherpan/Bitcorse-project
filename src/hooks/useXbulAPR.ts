import {useEffect, useState} from 'react';
import useBulFinance from './useBulFinance';
import {PoolStats} from '../bomb-finance/types';

import useRefresh from './useRefresh';

const useXbulAPR = () => {
  const {slowRefresh} = useRefresh();
  const [bombAPR, setBulAPR] = useState<PoolStats>();

  const bombFinance = useBulFinance();
  const isUnlocked = bombFinance?.isUnlocked;
  useEffect(() => {
    async function fetchBalance() {
      try {
        setBulAPR(await bombFinance.getXbulAPR());
      } catch (e) {
        console.error(e);
      }
    }
    if (isUnlocked) {
      fetchBalance();
    }
  }, [slowRefresh, isUnlocked, bombFinance]);
  return bombAPR;
};

export default useXbulAPR;
