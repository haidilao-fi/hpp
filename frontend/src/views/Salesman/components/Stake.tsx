import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Contract } from 'web3-eth-contract'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import { getBalanceNumber } from '../../../utils/formatBalance'
import useSellerSalesmanMargin from "../../../hooks/useSellerSalesmanMargin";
import useUnRegisterSalesman from "../../../hooks/useUnRegisterSalesman";
import chef from "../../../assets/img/chef.png";

interface StakeProps {
  lpContract: Contract
  pid: number
  tokenName: string
}

const Stake: React.FC<StakeProps> = ({ lpContract, pid, tokenName }) => {

  const { onRefund } = useUnRegisterSalesman()
  const sellerSalesmanMargin = useSellerSalesmanMargin()
  const [requestedApproval, setRequestedApproval] = useState(false)

  const handleRefund = useCallback(async () => {
    try {
      if(!window.confirm("After withdrawing the deposit, you will not receive the mining share, are you sure?")) {
        return
      }
      setRequestedApproval(true)
      const txHash = await onRefund()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      }
    } catch (e) {
      console.log(e)
    }
  }, [onRefund, setRequestedApproval])

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon><img src={chef} height={36} /></CardIcon>
            <Value value={getBalanceNumber(sellerSalesmanMargin)} />
            <Label text={`Your HPP margin`} />
          </StyledCardHeader>
          <StyledCardActions>
            <>
              <Button
                disabled={sellerSalesmanMargin.eq(new BigNumber(0)) || requestedApproval}
                text="Refund"
                onClick={handleRefund}
              />
            </>
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

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`

export default Stake
