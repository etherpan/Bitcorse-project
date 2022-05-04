import React, {useCallback, useEffect, useState} from 'react';
import Context from './context';
import useBulFinance from '../../hooks/useBulFinance';
import {Bank} from '../../bomb-finance';
import config, {bankDefinitions} from '../../config';

const Banks: React.FC = ({children}) => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const bombFinance = useBulFinance();
  const isUnlocked = bombFinance?.isUnlocked;

  const fetchPools = useCallback(async () => {
    const banks: Bank[] = [];

    for (const bankInfo of Object.values(bankDefinitions)) {
      if (bankInfo.finished) {
        if (!bombFinance.isUnlocked) continue;
        
        // only show pools staked by user
        const balance = await bombFinance.stakedBalanceOnBank(
          bankInfo.contract,
          bankInfo.poolId,
          bombFinance.myAccount,
          );
          
        if (balance.lte(0)) {
          continue;
        }
      }
      banks.push({
        ...bankInfo,
        address: config.deployments[bankInfo.contract].address,
        depositToken: bombFinance.externalTokens[bankInfo.depositTokenName],
        earnToken: bankInfo.earnTokenName === 'BCE' ? bombFinance.BCE : bombFinance.MCORSE,
      });
    }

    banks.sort((a, b) => (a.sort > b.sort ? 1 : -1));
    setBanks(banks);
  }, [bombFinance, setBanks]);

  useEffect(() => {
    if (bombFinance) {
      fetchPools().catch((err) => console.error(`Failed to fetch pools: ${err.stack}`));
    }
  }, [isUnlocked, bombFinance, fetchPools]);

  return <Context.Provider value={{banks}}>{children}</Context.Provider>;
};

export default Banks;
