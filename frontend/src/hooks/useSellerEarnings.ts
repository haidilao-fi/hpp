import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import {getSellerPoolEarned, getSellerPoolContract} from '../sushi/utils'
import useSushi from './useSushi'
import useBlock from './useBlock'

const useSellerEarnings = () => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const sushi = useSushi()
  const sellerPoolContract = getSellerPoolContract(sushi)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getSellerPoolEarned(sellerPoolContract, account)
    setBalance(new BigNumber(balance))
  }, [account, sellerPoolContract, sushi])

  useEffect(() => {
    if (account && sellerPoolContract && sushi) {
      fetchBalance()
    }
  }, [account, block, sellerPoolContract, setBalance, sushi])

  return balance
}

export default useSellerEarnings
