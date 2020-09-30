import { useCallback } from 'react'

import useSushi from './useSushi'
import { useWallet } from 'use-wallet'

import {getSellerPoolContract, sellerStake} from '../sushi/utils'

const useSellerStake = () => {
  const { account } = useWallet()
  const sushi = useSushi()

  const handleStake = useCallback(
    async (amount: string) => {
        if(!amount || amount == '') {
            amount = '0';
        }
        const txHash = await sellerStake(
            getSellerPoolContract(sushi),
            amount,
            account,
        )
        console.log(txHash)
    },
    [account, sushi],
  )

  return { onStake: handleStake }
}

export default useSellerStake
