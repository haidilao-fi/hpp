import { useCallback } from 'react'

import useSushi from './useSushi'
import { useWallet } from 'use-wallet'

import {getSellerPoolContract, registerSeller} from '../sushi/utils'
import {BigNumber} from "../sushi";

const useRegisterSeller = () => {
  const { account } = useWallet()
  const sushi = useSushi()

  const handleRegister = useCallback(
    async (ethAddr: string, name :string , introduction:string, addr:string, longitude:string, latitude:string) => {
        if(!isValidAddress(ethAddr)) {
            alert('Ethereum address is incorrect.')
            return
        }
        if(!name || name == '') {
            alert('Merchant name cannot be empty.')
            return
        }
        if(!introduction || introduction == '') {
            alert('Merchant introduction cannot be empty.')
            return
        }
        if(!addr || addr == '') {
            alert('Merchant detailed address cannot be empty.')
            return
        }
        if(!longitude || longitude == '') {
            alert('Longitude of merchant location cannot be empty.')
            return
        }
        if(!latitude || latitude == '') {
            alert('Latitude of merchant location cannot be empty.')
            return
        }
        if(!isNumber(longitude) || !isNumber(latitude)) {
            alert('Incorrect address location information.')
            return
        }
        let lon, lat
        try {
            lon = new BigNumber(longitude).times(new BigNumber(10).pow(10)).toString()
            lat = new BigNumber(latitude).times(new BigNumber(10).pow(10)).toString()
        } catch (e) {
            alert('Incorrect address location information.')
            return
        }

        const { status } = await getSellerPoolContract(sushi).methods
            .sellerInfo(ethAddr).call()
        if (status == 1) {
            alert('The filled-in Ethereum address is already a merchant and cannot be registered repeatedly.')
            return
        }

        if(!window.confirm("Be sure to add a real merchant, if you add a fake merchant, you will lose your deposit and lose your status as a salesman!")) {
            return
        }

        const txHash = await registerSeller(
            getSellerPoolContract(sushi),
            account,
            ethAddr,
            name,
            introduction,
            addr,
            lon,
            lat,
        )
        console.log(txHash)
    },
    [account, sushi],
  )

  return { onRegister: handleRegister }
}

const isNumber = (val: string) => {
    var regPos = /^\d+(\.\d+)?$/;
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;
    if(regPos.test(val) || regNeg.test(val)) {
        return true;
    } else {
        return false;
    }
}

const isValidAddress = (account: string) => {
    if (!account.startsWith("0x"))
        return false;
    return account.length == 42;
}

export default useRegisterSeller
