import {useContext} from 'react';
import {Context} from '../contexts/BulFinanceProvider';

const useBulFinance = () => {
  const {bombFinance} = useContext(Context);
  return bombFinance;
};

export default useBulFinance;
