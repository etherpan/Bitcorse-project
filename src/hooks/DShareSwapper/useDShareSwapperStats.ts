import {useEffect, useState} from 'react';
import useBulFinance from '../useBulFinance';
import {McorseSwapperStat} from '../../bomb-finance/types';
import useRefresh from '../useRefresh';

const useMcorseSwapperStats = (account: string) => {
  const [stat, setStat] = useState<McorseSwapperStat>();
  const {fastRefresh /*, slowRefresh*/} = useRefresh();
  const bombFinance = useBulFinance();

  useEffect(() => {
    async function fetchMcorseSwapperStat() {
      try {
        if (bombFinance.myAccount) {
          setStat(await bombFinance.getMcorseSwapperStat(account));
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchMcorseSwapperStat();
  }, [setStat, bombFinance, fastRefresh, account]);

  return stat;
};

export default useMcorseSwapperStats;
