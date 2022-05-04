import React, { useMemo, useState } from 'react';
import Page from '../../components/Page';
import useLpStats from '../../hooks/useLpStats';
import { Box, Button, Grid, Paper, Typography } from '@material-ui/core';
import useBulStats from '../../hooks/useBondStats';
import TokenInput from '../../components/TokenInput';
import useBulFinance from '../../hooks/useBulFinance';
import { useWallet } from 'use-wallet';
import useTokenBalance from '../../hooks/useTokenBalance';
import { getDisplayBalance } from '../../utils/formatBalance';
import useApproveTaxOffice from '../../hooks/useApproveTaxOffice';
import { ApprovalState } from '../../hooks/useApprove';
import useProvideBulFtmLP from '../../hooks/useProvideBulFtmLP';
import { Alert } from '@material-ui/lab';
import { Helmet } from 'react-helmet';
import {BackgroundImage} from '../Home/Home.js';

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
const TITLE = 'Bitcorsefinance.co |'

const ProvideLiquidity = () => {
  const [bombAmount, setBulAmount] = useState(0);
  const [bnbAmount, setbnbAmount] = useState(0);
  const [lpTokensAmount, setLpTokensAmount] = useState(0);
  const { balance } = useWallet();
  const bombStats = useBulStats();
  const bombFinance = useBulFinance();
  const [approveTaxOfficeStatus, approveTaxOffice] = useApproveTaxOffice();
  const bombBalance = useTokenBalance(bombFinance.BCE);
  const btcBalance = useTokenBalance(bombFinance.BTC);

  const ftmBalance = (btcBalance / 1e18).toFixed(4);
  const { onProvideBulFtmLP } = useProvideBulFtmLP();
  const bombFtmLpStats = useLpStats('BCE');

  const bombLPStats = useMemo(() => (bombFtmLpStats ? bombFtmLpStats : null), [bombFtmLpStats]);
  const bombPriceInBNB = useMemo(() => (bombStats ? Number(bombStats.tokenInFtm).toFixed(2) : null), [bombStats]);
  const ftmPriceInBUL = useMemo(() => (bombStats ? Number(1 / bombStats.tokenInFtm).toFixed(2) : null), [bombStats]);
  // const classes = useStyles();

  const handleBulChange = async (e) => {
    if (e.currentTarget.value === '' || e.currentTarget.value === 0) {
      setBulAmount(e.currentTarget.value);
    }
    if (!isNumeric(e.currentTarget.value)) return;
    setBulAmount(e.currentTarget.value);
    const quoteFromSpooky = await bombFinance.quoteFromSpooky(e.currentTarget.value, 'BCE');
    setbnbAmount(quoteFromSpooky);
    setLpTokensAmount(quoteFromSpooky / bombLPStats.bnbAmount);
  };

  const handleFtmChange = async (e) => {
    if (e.currentTarget.value === '' || e.currentTarget.value === 0) {
      setbnbAmount(e.currentTarget.value);
    }
    if (!isNumeric(e.currentTarget.value)) return;
    setbnbAmount(e.currentTarget.value);
    const quoteFromSpooky = await bombFinance.quoteFromSpooky(e.currentTarget.value, 'BTCB');
    setBulAmount(quoteFromSpooky);

    setLpTokensAmount(quoteFromSpooky / bombLPStats.tokenAmount);
  };
  const handleBulSelectMax = async () => {
    const quoteFromSpooky = await bombFinance.quoteFromSpooky(getDisplayBalance(bombBalance), 'BCE');
    setBulAmount(getDisplayBalance(bombBalance));
    setbnbAmount(quoteFromSpooky);
    setLpTokensAmount(quoteFromSpooky / bombLPStats.bnbAmount);
  };
  const handleFtmSelectMax = async () => {
    const quoteFromSpooky = await bombFinance.quoteFromSpooky(ftmBalance, 'BNB');
    setbnbAmount(ftmBalance);
    setBulAmount(quoteFromSpooky);
    setLpTokensAmount(ftmBalance / bombLPStats.bnbAmount);
  };
  return (

    <Page>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <BackgroundImage />
      <Typography color="textPrimary" align="center" variant="h3" gutterBottom>
        Provide Liquidity
      </Typography>

      <Grid container justify="center">
        <Box style={{ width: '600px' }}>
          <Alert variant="filled" severity="warning" style={{ marginBottom: '10px' }}>
            <b>
              This and{' '}
              <a href="https://pancakeswap.finance/" rel="noopener noreferrer" target="_blank">
                Pancakeswap
              </a>{' '}
              are the only ways to provide Liquidity on BCE-BTCB pair without paying tax.
            </b>
          </Alert>
          <Grid item xs={12} sm={12}>
            <Paper>
              <Box mt={4}>
                <Grid item xs={12} sm={12} style={{ borderRadius: 15 }}>
                  <Box p={4}>
                    <Grid container>
                      <Grid item xs={12}>
                        <TokenInput
                          onSelectMax={handleBulSelectMax}
                          onChange={handleBulChange}
                          value={bombAmount}
                          max={getDisplayBalance(bombBalance)}
                          symbol={'BCE'}
                        ></TokenInput>
                      </Grid>
                      <Grid item xs={12}>
                        <TokenInput
                          onSelectMax={handleFtmSelectMax}
                          onChange={handleFtmChange}
                          value={bnbAmount}
                          max={ftmBalance}
                          symbol={'BTCB'}
                        ></TokenInput>
                      </Grid>
                      <Grid item xs={12}>
                        <p>1 BCE = {bombPriceInBNB} BNB</p>
                        <p>1 BNB = {ftmPriceInBUL} BCE</p>
                        <p>LP tokens ≈ {lpTokensAmount.toFixed(2)}</p>
                      </Grid>
                      <Grid xs={12} justifyContent="center" style={{ textAlign: 'center' }}>
                        {approveTaxOfficeStatus === ApprovalState.APPROVED ? (
                          <Button
                            variant="contained"
                            onClick={() => onProvideBulFtmLP(bnbAmount.toString(), bombAmount.toString())}
                            color="primary"
                            style={{ margin: '0 10px', color: '#fff' }}
                          >
                            Supply
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            onClick={() => approveTaxOffice()}
                            color="secondary"
                            style={{ margin: '0 10px' }}
                          >
                            Approve
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Box>
      </Grid>
    </Page>
  );
};

export default ProvideLiquidity;
