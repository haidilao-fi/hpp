import { useCallback } from 'react'

import useSushi from './useSushi'
import { useWallet } from 'use-wallet'

import {sellerPoolHarvest, getSellerPoolContract} from '../sushi/utils'

const useSellerReward = () => {
  const { account } = useWallet()
  const sushi = useSushi()
  const sellerPoolContract = getSellerPoolContract(sushi)

  const handleReward = useCallback(async () => {
    const txHash = await sellerPoolHarvest(sellerPoolContract, account)
    console.log(txHash)
    return txHash
  }, [account, sushi])

  return { onReward: handleReward }
}

export default useSellerReward
