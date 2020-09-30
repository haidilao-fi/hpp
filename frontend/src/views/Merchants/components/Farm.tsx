import React, { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import PageHeader from '../../../components/PageHeader'
import Spacer from '../../../components/Spacer'
import useFarm from '../../../hooks/useFarm'
import Harvest from './Harvest'
import Stake from './Stake'
import chef from "../../../assets/img/chef.png";

const Farm: React.FC = () => {
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

  return (
      <>
        <PageHeader
            icon={<img src={chef} height={120} />}
            subtitle={`Only hot pot merchant can mine, and hot pot merchant are registered by salesman.`}
            title={`Merchant mine`}
        />
        <StyledFarm>
          <StyledCardsWrapper>
            <StyledCardWrapper>
              <Harvest/>
            </StyledCardWrapper>
            <Spacer />
            <StyledCardWrapper>
              <Stake/>
            </StyledCardWrapper>
          </StyledCardsWrapper>
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

export default Farm
