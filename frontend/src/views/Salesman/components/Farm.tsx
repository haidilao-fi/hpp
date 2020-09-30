import React, { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import PageHeader from '../../../components/PageHeader'
import Spacer from '../../../components/Spacer'
import useFarm from '../../../hooks/useFarm'
import { getContract } from '../../../utils/erc20'
import Harvest from './Harvest'
import Stake from './Stake'
import useSellerSalesmanMargin from "../../../hooks/useSellerSalesmanMargin";
import BigNumber from "bignumber.js";
import RegisterSeller from "./RegisterSeller";
import chef from "../../../assets/img/chef.png";

const SalesmanFarm: React.FC = () => {
  const { farmId } = useParams()
  const {
    pid,
    lpToken,
    lpTokenAddress,
    tokenAddress,
    earnToken,
    name,
    icon,
  } = useFarm(farmId) || {
    pid: 0,
    lpToken: '',
    lpTokenAddress: '',
    tokenAddress: '',
    earnToken: '',
    name: '',
    icon: '',
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { ethereum } = useWallet()

  const lpContract = useMemo(() => {
    return getContract(ethereum as provider, lpTokenAddress)
  }, [ethereum, lpTokenAddress])

  const sellerSalesmanMargin = useSellerSalesmanMargin()

  return (
    <>
      <PageHeader
        icon={<img src={chef} height={120} />}
        subtitle={`You can become a salesman and add merchant to earn 10% of mining rewards!`}
        title={`Become salesman`}
      />
      <StyledFarm>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <Harvest pid={pid} />
          </StyledCardWrapper>
          <Spacer />
          <StyledCardWrapper>
            <Stake
              lpContract={lpContract}
              pid={pid}
              tokenName={lpToken.toUpperCase()}
            />
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg" />
        {sellerSalesmanMargin.isGreaterThan(new BigNumber(0))?
            <RegisterSeller/>
            :
            <StyledCardsWrapper></StyledCardsWrapper>
        }
        <Spacer size="lg" />
      </StyledFarm>
    </>
  )
}

const StyledFarm = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.grey[400]};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
`

export default SalesmanFarm
