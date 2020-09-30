import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import useBlock from "./useBlock";
import {getEthPrice, getUsdcContract, getUsdcWethAddress, getWethContract} from "../sushi/utils";
import useSushi from "./useSushi";

const useEthPrice = () => {
  const [ethPrice, setEthPrice] = useState(new BigNumber(0))
  const block = useBlock()
  const sushi = useSushi()
  const wethContract = getWethContract(sushi)
  const usdcContract = getUsdcContract(sushi)

  const fetchPrice = useCallback(async () => {
    if (!wethContract || !usdcContract) {
      return
    }
    const allowance = await getEthPrice(wethContract, usdcContract, getUsdcWethAddress(sushi))
    setEthPrice(new BigNumber(allowance))
  }, [block, setEthPrice, wethContract])

  useEffect(() => {
    if (block) {
      fetchPrice()
    }
    let refreshInterval = setInterval(fetchPrice, 10000)
    return () => clearInterval(refreshInterval)
  }, [block, setEthPrice])

  return ethPrice
}

export default useEthPrice
