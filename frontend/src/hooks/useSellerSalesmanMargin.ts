import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import {
  getSellerPoolContract,
  getSellerPoolSalesmanInfo
} from '../sushi/utils'
import useSushi from './useSushi'
import useBlock from './useBlock'

const useSellerSalesmanMargin = () => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const sushi = useSushi()
  const sellerPoolContract = getSellerPoolContract(sushi)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    try {
      const {salesmanMargin} = await getSellerPoolSalesmanInfo(sellerPoolContract, account)
      setBalance(new BigNumber(salesmanMargin))
    } catch(e) {
      setBalance(new BigNumber(0))
    }
  }, [account, sushi])

  useEffect(() => {
    if (account && sushi) {
      fetchBalance()
    }
  }, [account, setBalance, block, sushi])

  return balance
}

export default useSellerSalesmanMargin
