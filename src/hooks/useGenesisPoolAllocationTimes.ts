import { useEffect, useState } from 'react';
import useBulFinance from '../hooks/useBulFinance';
import { AllocationTime } from '../bomb-finance/types';
import useRefresh from './useRefresh';


const useGenesisPoolAllocationTimes = () => {
  const { slowRefresh } = useRefresh();
  const [time, setTime] = useState<AllocationTime>({
    from: new Date(),
    to: new Date(),
  });
  const bulFinance = useBulFinance();
  useEffect(() => {
    if (bulFinance) {
      bulFinance.getGenesisPoolStartAndEndTime().then(setTime);
    }
  }, [bulFinance, slowRefresh]);
  return time;
};

export default useGenesisPoolAllocationTimes;
