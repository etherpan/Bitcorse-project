import {useEffect, useState} from 'react';
import useBulFinance from './useBulFinance';
import useRefresh from './useRefresh';

const useTotalValueLocked = () => {
  const [totalValueLocked, setTotalValueLocked] = useState<Number>(0);
  const {slowRefresh} = useRefresh();
  const bombFinance = useBulFinance();

  useEffect(() => {
    async function fetchTVL() {
      try {
        setTotalValueLocked(await bombFinance.getTotalValueLocked());
      } catch (err) {
        console.error(err);
      }
    }
    fetchTVL();
  }, [setTotalValueLocked, bombFinance, slowRefresh]);

  return totalValueLocked;
};

export default useTotalValueLocked;
