import {useEffect, useState} from 'react';
import {BigNumber} from 'ethers';
//import ERC20 from '../bomb-finance/ERC20';
import useBulFinance from './useBulFinance';
//import config from '../config';

const useBondsPurchasable = () => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const bombFinance = useBulFinance();

  useEffect(() => {
    async function fetchBondsPurchasable() {
      try {
        setBalance(await bombFinance.getBondsPurchasable());
      } catch (err) {
        console.error(err);
      }
    }
    fetchBondsPurchasable();
  }, [setBalance, bombFinance]);

  return balance;
};

export default useBondsPurchasable;
