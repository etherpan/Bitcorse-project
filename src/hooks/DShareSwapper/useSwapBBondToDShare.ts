import {useCallback} from 'react';
import useBulFinance from '../useBulFinance';
import useHandleTransactionReceipt from '../useHandleTransactionReceipt';
// import { BigNumber } from "ethers";
import {parseUnits} from 'ethers/lib/utils';

const useSwapBonseToMcorse = () => {
  const bombFinance = useBulFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleSwapMcorse = useCallback(
    (bbondAmount: string) => {
      const bbondAmountBn = parseUnits(bbondAmount, 18);
      handleTransactionReceipt(bombFinance.swapBonseToMcorse(bbondAmountBn), `Swap ${bbondAmount} Bonse to Mcorse`);
    },
    [bombFinance, handleTransactionReceipt],
  );
  return {onSwapMcorse: handleSwapMcorse};
};

export default useSwapBonseToMcorse;
