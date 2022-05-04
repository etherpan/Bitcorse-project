import { useEffect, useState } from 'react';
import useBulFinance from './useBulFinance';
import { AllocationTime } from '../bomb-finance/types';
import useRefresh from './useRefresh';


const useSharePoolAllocationTimes = () => {
  const { slowRefresh } = useRefresh();
  const [time, setTime] = useState<AllocationTime>({
    from: new Date(),
    to: new Date(),
  });
  const tombFinance = useBulFinance();
  useEffect(() => {
    if (tombFinance) {
      tombFinance.getSharePoolStartAndEndTime().then(setTime);
    }
  }, [tombFinance, slowRefresh]);
  return time;
};

export default useSharePoolAllocationTimes;
