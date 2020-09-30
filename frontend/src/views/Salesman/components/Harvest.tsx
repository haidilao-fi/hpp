import React, {useCallback, useState} from 'react'
import styled from 'styled-components'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import { getBalanceNumber } from '../../../utils/formatBalance'
import useSellerAllowance from "../../../hooks/useSellerAllowance";
import useSellerApprove from "../../../hooks/useSellerApprove";
import useSushi from "../../../hooks/useSushi";
import BigNumber from "bignumber.js";
import useTokenBalance from "../../../hooks/useTokenBalance";
import {getSushiAddress, getSushiContract} from "../../../sushi/utils";
import useSellerSalesmanMargin from "../../../hooks/useSellerSalesmanMargin";
import useSalesmanMarginConfig from "../../../hooks/useSalesmanMarginConfig";
import useRegisterSalesman from "../../../hooks/useRegisterSalesman";

interface HarvestProps {
  pid: number
}

const Harvest: React.FC<HarvestProps> = ({ pid }) => {

    const sushi = useSushi()
    const sushiBalance = useTokenBalance(getSushiAddress(sushi))
    const sushiContract = getSushiContract(sushi)

    const [requestedApproval, setRequestedApproval] = useState(false)
    const [requestedDeposit, setRequestedDeposit] = useState(false)

    const allowance = useSellerAllowance(sushiContract)
    const { onApprove } = useSellerApprove(sushiContract)
    const { onDeposit } = useRegisterSalesman()

    const salesmanMargin = useSalesmanMarginConfig()
    const sellerSalesmanMargin = useSellerSalesmanMargin()

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

    const handleDeposit = useCallback(async () => {
        try {
            if(!window.confirm(`To register as a salesman, you will to pay the margin of HPP, are you sure to continue?`)) {
                return
            }
            setRequestedDeposit(true)
            const txHash = await onDeposit()
            // user rejected tx or didn't go thru
            if (!txHash) {
                setRequestedDeposit(false)
            }
        } catch (e) {
            console.log(e)
        }
    }, [onDeposit, setRequestedDeposit])

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
            <StyledCardHeader>
                <Label text="Need margin" />
                <Value value={getBalanceNumber(salesmanMargin)} />
            </StyledCardHeader>
            <StyledCardHeader>
                <Label text="Your HPP Balance" />
                <Value value={getBalanceNumber(sushiBalance)} />
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
                            disabled={!(sellerSalesmanMargin.eq(new BigNumber(0)) && sushiBalance.isGreaterThanOrEqualTo(salesmanMargin)) || requestedDeposit}
                            text="Deposit"
                            onClick={handleDeposit}
                        />
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

const StyledSpacer = styled.div`
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

export default Harvest
