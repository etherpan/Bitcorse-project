import {useEffect, useState} from 'react';
import useBulFinance from './useBulFinance';
import {TokenStat} from '../bomb-finance/types';
import useRefresh from './useRefresh';

const useBulStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const {fastRefresh} = useRefresh();
  const bombFinance = useBulFinance();

  useEffect(() => {
    async function fetchBulPrice() {
      try {
        setStat(await bombFinance.getBulStat());
      } catch (err) {
        console.error(err);
      }
    }
    fetchBulPrice();
  }, [setStat, bombFinance, fastRefresh]);

  return stat;
};

export default useBulStats;
