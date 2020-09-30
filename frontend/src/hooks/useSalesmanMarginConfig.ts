import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import {getStaked, getSellerPoolContract, getSalesmanMargin} from '../sushi/utils'
import useSushi from './useSushi'
import useBlock from './useBlock'

const useSalesmanMarginConfig = () => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const sushi = useSushi()
  const sellerPoolContract = getSellerPoolContract(sushi)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    try {
      const salesmanMargin = await getSalesmanMargin(sellerPoolContract)
      setBalance(new BigNumber(salesmanMargin))
    } catch(e) {
      console.log(e)
      return new BigNumber(0)
    }
  }, [account, sushi])

  useEffect(() => {
    if (account && sushi) {
      fetchBalance()
    }
  }, [account, setBalance, block, sushi])

  return balance
}

export default useSalesmanMarginConfig
