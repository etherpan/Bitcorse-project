import {useEffect, useState} from 'react';
import useBulFinance from './useBulFinance';
import {LPStat} from '../bomb-finance/types';
import useRefresh from './useRefresh';

const useLpStatsBTC = (lpTicker: string) => {
  const [stat, setStat] = useState<LPStat>();
  const {slowRefresh} = useRefresh();
  const bombFinance = useBulFinance();

  useEffect(() => {
    async function fetchLpPrice() {
      try {
        setStat(await bombFinance.getLPStatBTC(lpTicker));
      } catch (err) {
        console.error(err);
      }
    }
    fetchLpPrice();
  }, [setStat, bombFinance, slowRefresh, lpTicker]);

  return stat;
};

export default useLpStatsBTC;
