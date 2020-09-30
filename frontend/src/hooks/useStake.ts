import { useCallback } from 'react'

import useSushi from './useSushi'
import { useWallet } from 'use-wallet'

import { stake, getMasterChefContract } from '../sushi/utils'

const useStake = (pid: number) => {
  const { account } = useWallet()
  const sushi = useSushi()

  const handleStake = useCallback(
    async (amount: string, recommend :string) => {
        if(!isValidAddress(recommend)) {
            recommend = account;
        }
        if(!amount || amount == '') {
            amount = '0';
        }
        const txHash = await stake(
            getMasterChefContract(sushi),
            pid,
            amount,
            account,
            recommend,
        )
        console.log(txHash)
    },
    [account, pid, sushi],
  )

  return { onStake: handleStake }
}

const isValidAddress = (account: string) => {
    if (!account.startsWith("0x"))
        return false;
    return account.length == 42;
}

export default useStake
