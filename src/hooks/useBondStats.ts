import {useEffect, useState} from 'react';
import useBulFinance from './useBulFinance';
import {TokenStat} from '../bomb-finance/types';
import useRefresh from './useRefresh';

const useBondStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const {slowRefresh} = useRefresh();
  const bombFinance = useBulFinance();

  useEffect(() => {
    async function fetchBondPrice() {
      try {
        setStat(await bombFinance.getBondStat());
      } catch (err) {
        console.error(err);
      }
    }
    fetchBondPrice();
  }, [setStat, bombFinance, slowRefresh]);

  return stat;
};

export default useBondStats;
