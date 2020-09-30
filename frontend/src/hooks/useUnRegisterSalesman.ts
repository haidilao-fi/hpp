import { useCallback } from 'react'

import useSushi from './useSushi'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import { cancelSalesman, getSellerPoolContract } from '../sushi/utils'

const useUnRegisterSalesman = () => {
  const { account }: { account: string; ethereum: provider } = useWallet()
  const sushi = useSushi()
  const sellerPoolContract = getSellerPoolContract(sushi)

  const handle = useCallback(async () => {
    try {
      const tx = await cancelSalesman(sellerPoolContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, sellerPoolContract])

  return { onRefund: handle }
}

export default useUnRegisterSalesman
