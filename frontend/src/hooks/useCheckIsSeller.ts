import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getSellerPoolContract } from '../sushi/utils'
import useSushi from './useSushi'
import useBlock from './useBlock'

const useCheckIsSeller = (ethAddr: string) => {
    const [isSeller, setIsSeller] = useState(false)
    const sushi = useSushi()
    const sellerPoolContract = getSellerPoolContract(sushi)
    const block = useBlock()

    const fetchIsSeller = useCallback(async (ethAddr: string) => {
        try {
            const { status } = await sellerPoolContract.methods
                .merchantInfo(ethAddr).call()
            setIsSeller(status != 0)
        } catch {
            return false
        }
    }, [ethAddr, sushi])
    useEffect(() => {
        if (sushi) {
            fetchIsSeller(ethAddr)
        }
    }, [setIsSeller, block, sushi, ethAddr])

    return isSeller
}

export default useCheckIsSeller
