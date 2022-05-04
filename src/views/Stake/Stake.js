import React, { useMemo } from 'react';
import { useWallet } from 'use-wallet';
import styled from 'styled-components';
import Stake from './components/Stake';
import { makeStyles } from '@material-ui/core/styles';

import { Box, Card, CardContent, Button, Typography, Grid } from '@material-ui/core';
import { roundAndFormatNumber } from '../../0x';

import { Alert } from '@material-ui/lab';

import UnlockWallet from '../../components/UnlockWallet';
import Page from '../../components/Page';

import useRedeemOnBoardroom from '../../hooks/useRedeemOnBoardroom';
import useXbulBalance from '../../hooks/useXbulBalance';
import useFetchBulAPR from '../../hooks/useFetchBulAPR';
import useBulStats from '../../hooks/useBondStats';
import useXbulAPR from '../../hooks/useXbulAPR';
import useCashPriceInEstimatedTWAP from '../../hooks/useCashPriceInEstimatedTWAP';
import useStakedBulBalance from '../../hooks/useStakedBulBalance';
import useStakedTotalBulBalance from '../../hooks/useTotalStakedBulBalance';
import { createGlobalStyle } from 'styled-components';
import { Helmet } from 'react-helmet'
import {BackgroundImage} from '../Home/Home.js';

const TITLE = 'Bitcorsefinance.co | xBCE - BCE Staking'

const useStyles = makeStyles((theme) => ({
  gridItem: {
    height: '100%',
    [theme.breakpoints.up('md')]: {
      height: '90px',
    },
  },
}));

