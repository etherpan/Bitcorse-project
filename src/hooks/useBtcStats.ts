import {useEffect, useState} from 'react';
import useBulFinance from './useBulFinance';
//import {TokenStat} from '../bomb-finance/types';
import useRefresh from './useRefresh';

const useBtcStats = () => {
  const [stat, setStat] = useState<Number>();
  const {slowRefresh} = useRefresh();
  const bombFinance = useBulFinance();

  useEffect(() => {
    async function fetchSharePrice() {
      try {
        setStat(await bombFinance.getBTCPriceUSD());
      } catch (err) {
        console.error(err);
      }
    }
    fetchSharePrice();
  }, [setStat, bombFinance, slowRefresh]);

  return stat;
};

export default useBtcStats;
