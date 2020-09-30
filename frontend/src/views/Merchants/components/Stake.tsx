import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import IconButton from '../../../components/IconButton'
import { AddIcon } from '../../../components/icons'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import useModal from '../../../hooks/useModal'
import useTokenBalance from '../../../hooks/useTokenBalance'
import { getBalanceNumber } from '../../../utils/formatBalance'
import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'
import useSushi from "../../../hooks/useSushi";
import {
  getSellerLpTokenAddress,
  getSellerLpTokenContract,
} from "../../../sushi/utils";
import useSellerStakedBalance from "../../../hooks/useSellerStakedBalance";
import useSellerAllowance from "../../../hooks/useSellerAllowance";
import useSellerApprove from "../../../hooks/useSellerApprove";
import useSellerStake from "../../../hooks/useSellerStake";
import useSellerUnstake from "../../../hooks/useSellerUnstake";

interface StakeProps {
}

const Stake: React.FC<StakeProps> = ({ }) => {

  const sushi = useSushi()
  const sellerLpToken = getSellerLpTokenContract(sushi)
  const stakedBalance = useSellerStakedBalance()

  const [requestedApproval, setRequestedApproval] = useState(false)

  const allowance = useSellerAllowance(sellerLpToken)
  const { onApprove } = useSellerApprove(sellerLpToken)

  const { onStake } = useSellerStake()
  const { onUnstake } = useSellerUnstake()

  const tokenBalance = useTokenBalance(getSellerLpTokenAddress(sushi))

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      onConfirm={onStake}
      tokenName={`HPP-MERCHANT-PROOF`}
    />,
  )

  const [onPresentWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={onUnstake}
      tokenName={`HPP-MERCHANT-PROOF`}
    />,
  )

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      }
    } catch (e) {
      console.log(e)
    }
  }, [onApprove, setRequestedApproval])

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon>🍲</CardIcon>
            <Value value={getBalanceNumber(stakedBalance)} />
            <Label text={`HPP-MERCHANT-PROOF Staked`}/>
          </StyledCardHeader>
          <StyledCardActions>
            {!allowance.toNumber() ? (
              <Button
                disabled={requestedApproval}
                onClick={handleApprove}
                text={`Approve`}
              />
            ) : (
              <>
                <Button
                  disabled={stakedBalance.eq(new BigNumber(0))}
                  text="Unstake"
                  onClick={onPresentWithdraw}
                />
                <StyledActionSpacer />
                <IconButton onClick={onPresentDeposit}>
                  <AddIcon />
                </IconButton>
              </>
            )}
          </StyledCardActions>
        </StyledCardContentInner>
      </CardContent>
    </Card>
  )
}

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[6]}px;
  width: 100%;
`

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`

export default Stake
