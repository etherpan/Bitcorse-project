import {useCallback, useEffect, useState} from 'react';
import useBulFinance from './useBulFinance';
import config from '../config';
import {BigNumber} from 'ethers';

const useCashPriceInLastTWAP = () => {
  const [price, setPrice] = useState<BigNumber>(BigNumber.from(0));
  const bombFinance = useBulFinance();

  const fetchCashPrice = useCallback(async () => {
    setPrice(await bombFinance.getBulPriceInLastTWAP());
  }, [bombFinance]);

  useEffect(() => {
    fetchCashPrice().catch((err) => console.error(`Failed to fetch BCE price: ${err.stack}`));
    const refreshInterval = setInterval(fetchCashPrice, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [setPrice, bombFinance, fetchCashPrice]);

  return price;
};

export default useCashPriceInLastTWAP;
