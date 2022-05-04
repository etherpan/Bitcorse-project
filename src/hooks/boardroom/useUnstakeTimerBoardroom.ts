import {useEffect, useState} from 'react';
import useBulFinance from '../useBulFinance';
import {AllocationTime} from '../../bomb-finance/types';

const useUnstakeTimerBoardroom = () => {
  const [time, setTime] = useState<AllocationTime>({
    from: new Date(),
    to: new Date(),
  });
  const bombFinance = useBulFinance();

  useEffect(() => {
    if (bombFinance) {
      bombFinance.getUserUnstakeTime().then(setTime);
    }
  }, [bombFinance]);
  return time;
};

export default useUnstakeTimerBoardroom;
