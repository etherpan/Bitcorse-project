import {useEffect, useState} from 'react';
import useBulFinance from './useBulFinance';
import {AllocationTime} from '../bomb-finance/types';
import useRefresh from './useRefresh';

const useTreasuryAllocationTimes = () => {
  const {slowRefresh} = useRefresh();
  const [time, setTime] = useState<AllocationTime>({
    from: new Date(),
    to: new Date(),
  });
  const bombFinance = useBulFinance();
  useEffect(() => {
    if (bombFinance) {
      bombFinance.getTreasuryNextAllocationTime().then(setTime);
    }
  }, [bombFinance, slowRefresh]);
  return time;
};

export default useTreasuryAllocationTimes;
