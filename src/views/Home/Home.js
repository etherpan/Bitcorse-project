import React, { useMemo } from 'react';
import Page from '../../components/Page';
import { createGlobalStyle } from 'styled-components';
import CountUp from 'react-countup';
import CardIcon from '../../components/CardIcon';
import TokenSymbol from '../../components/TokenSymbol';
import useBulStats from '../../hooks/useBulStats';
import useLpStats from '../../hooks/useLpStats';
import useLpStatsBTC from '../../hooks/useLpStatsBTC';
import useModal from '../../hooks/useModal';
import useZap from '../../hooks/useZap';
import useBondStats from '../../hooks/useBondStats';
import usebulshareStats from '../../hooks/usebulshareStats';
import useTotalValueLocked from '../../hooks/useTotalValueLocked';
import { Bul as bombTesting, Mcorse as bulshareTesting } from '../../bomb-finance/deployments/deployments.testing.json';
import { Bce as bombProd, Mcorse as bulshareProd } from '../../bomb-finance/deployments/deployments.mainnet.json';
import { roundAndFormatNumber } from '../../0x';
import MetamaskFox from '../../assets/img/metamask-fox.svg';
import { Box, Button, Card, CardContent, Grid, Paper, Typography } from '@material-ui/core';
import ZapModal from '../Bank/components/ZapModal';
import BUL_BNBZapModal from '../Bank/components/BUL_BNBZapModal';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import useBulFinance from '../../hooks/useBulFinance';
import { ReactComponent as IconTelegram } from '../../assets/img/telegram.svg';
import { Helmet } from 'react-helmet'
import BceImage from '../../assets/img/bce.png';

import kycLogo from '../../assets/img/KYC_assure.png';
import HomeImage from '../../assets/img/background-home.png';

export const BackgroundImage = createGlobalStyle`
  body {
    // background: url(${HomeImage}) repeat !important;
    background: linear-gradient(rgb(9 34 54 / 11%),rgb(4 6 8 / 8%)), url(${HomeImage}) no-repeat !important;
    background-size: cover !important;
    background-blend-mode: overlay;
    background-color: #404040 !important;

  }
`;
const TITLE = 'Bitcorsefinance.co | BNB pegged algocoin'

// const BackgroundImage = createGlobalStyle`
//   body {
//     background-color: grey;
//     background-size: cover !important;
//   }
// `;

const useStyles = makeStyles((theme) => ({
  button: {
    [theme.breakpoints.down('415')]: {
      // marginTop: '10px'
    },
  },
}));

