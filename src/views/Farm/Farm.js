import React from 'react';
import { useWallet } from 'use-wallet';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Bank from '../Bank';
import { Box, Container, Typography, Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import UnlockWallet from '../../components/UnlockWallet';
import Page from '../../components/Page';
import FarmCard from './FarmCard';
import useGenesisPoolAllocationTimes from '../../hooks/useGenesisPoolAllocationTimes';
import useSharePoolAllocationTimes from '../../hooks/useSharePoolAllocationTimes';
import ProgressCountdown from './ProgressCountdown';
import moment from 'moment';
import { createGlobalStyle } from 'styled-components';
import useBanks from '../../hooks/useBanks';
import { Helmet } from 'react-helmet'
import {BackgroundImage} from '../Home/Home.js';

const TITLE = 'Bitcorsefinance.co | Farms'


const Farm = () => {
  const [banks] = useBanks();
  const { path } = useRouteMatch();
  const { account } = useWallet();
  const { from, to } = useGenesisPoolAllocationTimes();
  const { from:mfrom } = useSharePoolAllocationTimes();
  const isOver = Date.now() >= to.getTime();
  const isStart = Date.now() >= from.getTime();
  const isMstart = Date.now() >= mfrom.getTime();
  const activeBanks = banks.filter((bank) => !bank.finished);
  return (
    <Switch>
      <Page>
        <Route exact path={path}>
          <BackgroundImage />
          <Helmet>
            <title>{TITLE}</title>
          </Helmet>
          {!!account ? (
            <Container maxWidth="lg">
              {/* <Typography color="textYellow" align="center" variant="h3" gutterBottom>
                Farm
              </Typography> */}

              <Box mt={5}>
                <div hidden={activeBanks.filter((bank) => bank.sectionInUI === 2).length === 0}>
                  <Typography color="textPrimary" align="center" variant="h4" gutterBottom>
                    Earn MCORSE by staking PancakeSwap LP
                  </Typography>
                  {/* <Alert variant="filled" severity="info">
                    <h4>
                      Farms started November 25th 2021 and will continue running for 1 full year.</h4>
                  </Alert> */}
                  
                  <Alert variant="filled" style={{ backgroundColor: "#4b444c63" }}>
                    {isMstart ? 
                      <div>Pools are live now, Stake LPs to earn more Mcorse, No deposit fee</div> : 
                      <>
                        Pools starting at {mfrom.toUTCString()}, No deposit fee.<br/>
                        <div style={{display:'flex'}}>Mcorse reward pools start in: <ProgressCountdown base={moment().toDate()} hideBar={true} deadline={mfrom} description="End Pool" />.</div>
                      </>
                    }
                  </Alert>
                  
                  <Grid container spacing={3} style={{ marginTop: '20px' }}>
                    {activeBanks
                      .filter((bank) => bank.sectionInUI === 2)
                      .map((bank) => (
                        <React.Fragment key={bank.name}>
                          <FarmCard bank={bank} />
                        </React.Fragment>
                      ))}
                  </Grid>
                </div>

                {/* <div hidden={activeBanks.filter((bank) => bank.sectionInUI === 1).length === 0}>
                  <Typography color="textPrimary"  variant="h4" gutterBottom style={{ paddingTop:"50px" }}>
                    Earn BCE by staking PancakeSwap LP
                  </Typography>
                  <Alert variant="filled" style={{ backgroundColor: "#4b444c63" }}>
                    This farm will start May 02 11:00 GMT. This farm will run for 9 days.
                  </Alert>
                  <Grid container spacing={3} style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
                    {activeBanks
                      .filter((bank) => bank.sectionInUI === 1)
                      .map((bank) => (
                        <React.Fragment key={bank.name}>
                          <FarmCard bank={bank} />
                        </React.Fragment>
                      ))}
                  </Grid>
                </div> */}

                <div hidden={activeBanks.filter((bank) => bank.sectionInUI === 0).length === 0}>
                  <Typography color="textPrimary" align='center' variant="h4" gutterBottom style={{ marginTop: '20px' }}>
                    Genesis Pools
                  </Typography>
                  <Alert variant="filled" style={{ backgroundColor: "#4b444c63" }}>
                    {isOver ? 
                      <div>All below pools have ended. Please unstake and collect your rewards.</div> : 
                      <>
                        Pools starting at {from.toUTCString()} and will run for 2 day with deposit fee 1%.<br/>
                        <div style={{display:'flex'}}>{isStart ? 'Time until genesis pools end: ' :  'Time until genesis pools start in: ' }&nbsp;<ProgressCountdown base={moment().toDate()} hideBar={true} deadline={isStart ? to : from} description="End Pool" /> .
                       </div>
                      </>
                    }
                  </Alert>
                  {/* <Alert variant="filled" severity="warning">
                    Genesis pools have ended. Please claim all rewards and remove funds from Genesis pools.
                  </Alert> */}
                  <Grid container spacing={3} style={{ marginTop: '20px' }}>
                    {activeBanks
                      .filter((bank) => bank.sectionInUI === 0)
                      .map((bank) => (
                        <React.Fragment key={bank.name}>
                          <FarmCard bank={bank} />
                        </React.Fragment>
                      ))}
                  </Grid>
                </div>
              </Box>
            </Container>
          ) : (
            <UnlockWallet />
          )}
        </Route>
        <Route path={`${path}/:bankId`}>
          <BackgroundImage />
          <Bank />
        </Route>
      </Page>
    </Switch>
  );
};

export default Farm;