const Staking = () => {
  const classes = useStyles();
  const { account } = useWallet();
  // const { onRedeem } = useRedeemOnBoardroom();
  //  const stakedBulBalance = useStakedBulBalance();
  const xbulBalance = useXbulBalance();
  const xbulRate = Number(xbulBalance / 1000000000000000000).toFixed(4);
  const xbulAPR = useXbulAPR();

  //const xbulTVL = xbulAPR.TVL;
  const stakedTotalBulBalance = useStakedTotalBulBalance();
  const bombTotalStaked = Number(stakedTotalBulBalance / 1000000000000000000).toFixed(0);
  const xbulTVL = useMemo(() => (xbulAPR ? Number(xbulAPR.TVL).toFixed(0) : null), [xbulAPR]);
  const xbulDailyAPR = useMemo(() => (xbulAPR ? Number(xbulAPR.dailyAPR).toFixed(2) : null), [xbulAPR]);
  const xbulYearlyAPR = useMemo(() => (xbulAPR ? Number(xbulAPR.yearlyAPR).toFixed(2) : null), [xbulAPR]);

  // console.log('xbulAPR', xbulYearlyAPR);

  // const cashStat = useCashPriceInEstimatedTWAP();
  const boardroomAPR = useFetchBulAPR();

  return (
    <Page>
      <BackgroundImage />
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      {!!account ? (
        <>
          <Typography color="textPrimary" align="center" variant="h3" gutterBottom>
            BCE Staking for xBCE
          </Typography>
          <Grid container justify="center">
            {/* <Box mt={3} style={{ width: '600px' }}>
              <Alert variant="filled" severity="info">
                <b> Most rewards are generated from boardroom printing! Rewards come from:</b><br />
                - 80% of autocompounder fees are used to buy BCE on the open market<br />
                - 20% of all BCE minted - from protocol allocation, does not impact MCORSE boardroom printing.<br />
                If TWAP of BCE peg is not over 1.01, yield will be reduced.<br />
                APR is based on performance since launch on January 24th, 2022.
              </Alert>

            </Box> */}
          </Grid>



          <Box mt={5}>
            <Grid container justify="center" spacing={3}>

              <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
                <Card className={classes.gridItem}>
                  <CardContent align="center">
                    <Typography style={{ textTransform: 'uppercase', color: '#97d4ff' }}>1 xBCE =</Typography>
                    <Typography>{Number(xbulRate)} BCE</Typography>
                  </CardContent>
                </Card>
              </Grid>
              {/* <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
                <Card className={classes.gridItem}>
                  <CardContent align="center">
                    <Typography style={{ textTransform: 'uppercase', color: '#fba919' }}>
                      BCE PEG <small>(TWAP)</small>
                    </Typography>
                    <Typography>{scalingFactor} BTC</Typography>
                    <Typography>
                      <small>per 10,000 BCE</small>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid> */}
              <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
                <Card className={classes.gridItem}>
                  <CardContent align="center">
                    <Typography style={{ textTransform: 'uppercase', color: '#97d4ff' }}>APR</Typography>
                    <Typography>{xbulYearlyAPR}%</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
                <Card className={classes.gridItem}>
                  <CardContent align="center">
                    <Typography style={{ textTransform: 'uppercase', color: '#97d4ff' }}>Daily APR</Typography>
                    <Typography>{xbulDailyAPR}%</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={2} lg={2}>
                <Card className={classes.gridItem}>
                  <CardContent align="center">
                    <Typography style={{ textTransform: 'uppercase', color: '#97d4ff' }}>BCE Staked</Typography>
                    <Typography>{roundAndFormatNumber(bombTotalStaked)}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
                <Card className={classes.gridItem}>
                  <CardContent align="center">
                    <Typography style={{ textTransform: 'uppercase', color: '#97d4ff' }}>BCE Staked USD</Typography>
                    <Typography>${roundAndFormatNumber(xbulTVL, 2)}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>


            <Box mt={4}>
              <StyledBoardroom>
                <StyledCardsWrapper>
                  {/* <StyledCardWrapper>
                    <Harvest />
                  </StyledCardWrapper> */}
                  {/* <Spacer /> */}

                  <StyledCardWrapper>

                    <Stake />
                  </StyledCardWrapper>
                </StyledCardsWrapper>
              </StyledBoardroom>
            </Box>
            <Box mt={4}>
              <StyledBoardroom>
                <StyledCardsWrapper>
                  {/* <StyledCardWrapper>
                    <Harvest />
                  </StyledCardWrapper> */}
                  {/* <Spacer /> */}
                  <StyledCardWrapper>
                    {/* <Box>
                      <Card>
                        <CardContent>
                          <h2>About xBCE & Rewards</h2>
                          <p><strong>Early staker bonus! Between January 24 and February 7th 50,000 BCE will be deposited as free rewards for all stakers. This will happen at randomized times.</strong></p>
                          <p>xBCE will be the governance token required to cast votes on protocol decisions.</p>
                          <p>20% of all BCE minted will be deposited into the xBCE smart contract, increasing the amount of BCE that can be redeemed for each xBCE. Rewards will be deposited at random times to prevent abuse.</p>
                          <p>Functionality will be developed around xBCE including using it as collateral to borrow other assets.</p>
                          <p>Reward structure subject to change based on community voting.</p>
                        </CardContent>
                      </Card>
                    </Box> */}
                  </StyledCardWrapper>
                </StyledCardsWrapper>
              </StyledBoardroom>
            </Box>
            {/* <Grid container justify="center" spacing={3}>
            <Grid item xs={4}>
              <Card>
                <CardContent align="center">
                  <Typography>Rewards</Typography>

                </CardContent>
                <CardActions style={{justifyContent: 'center'}}>
                  <Button color="primary" variant="outlined">Claim Reward</Button>
                </CardActions>
                <CardContent align="center">
                  <Typography>Claim Countdown</Typography>
                  <Typography>00:00:00</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card>
                <CardContent align="center">
                  <Typography>Stakings</Typography>
                  <Typography>{getDisplayBalance(stakedBalance)}</Typography>
                </CardContent>
                <CardActions style={{justifyContent: 'center'}}>
                  <Button>+</Button>
                  <Button>-</Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid> */}
          </Box>
          {/* 
          <Box mt={5}>
            <Grid container justify="center" spacing={3} mt={10}>
              <Button
                disabled={stakedBulBalance.eq(0) || (!canWithdraw && !canClaimReward)}
                onClick={onRedeem}
                className={
                  stakedBulBalance.eq(0) || (!canWithdraw && !canClaimReward)
                    ? 'shinyButtonDisabledSecondary'
                    : 'shinyButtonSecondary'
                }
              >
                Claim &amp; Withdraw
              </Button>
            </Grid>
          </Box> */}
        </>
      ) : (
        <UnlockWallet />
      )}
    </Page>
  );
};

const StyledBoardroom = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

export default Staking;
