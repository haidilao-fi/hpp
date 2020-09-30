import { useCallback } from 'react'

import useSushi from './useSushi'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import { registerSalesman, getSellerPoolContract } from '../sushi/utils'

const useRegisterSalesman = () => {
  const { account }: { account: string; ethereum: provider } = useWallet()
  const sushi = useSushi()
  const sellerPoolContract = getSellerPoolContract(sushi)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await registerSalesman(sellerPoolContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, sellerPoolContract])

  return { onDeposit: handleApprove }
}

export default useRegisterSalesman
