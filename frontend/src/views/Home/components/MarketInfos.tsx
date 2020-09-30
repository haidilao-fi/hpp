import BigNumber from 'bignumber.js'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import Label from '../../../components/Label'
import Spacer from '../../../components/Spacer'
import Value from '../../../components/Value'
import {getBalanceNumber} from '../../../utils/formatBalance'
import useEthPrice from "../../../hooks/useEthPrice";
import {
  getEthPrice, getFarms, getMasterChefContract,
  getPriceLpAddress, getSushiContract,
  getTokenEthPrice, getTotalLPWethValue,
  getUsdcContract, getUsdcWethAddress,
  getWethContract
} from "../../../sushi/utils";
import useSushi from "../../../hooks/useSushi";
import useBlock from "../../../hooks/useBlock";
import {Contract} from "web3-eth-contract";
import Button from "./Button";

export interface StakedValue {
  tokenAmount: BigNumber
  wethAmount: BigNumber
  totalWethValue: BigNumber
  tokenPriceInWeth: BigNumber
  poolWeight: BigNumber
}
const MarketInfos: React.FC = () => {

  const ethPrice = useEthPrice()
  const sushi = useSushi()
  const farms = getFarms(sushi)

  const wethContract = getWethContract(sushi)
  const usdcContract  = getUsdcContract(sushi)
  const priceLp = getPriceLpAddress(sushi)
  const tokentContract = getSushiContract(sushi)
  const masterChefContract = getMasterChefContract(sushi)

  const [tokenPrice, setTokenPrice] = useState<BigNumber>()
  const [totalValue, setTotalValue] = useState<BigNumber>()
  const block = useBlock()

  useEffect(() => {
    async function fetchTokenPrice() {
      const ethPrice = await getEthPrice(wethContract, usdcContract, getUsdcWethAddress(sushi))
      const price = await getTokenEthPrice(wethContract, tokentContract, priceLp)
      if (ethPrice && price) {
        setTokenPrice(new BigNumber(ethPrice).times(price))
      }
    }
    if (sushi) {
      fetchTokenPrice()
    }
  }, [sushi, block, setTokenPrice])

  useEffect(() => {
    async function fetchTotalValue() {
      const allStakedValue: Array<StakedValue> = await Promise.all(
          farms.map(
              ({
                 pid,
                 lpContract,
                 tokenContract,
               }: {
                pid: number
                lpContract: Contract
                tokenContract: Contract
              }) =>
                  getTotalLPWethValue(
                      masterChefContract,
                      wethContract,
                      lpContract,
                      tokenContract,
                      pid,
                  ),
          ),
      )
      let sum = 0
      for (let earning of allStakedValue) {
        sum += earning.totalWethValue.toNumber();
      }
      setTotalValue(new BigNumber(sum))
    }
    if (sushi) {
      fetchTotalValue()
    }
  }, [sushi, block, setTotalValue])


    return (
        <StyledWrapper>
          <Card>
            <CardContent>
              <StyledBalances>
                <StyledBalance>
                  <div style={{ flex: 1 }}>
                    <Label text="HPP Price（$）" />
                    <Value
                        value={tokenPrice ? getBalanceNumber(tokenPrice, 0) : `Loading`}
                    />
                  </div>
                </StyledBalance>
                <Button
                    size="sm"
                    width="100"
                    text={'Buy'}
                    href={`https://app.uniswap.org/#/swap?inputCurrency=0x734b73ce38d771b1509645589f9f57fa6f8c530d`}
                />
              </StyledBalances>
            </CardContent>
            <Footnote>
              Get token price in real time.
            </Footnote>
          </Card>
          <Spacer />

          <Card>
            <CardContent>
              <Label text="Total Locked Value（$）" />
              <Value
                  value={totalValue ? getBalanceNumber(new BigNumber(totalValue).times(new BigNumber(ethPrice)), 0) : `Loading` }
              />
            </CardContent>
            <Footnote>
              Total value of locked.
            </Footnote>
          </Card>
        </StyledWrapper>
    )
}

const Footnote = styled.div`
  font-size: 14px;
  padding: 8px 20px;
  color: ${(props) => props.theme.color.grey[400]};
  border-top: solid 1px ${(props) => props.theme.color.grey[300]};
`
const FootnoteValue = styled.div`
  font-family: 'Roboto Mono', monospace;
  float: right;
`

const StyledWrapper = styled.div`
  align-items: center;
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: stretch;
  }
`

const StyledBalances = styled.div`
  display: flex;
`

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
`
export default MarketInfos
