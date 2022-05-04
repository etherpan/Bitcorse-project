import {useCallback, useEffect, useState} from 'react';
import useBulFinance from '../useBulFinance';
import {useWallet} from 'use-wallet';
import {BigNumber} from 'ethers';
import {parseUnits} from 'ethers/lib/utils';

const useEstimateMcorse = (bbondAmount: string) => {
  const [estimateAmount, setEstimateAmount] = useState<string>('');
  const {account} = useWallet();
  const bombFinance = useBulFinance();

  const estimateAmountOfMcorse = useCallback(async () => {
    const bbondAmountBn = parseUnits(bbondAmount);
    const amount = await bombFinance.estimateAmountOfMcorse(bbondAmountBn.toString());
    setEstimateAmount(amount);
  }, [account]);

  useEffect(() => {
    if (account) {
      estimateAmountOfMcorse().catch((err) => console.error(`Failed to get estimateAmountOfMcorse: ${err.stack}`));
    }
  }, [account, estimateAmountOfMcorse]);

  return estimateAmount;
};

export default useEstimateMcorse;
