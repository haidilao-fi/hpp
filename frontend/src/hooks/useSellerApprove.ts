import { useCallback } from 'react'

import useSushi from './useSushi'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { approve, getSellerPoolContract } from '../sushi/utils'

const useSellerApprove = (lpContract: Contract) => {
  const { account }: { account: string; ethereum: provider } = useWallet()
  const sushi = useSushi()
  const sellerPoolContract = getSellerPoolContract(sushi)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, sellerPoolContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, sellerPoolContract])

  return { onApprove: handleApprove }
}

export default useSellerApprove
