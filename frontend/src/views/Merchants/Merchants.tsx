import React, { useEffect } from 'react'
import styled from 'styled-components'

import { useWallet } from 'use-wallet'

import Page from '../../components/Page'
import Button from '../../components/Button'
import WalletProviderModal from '../../components/WalletProviderModal'

import useModal from '../../hooks/useModal'

import useSushi from '../../hooks/useSushi'
import {getMasterChefContract} from '../../sushi/utils'

import Container from "../../components/Container";
import Merchants from "./components/Farm";

const Farm: React.FC = () => {
  const { account } = useWallet()
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const sushi = useSushi()
  const { ethereum } = useWallet()
  const masterChefContract = getMasterChefContract(sushi)

  return (
    <Page>
      {!!account ? (
        <>
          <Container>
            <Merchants />
          </Container>
        </>
      ) : (
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <Button
            onClick={onPresentWalletProviderModal}
            text="🔓 Unlock Wallet"
          />
        </div>
      )}
    </Page>
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
