import {useEffect, useState} from 'react';
import useBulFinance from './useBulFinance';
import useRefresh from './useRefresh';

const useFetchBulAPR = () => {
  const [apr, setApr] = useState<number>(0);
  const bombFinance = useBulFinance();
  const {slowRefresh} = useRefresh();

  useEffect(() => {
    async function fetchBoardroomAPR() {
      try {
        setApr(await bombFinance.getBulStakeAPR());
      } catch (err) {
        console.error(err);
      }
    }
    fetchBoardroomAPR();
  }, [setApr, bombFinance, slowRefresh]);

  return apr;
};

export default useFetchBulAPR;
