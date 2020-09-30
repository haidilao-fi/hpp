import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import useSushi from './useSushi'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { getAllowance } from '../utils/erc20'
import { getSellerPoolContract } from '../sushi/utils'

const useSellerAllowance = (lpContract: Contract) => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account }: { account: string; ethereum: provider } = useWallet()
  const sushi = useSushi()
  const sellerContract = getSellerPoolContract(sushi)

  const fetchAllowance = useCallback(async () => {
    const allowance = await getAllowance(
      lpContract,
      sellerContract,
      account,
    )
    setAllowance(new BigNumber(allowance))
  }, [account, sellerContract, lpContract])

  useEffect(() => {
    if (account && sellerContract && lpContract) {
      fetchAllowance()
    }
    let refreshInterval = setInterval(fetchAllowance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, sellerContract, lpContract])

  return allowance
}

export default useSellerAllowance
