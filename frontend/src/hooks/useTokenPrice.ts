import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import useBlock from "./useBlock";
import {
  getEthPrice,
  getPriceLpAddress,
  getSushiContract, getTokenEthPrice,
  getUsdcContract,
  getUsdcWethAddress,
  getWethContract
} from "../sushi/utils";
import useSushi from "./useSushi";

const useTokenPrice = () => {
  const [tokenPrice, setTokenPrice] = useState(new BigNumber(0))
  const block = useBlock()
  const sushi = useSushi()
  const wethContract = getWethContract(sushi)
  const usdcContract  = getUsdcContract(sushi)
  const priceLp = getPriceLpAddress(sushi)
  const tokentContract = getSushiContract(sushi)

  const fetchPrice = useCallback(async () => {
    if (!wethContract || !usdcContract) {
      return
    }
    const ethPrice = await getEthPrice(wethContract, usdcContract, getUsdcWethAddress(sushi))
    const tokenEthPrice = await getTokenEthPrice(wethContract, tokentContract, priceLp)
    if (ethPrice && tokenEthPrice) {
      setTokenPrice(new BigNumber(ethPrice).times(tokenEthPrice))
    }
  }, [block, setTokenPrice, wethContract])

  useEffect(() => {
    if (block) {
      fetchPrice()
    }
    let refreshInterval = setInterval(fetchPrice, 10000)
    return () => clearInterval(refreshInterval)
  }, [block, setTokenPrice])

  return tokenPrice
}

export default useTokenPrice
