import { useCallback } from 'react'

import useSushi from './useSushi'
import { useWallet } from 'use-wallet'

import {getSellerPoolContract, sellerUnstake} from '../sushi/utils'

const useSellerUnstake = () => {
  const { account } = useWallet()
  const sushi = useSushi()
  const sellerPoolContract = getSellerPoolContract(sushi)

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await sellerUnstake(sellerPoolContract, amount, account)
      console.log(txHash)
    },
    [account, sushi],
  )

  return { onUnstake: handleUnstake }
}

export default useSellerUnstake
