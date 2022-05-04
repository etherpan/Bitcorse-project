import React, {useMemo} from 'react';
import styled from 'styled-components';

import {Box, Button, Card, CardContent, Typography} from '@material-ui/core';

// import Button from '../../../components/Button';
// import Card from '../../../components/Card';
// import CardContent from '../../../components/CardContent';
import CardIcon from '../../../components/CardIcon';
import {AddIcon, RemoveIcon} from '../../../components/icons';
import IconButton from '../../../components/IconButton';
import Label from '../../../components/Label';
import Value from '../../../components/Value';
//import useXbulBalance from '../../../hooks/useXbulBalance';
import useApprove, {ApprovalState} from '../../../hooks/useApprove';
import useModal from '../../../hooks/useModal';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useWithdrawCheck from '../../../hooks/boardroom/useWithdrawCheck';
import bombFinance from '../../../bomb-finance';
import MetamaskFox from '../../../assets/img/metamask-fox.svg';
import {getDisplayBalance} from '../../../utils/formatBalance';

import DepositModal from './DepositModal';
import WithdrawModal from './WithdrawModal';
import useBulFinance from '../../../hooks/useBulFinance';
import ProgressCountdown from './ProgressCountdown';
import useStakedBul from '../../../hooks/useStakedBul';
import useStakedTokenPriceInDollars from '../../../hooks/useStakedTokenPriceInDollars';
import useUnstakeTimerBoardroom from '../../../hooks/boardroom/useUnstakeTimerBoardroom';
import TokenSymbol from '../../../components/TokenSymbol';
import useStakeToBul from '../../../hooks/useStakeToBul';
import useWithdrawFromBul from '../../../hooks/useWithdrawFromBul';
import useXbulBalance from '../../../hooks/useXbulBalance';

const Stake: React.FC = () => {
  const bombFinance = useBulFinance();
  const [approveStatus, approve] = useApprove(bombFinance.BCE, bombFinance.contracts.xBCE.address);

  const tokenBalance = useTokenBalance(bombFinance.BCE);
  //const stakedBalance = useStakedBul();
  const stakedBalance = useTokenBalance(bombFinance.XBUL);

  const xbulBalance = useXbulBalance();
  const xbulRate = Number(xbulBalance) / 1000000000000000000;
  const stakedTokenPriceInDollars = Number(useStakedTokenPriceInDollars('BCE', bombFinance.BCE)) * xbulRate;
  
  
  const tokenPriceInDollars = useMemo(
    () =>
      stakedTokenPriceInDollars
        ? (Number(stakedTokenPriceInDollars) * Number(getDisplayBalance(stakedBalance))).toFixed(2).toString()
        : null,
    [stakedTokenPriceInDollars, stakedBalance],
  );
  // const isOldBoardroomMember = boardroomVersion !== 'latest';

  const {onStake} = useStakeToBul();
  const {onWithdraw} = useWithdrawFromBul();

  const [onPresentDeposit, onDismissDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      onConfirm={(value) => {
        onStake(value);
        onDismissDeposit();
      }}
      tokenName={'BCE'}
    />,
  );

  const [onPresentWithdraw, onDismissWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={(value) => {
        onWithdraw(value);
        onDismissWithdraw();
      }}
      tokenName={'xBCE'}
    />,
  );

  return (
    <Box>
      <Card>
    
        <CardContent>
      
          <StyledCardContentInner>
            <StyledCardHeader>
                  <CardIcon>
                <TokenSymbol symbol="XBUL" />
                
              </CardIcon>
              
                          <Button className={'shinyButton'}
                    onClick={() => {
                      bombFinance.watchAssetInMetamask('XBUL');
                    }}
                    style={{ position: 'static', top: '10px', right: '10px', border: '1px grey solid', paddingBottom: '5px', marginBottom: '20px' }}
                  >
                    {' '}
                    <b>+</b>&nbsp;&nbsp;
                    <img alt="metamask fox" style={{ width: '20px', filter: 'grayscale(100%)' }} src={MetamaskFox} />
                  </Button>
              <Value value={getDisplayBalance(stakedBalance)} />
              <Label text={`≈ $${tokenPriceInDollars}`} variant="yellow" />
              <Label text={'xBCE Balance'} variant="yellow" />
            </StyledCardHeader>
            <StyledCardActions>
              {approveStatus !== ApprovalState.APPROVED ? (
                <Button
                  disabled={approveStatus !== ApprovalState.NOT_APPROVED}
                  className={approveStatus !== ApprovalState.NOT_APPROVED ? 'shinyButton' : 'shinyButtonDisabled'}
                  style={{marginTop: '20px'}}
                  onClick={approve}
                >
                  Approve BCE
                </Button>
              ) : (
                <>
                  <IconButton  onClick={onPresentWithdraw}>
                    <RemoveIcon color={'yellow'} />
                  </IconButton>
                  <StyledActionSpacer />
                  <IconButton onClick={onPresentDeposit}>
                    <AddIcon color={'yellow'}/>
                  </IconButton>
                </>
              )}
            </StyledCardActions>
          </StyledCardContentInner>
        </CardContent>
      </Card>
      {/* <Box mt={2} style={{color: '#FFF'}}>
        {canWithdrawFromBoardroom ? (
          ''
        ) : (
          <Card>
            <CardContent>
              <Typography style={{textAlign: 'center'}}>Withdraw possible in</Typography>
              <ProgressCountdown hideBar={true} base={from} deadline={to} description="Withdraw available in" />
            </CardContent>
          </Card>
        )}
      </Box> */}
    </Box>
  );
};

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 28px;
  width: 100%;
`;

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export default Stake;
