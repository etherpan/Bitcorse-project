import {useCallback} from 'react';
import useBulFinance from './useBulFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import {parseUnits} from 'ethers/lib/utils';
import {TAX_OFFICE_ADDR} from '../utils/constants';

const useProvideBulFtmLP = () => {
  const bombFinance = useBulFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleProvideBulFtmLP = useCallback(
    (bnbAmount: string, bombAmount: string) => {
      const bombAmountBn = parseUnits(bombAmount);
      handleTransactionReceipt(
        bombFinance.provideBulFtmLP(bnbAmount, bombAmountBn),
        `Provide BCE-BTCB LP ${bombAmount} ${bnbAmount} using ${TAX_OFFICE_ADDR}`,
      );
    },
    [bombFinance, handleTransactionReceipt],
  );
  return {onProvideBulFtmLP: handleProvideBulFtmLP};
};

export default useProvideBulFtmLP;
