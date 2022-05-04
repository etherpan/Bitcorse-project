import {useEffect, useState} from 'react';
import useBulFinance from './useBulFinance';
import {TokenStat} from '../bomb-finance/types';
import useRefresh from './useRefresh';

const useCashPriceInEstimatedTWAP = () => {
  const [stat, setStat] = useState<TokenStat>();
  const bombFinance = useBulFinance();
  const {slowRefresh} = useRefresh();

  useEffect(() => {
    async function fetchCashPrice() {
      try {
        setStat(await bombFinance.getBulStatInEstimatedTWAP());
      } catch (err) {
        console.error(err);
      }
    }
    fetchCashPrice();
  }, [setStat, bombFinance, slowRefresh]);

  return stat;
};

export default useCashPriceInEstimatedTWAP;
