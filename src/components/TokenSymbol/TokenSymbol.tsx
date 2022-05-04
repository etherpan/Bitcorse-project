import React from 'react';

//Graveyard ecosystem logos
import bombLogo from '../../assets/img/bce.png';
import tShareLogo from '../../assets/img/mcorse.png';
import bombLogoPNG from '../../assets/img/bce.png';
import xbulLogo from '../../assets/img/xbul.png';

import tShareLogoPNG from '../../assets/img/mcorse.png';
import tBondLogo from '../../assets/img/bonse.png';

import bombFtmLpLogo from '../../assets/img/bce-bnb-lp.png';
import bulshareFtmLpLogo from '../../assets/img/mcorse-bnb-LP.png';
import usdcLogo from '../../assets/img/USDC.png';
import bnbLogo from '../../assets/img/bnb.png';
import btcLogo from '../../assets/img/BCTB-icon.png';
import dogeLogo from '../../assets/img/DOGE-icon.png';
import ethLogo from '../../assets/img/ETH-icon.png';
import FtmLogo from '../../assets/img/WFTM.png';
import BusdLogo from '../../assets/img/BUSD.png';
const logosBySymbol: {[title: string]: string} = {
  //Real tokens
  //=====================
  BCE: bombLogo,
  BULPNG: bombLogoPNG,
  DSHAREPNG: tShareLogoPNG,
  XBUL: xbulLogo,
  MCORSE: tShareLogo,
  BONSE: tBondLogo,
  WBNB: bnbLogo,
  BOO: bnbLogo,
  ZOO: bnbLogo,
  CAKE: bnbLogo,
  SUSD: bnbLogo,
  SBTC: btcLogo,
  BTCB: btcLogo,
  BTC: btcLogo,
  SVL: bnbLogo,
  DOGE: dogeLogo,
  ETH: ethLogo,
  USDC: usdcLogo,
  FTM: FtmLogo,
  BUSD: BusdLogo,
  'BCE-BNB-LP': bombFtmLpLogo,
  'BCE-BTCB-LP': bombFtmLpLogo,
  'MCORSE-BNB-LP': bulshareFtmLpLogo,
  'MCORSE-BNB-APELP': bulshareFtmLpLogo,
  'BCE-BTCB-APELP': bombFtmLpLogo,
};

type LogoProps = {
  symbol: string;
  size?: number;
};

const TokenSymbol: React.FC<LogoProps> = ({symbol, size = 64}) => {
  if (!logosBySymbol[symbol]) {
    throw new Error(`Invalid Token Logo symbol: ${symbol}`);
  }
  return <img src={logosBySymbol[symbol]} alt={`${symbol} Logo`} width={size} height={size} />;
};

export default TokenSymbol;
