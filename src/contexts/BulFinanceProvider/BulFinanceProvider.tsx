import React, {createContext, useEffect, useState} from 'react';
import {useWallet} from 'use-wallet';
import BulFinance from '../../bomb-finance';
import config from '../../config';

export interface BulFinanceContext {
  bombFinance?: BulFinance;
}

export const Context = createContext<BulFinanceContext>({bombFinance: null});

export const BulFinanceProvider: React.FC = ({children}) => {
  const {ethereum, account} = useWallet();
  const [bombFinance, setBulFinance] = useState<BulFinance>();

  useEffect(() => {
    if (!bombFinance) {
      const bomb = new BulFinance(config);
      if (account) {
        // wallet was unlocked at initialization
        bomb.unlockWallet(ethereum, account);
      }
      setBulFinance(bomb);
    } else if (account) {
      bombFinance.unlockWallet(ethereum, account);
    }
  }, [account, ethereum, bombFinance]);

  return <Context.Provider value={{bombFinance}}>{children}</Context.Provider>;
};