const Home = () => {
  const classes = useStyles();
  const TVL = useTotalValueLocked();
  const bombFtmLpStats = useLpStats('BCE-BNB-LP'); 
  const bulshareFtmLpStats = useLpStats('MCORSE-BNB-LP');
  const bombStats = useBulStats();
  const bulshareStats = usebulshareStats();
  const tBondStats = useBondStats();
  const bombFinance = useBulFinance();

  let bomb;
  let mcorse;
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    bomb = bombTesting;
    mcorse = bulshareTesting;
  } else {
    bomb = bombProd;
    mcorse = bulshareProd;
  }

  const buyBceAddress =
     'https://pancakeswap.finance/swap?inputCurrency=BNB&outputCurrency=' + bomb.address;
  // https://pancakeswap.finance/swap?outputCurrency=0x531780FAcE85306877D7e1F05d713D1B50a37F7A';
  const buyMcorseAddress = 'https://pancakeswap.finance/swap?inputCurrency=BNB&outputCurrency=0x22A7FBEc7660AD344B4CfFFb4d941C73E9cAcA8e';
  const bceChartAddress = 'https://dexscreener.com/bsc/'+bomb.address;
  const dshareChartAddress = 'https://dexscreener.com/bsc/0x22A7FBEc7660AD344B4CfFFb4d941C73E9cAcA8e'
  const bombLPStats = useMemo(() => (bombFtmLpStats ? bombFtmLpStats : null), [bombFtmLpStats]);
  const bulshareLPStats = useMemo(() => (bulshareFtmLpStats ? bulshareFtmLpStats : null), [bulshareFtmLpStats]);
  const bombPriceInDollars = useMemo(
    () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
    [bombStats],
  );
  const bombPriceInBNB = useMemo(() => (bombStats ? Number(bombStats.tokenInFtm).toFixed(4) : null), [bombStats]);
  const bombCirculatingSupply = useMemo(() => (bombStats ? String(bombStats.circulatingSupply) : null), [bombStats]);

  const bceTotalSupply = useMemo(() => (bombStats ? String(bombStats.totalSupply) : null), [bombStats]);

  const dsharePriceInDollars = useMemo(
    () => (bulshareStats ? Number(bulshareStats.priceInDollars).toFixed(2) : null),
    [bulshareStats],
  );
  const bulsharePriceInBNB = useMemo(
    () => (bulshareStats ? Number(bulshareStats.tokenInFtm).toFixed(4) : null),
    [bulshareStats],
  );
  const bulshareCirculatingSupply = useMemo(
    () => (bulshareStats ? String(bulshareStats.circulatingSupply) : null),
    [bulshareStats],
  );
  const bulshareTotalSupply = useMemo(() => (bulshareStats ? String(bulshareStats.totalSupply) : null), [bulshareStats]);

  const tBondPriceInDollars = useMemo(
    () => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null),
    [tBondStats],
  );
  const tBondPriceInBNB = useMemo(() => (tBondStats ? Number(tBondStats.tokenInFtm).toFixed(4) : null), [tBondStats]);
  const tBondCirculatingSupply = useMemo(
    () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
    [tBondStats],
  );
  const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);

  const bombLpZap = useZap({ depositTokenName: 'BCE-BNB-LP' });
  const bulshareLpZap = useZap({ depositTokenName: 'MCORSE-BNB-LP' });

  const [onPresentBulZap, onDissmissBulZap] = useModal(
    <BUL_BNBZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        bombLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissBulZap();
      }}
      tokenName={'BCE-BNB-LP'}
    />,
  );

  const [onPresentBULshareZap, onDissmissBULshareZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        bulshareLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissBULshareZap();
      }}
      tokenName={'MCORSE-BNB-LP'}
    />,
  );

  return (
    <Page>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <BackgroundImage />
      <Grid container spacing={3}>
        {/* Logo */}
        <Grid
          item
          xs={12}
          sm={4}
          style={{ display: 'flex', justifyContent: 'center', verticalAlign: 'middle', overflow: 'hidden' }}
        >
          <img src={BceImage} alt='bitcorsefinance.co' style={{ maxHeight: '240px' }} />
        </Grid>
        {/* Explanation text */}
        <Grid item xs={12} sm={8}>
          <Paper>
            <Box p={4} style={{ textAlign: 'left' }}>
              <h2 style={{ textAlign: 'center'}}>Welcome to BITCORSE</h2>
              <p style={{ margin: "5px" }}>
              BCE is an algocoin which is designed to follow price of BNB.</p> 
              <p>Enjoy high yields and reduce carbon footprint at the same time.</p> 
              <p>For each LP token created BCE Finance plants 10 trees! High yields normally only found on high risk assets, but with exposure to BNB instead!</p>
              <p>
              Imagine BCEprinting and Planting trees at same time? Your wish is granted.
              </p>
              
              <p>
                <strong>BCE is pegged via algorithm to a 100:1 ratio to BNB.</strong>
                {/* Stake your BCE-BTC LP in the Farm to earn MCORSE rewards. Then stake your earned MCORSE in the
                Boardroom to earn more BCE! */}
              </p>
              <p>
                <IconTelegram alt="telegram" style={{ fill: '#dddfee', height: '15px' }} /> Join our{' '}
                <a
                  href="https://t.me/bitcorsefinance"
                  rel="noopener noreferrer"
                  target="_blank"
                  style={{ color: '#dddfee' }}
                >
                  Telegram
                </a>{' '}
                to find out more!
              </p>
              {/* <p>
                <a href="https://www.assuredefi.io/projects/bitcorsefinance/"  className={'navLink ' + classes.link} rel="noopener noreferrer" target="_blank">
                KYC processed by
                <img alt="KYC logo" src={kycLogo} height="40px" style={{verticalAlign:"middle"}} />
              </a>
              </p> */}
            </Box>
          </Paper>
        </Grid>
        {/* 
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} justify="center" style={{ margin: '12px', display: 'flex' }}>

            <Alert variant="filled" severity="info" style={{"background":"#250f0d"}}>
              <h2>BCE STAKING IS LIVE!</h2>
              <h4>
                Get your xBCE now by staking BCE.   <Button href="/xbul" className="shinyButton" style={{ margin: '10px' }}>
                  Get xBCE
                </Button>
              </h4>

            </Alert>

          </Grid>
        </Grid> */}

        {/* TVL */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center">
              <h2>Total Value Locked</h2>
              <CountUp style={{ fontSize: '25px' }} end={TVL} separator="," prefix="$" />
            </CardContent>
          </Card>
        </Grid>

        {/* Wallet */}
        <Grid item xs={12} sm={8}>
          <Card style={{ height: '100%' }}>
            <CardContent align="center" style={{ marginTop: '2.5%' }}>
              {/* <h2 style={{ marginBottom: '20px' }}>Wallet Balance</h2> */}
              <Button  href="/boardroom" className="shinyButton stakeorfarmButton" style={{ margin: '10px' }}>
                Stake Now
              </Button>
              <Button  href="/farm" className="shinyButton stakeorfarmButton" style={{ margin: '10px' }}>
                Farm Now
              </Button>
              <Button 
                target="_blank"
                href={buyBceAddress}
                style={{ margin: '10px' }}
                className={'shinyButton ' + classes.button}
                
              >
                Buy BCE
              </Button>
              <Button 
                target="_blank"
                href={buyMcorseAddress}
                className={'shinyButton ' + classes.button}
                style={{ margin: '10px' }}
              >
                Buy MCORSE
              </Button>
              <Button 
                target="_blank"
                href={bceChartAddress}
                className={'shinyButton ' + classes.button}
                style={{ margin: '10px' }}
              >
                BCE Chart
              </Button>
              <Button 
                target="_blank"
                href={dshareChartAddress}
                className={'shinyButton ' + classes.button}
                style={{ marginLeft: '10px' }}
              >
                MCORSE Chart
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* BCE */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center" style={{ position: 'relative' }}>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="BCE" />
                </CardIcon>
              </Box>
              <Button
                onClick={() => {
                  bombFinance.watchAssetInMetamask('BCE');
                }}
                style={{ position: 'absolute', top: '10px', right: '10px', border: '1px grey solid' }}
              >
                {' '}
                <b>+</b>&nbsp;&nbsp;
                <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
              </Button>
              <h2 style={{ marginBottom: '10px' }}>BCE</h2>
                Current Price
              <Box>
                <span style={{ fontSize: '30px', color: 'white' }}>{bombPriceInBNB ? bombPriceInBNB / 100 : '-.----'} BNB</span>
              </Box>
              <Box>
                <span style={{ fontSize: '16px', alignContent: 'flex-start' }}>
                  ${bombPriceInDollars ? roundAndFormatNumber(bombPriceInDollars, 2) : '-.--'} / BCE
                </span>
              </Box>
              <span style={{ fontSize: '12px' }}>
                Market Cap: ${roundAndFormatNumber(bombCirculatingSupply * bombPriceInDollars, 2)} <br />
                Circulating Supply: {roundAndFormatNumber(bombCirculatingSupply, 2)} <br />
                Total Supply: {roundAndFormatNumber(bceTotalSupply, 2)}
              </span>
            </CardContent>
          </Card>
        </Grid>

        {/* MCORSE */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center" style={{ position: 'relative' }}>
              <Button
                onClick={() => {
                  bombFinance.watchAssetInMetamask('MCORSE');
                }}
                style={{ position: 'absolute', top: '10px', right: '10px', border: '1px grey solid' }}
              >
                {' '}
                <b>+</b>&nbsp;&nbsp;
                <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
              </Button>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="MCORSE" />
                </CardIcon>
              </Box>
              <h2 style={{ marginBottom: '10px' }}>MCORSE</h2>
              Current Price
              <Box>
                <span style={{ fontSize: '30px', color: 'white' }}>
                  {bulsharePriceInBNB ? bulsharePriceInBNB : '-.----'} BNB
                </span>
              </Box>
              <Box>
                <span style={{ fontSize: '16px' }}>${dsharePriceInDollars ? dsharePriceInDollars : '-.--'} / MCORSE</span>
              </Box>
              <span style={{ fontSize: '12px' }}>
                Market Cap: ${roundAndFormatNumber((bulshareCirculatingSupply * dsharePriceInDollars).toFixed(2), 2)}{' '}
                <br />
                Circulating Supply: {roundAndFormatNumber(bulshareCirculatingSupply, 2)} <br />
                Total Supply: {roundAndFormatNumber(bulshareTotalSupply, 2)}
              </span>
            </CardContent>
          </Card>
        </Grid>

        {/* BONSE */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center" style={{ position: 'relative' }}>
              <Button
                onClick={() => {
                  bombFinance.watchAssetInMetamask('BONSE');
                }}
                style={{ position: 'absolute', top: '10px', right: '10px', border: '1px grey solid' }}
              >
                {' '}
                <b>+</b>&nbsp;&nbsp;
                <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
              </Button>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="BONSE" />
                </CardIcon>
              </Box>
              <h2 style={{ marginBottom: '10px' }}>BONSE</h2>
                Current Price
              <Box>
                <span style={{ fontSize: '30px', color: 'white' }}>
                  {tBondPriceInBNB ? tBondPriceInBNB / 100: '-.----'} BNB
                </span>
              </Box>
              <Box>
                <span style={{ fontSize: '16px' }}>${tBondPriceInDollars ? tBondPriceInDollars: '-.--'} / BONSE</span>
              </Box>
              <span style={{ fontSize: '12px' }}>
                Market Cap: ${roundAndFormatNumber((tBondCirculatingSupply * tBondPriceInDollars).toFixed(2), 2)} <br />
                Circulating Supply: {roundAndFormatNumber(tBondCirculatingSupply, 2)} <br />
                Total Supply: {roundAndFormatNumber(tBondTotalSupply, 2)}
              </span>
            </CardContent>
          </Card>
        </Grid>
        {/* <Grid item xs={12} sm={6}>
          <Card>
            <CardContent align="center">
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="BCE-BNB-LP" />
                </CardIcon>
              </Box>
              <h2>BCE-BNB PancakeSwap LP</h2>
              <Box mt={2}>
                <Button onClick={onPresentBulZap} className="shinyButtonSecondary">
                  Zap In
                </Button>
              </Box>
              <Box mt={2}>
                <span style={{ fontSize: '26px' }}>
                  {bombLPStats?.tokenAmount ? bombLPStats?.tokenAmount : '-.--'} BCE /{' '}
                  {bombLPStats?.bnbAmount ? bombLPStats?.bnbAmount : '-.--'} BNB
                </span>
              </Box>
              <Box>${bombLPStats?.priceOfOne ? bombLPStats.priceOfOne : '-.--'}</Box>
              <span style={{ fontSize: '12px' }}>
                Liquidity: ${bombLPStats?.totalLiquidity ? roundAndFormatNumber(bombLPStats.totalLiquidity, 2) : '-.--'}{' '}
                <br />
                Total Supply: {bombLPStats?.totalSupply ? roundAndFormatNumber(bombLPStats.totalSupply, 2) : '-.--'}
              </span>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent align="center">
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="MCORSE-BNB-LP" />
                </CardIcon>
              </Box>
              <h2>MCORSE-BNB PancakeSwap LP</h2>
              <Box mt={2}>
                <Button onClick={onPresentBULshareZap} className="shinyButtonSecondary">
                  Zap In
                </Button>
              </Box>
              <Box mt={2}>
                <span style={{ fontSize: '26px' }}>
                  {bulshareLPStats?.tokenAmount ? bulshareLPStats?.tokenAmount : '-.--'} MCORSE /{' '}
                  {bulshareLPStats?.bnbAmount ? bulshareLPStats?.bnbAmount : '-.--'} BNB
                </span>
              </Box>
              <Box>${bulshareLPStats?.priceOfOne ? bulshareLPStats.priceOfOne : '-.--'}</Box>
              <span style={{ fontSize: '12px' }}>
                Liquidity: $
                {bulshareLPStats?.totalLiquidity ? roundAndFormatNumber(bulshareLPStats.totalLiquidity, 2) : '-.--'}
                <br />
                Total Supply: {bulshareLPStats?.totalSupply ? roundAndFormatNumber(bulshareLPStats.totalSupply, 2) : '-.--'}
              </span>
            </CardContent>
          </Card>
        </Grid> */}
      </Grid>
            
    </Page>
  );
};

export default Home;
