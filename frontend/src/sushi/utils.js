import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import {addressUinV2LpMap} from "./lib/constants";

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const GAS_LIMIT = {
  STAKING: {
    DEFAULT: 200000,
    SNX: 850000,
  },
}

export const getMasterChefAddress = (sushi) => {
  return sushi && sushi.masterChefAddress
}
export const getSushiAddress = (sushi) => {
    return sushi && sushi.sushiAddress
}
export const getPriceLpAddress = (sushi) => {
    return sushi && sushi.priceLpAddress
}
export const getUsdcWethAddress = (sushi) => {
    return sushi && sushi.usdcWethAddress
}

export const getSellerLpTokenAddress = (sushi) => {
  return sushi && sushi.sellerLpTokenAddress
}
export const getWethContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.weth
}
export const getUsdcContract = (sushi) => {
    return sushi && sushi.contracts && sushi.contracts.usdc
}

export const getMasterChefContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.masterChef
}
export const getSellerPoolContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.sellerPool
}
export const getSellerLpTokenContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.sellerLpToken
}
export const getSushiContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.sushi
}

export const getFarms = (sushi) => {
  return sushi
    ? sushi.contracts.pools.map(
        ({
          pid,
          name,
          symbol,
          icon,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          lpAddress,
          lpContract,
          link,
        }) => ({
          pid,
          id: symbol,
          name,
          lpToken: symbol,
          lpTokenAddress: lpAddress,
          lpContract,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          earnToken: 'HPP',
          earnTokenAddress: sushi.contracts.sushi.options.address,
          icon,
          link,
        }),
      )
    : []
}

export const getPoolWeight = async (masterChefContract, pid) => {
  const { allocPoint } = await masterChefContract.methods.poolInfo(pid).call()
  const totalAllocPoint = await masterChefContract.methods
    .totalAllocPoint()
    .call()
  return new BigNumber(allocPoint).div(new BigNumber(totalAllocPoint))
}

export const getPerBlock = async (masterChefContract) => {
  return masterChefContract.methods.perBlock().call()
}

export const getSalesmanRelation = async (masterChefContract, account) => {
  return masterChefContract.methods.salesmanRelation(account).call()
}
export const getSalesmanInfo = async (masterChefContract, account) => {
  return masterChefContract.methods.salesmanRelation(account).call()
}

export const getSalesmanMargin = async (sellerPoolContract) => {
  return sellerPoolContract.methods.salesmanMargin().call()
}
export const getSellerPoolSalesmanInfo = async (sellerPoolContract, account) => {
  return sellerPoolContract.methods.salesmanInfo(account).call()
}

export const registerSalesman = async (sellerPoolContract, account) => {
  return sellerPoolContract.methods.registerSalesman().send({ from: account })
}

export const cancelSalesman = async (sellerPoolContract, account) => {
  return sellerPoolContract.methods.cancelSalesman().send({ from: account })
}

export const getSellerPoolEarned = async (sellerPoolContract, account) => {
  return sellerPoolContract.methods.pendingToken(account).call()
}

export const registerSeller = async (sellerPoolContract, account, ethAddr, name, introduction, addr, longitude, latitude) => {
    return sellerPoolContract.methods.registerMerchant(ethAddr, name, introduction, addr, longitude, latitude).send({ from: account })
}

export const sellerPoolHarvest = async (sellerPoolContract, account) => {
  return sellerPoolContract.methods
      .deposit('0')
      .send({ from: account })
      .on('transactionHash', (tx) => {
        console.log(tx)
        return tx.transactionHash
      })
}

export const sellerStake = async (sellerPoolContract, amount, account) => {
  return sellerPoolContract.methods
      .deposit(
          new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
      )
      .send({ from: account })
      .on('transactionHash', (tx) => {
        console.log(tx)
        return tx.transactionHash
      })
}


export const sellerUnstake = async (sellerPoolContract, amount, account) => {
  return sellerPoolContract.methods
      .withdraw(
          new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
      )
      .send({ from: account })
      .on('transactionHash', (tx) => {
        console.log(tx)
        return tx.transactionHash
      })
}

export const getEarned = async (masterChefContract, pid, account) => {
  return masterChefContract.methods.pendingToken(pid, account).call()
}



export const getTotalLPWethValue = async (
  masterChefContract,
  wethContract,
  lpContract,
  tokenContract,
  pid,
) => {
    // console.log(masterChefContract.options.address, "   ", wethContract.options.address, "   " ,  lpContract.options.address, "   " ,  tokenContract.options.address)
    if (lpContract.options.address == wethContract.options.address) {
        // staked weth
        const tokenAmount = await wethContract.methods.balanceOf(masterChefContract.options.address).call()
        const amount = new BigNumber(tokenAmount).div(new BigNumber(10).pow(18))
        return {
            tokenAmount: amount,
            wethAmount: amount,
            totalWethValue: amount,
            tokenPriceInWeth: 1,
            poolWeight: await getPoolWeight(masterChefContract, pid),
        }
    } else if(lpContract.options.address == tokenContract.options.address) {
        // staked other signal assets
        const tokenLpAddress = addressUinV2LpMap[tokenContract.options.address.toLowerCase()]
        const tokenDecimals = await tokenContract.methods.decimals().call()
        const lpToken = await lpContract.methods.balanceOf(tokenLpAddress).call()
        const lpWeth = await wethContract.methods.balanceOf(tokenLpAddress).call()
        const lpTokenAmount = new BigNumber(lpToken).div(new BigNumber(10).pow(tokenDecimals))
        const lpWethAmount = new BigNumber(lpWeth).div(new BigNumber(10).pow(18))
        const tokenPriceInEth = lpWethAmount.div(lpTokenAmount)
        const balance = await lpContract.methods.balanceOf(masterChefContract.options.address).call()
        const tokenAmount = new BigNumber(balance).div(new BigNumber(10).pow(tokenDecimals))
        const wethAmount = tokenPriceInEth.times(tokenAmount)
        return {
            tokenAmount: tokenAmount,
            wethAmount: wethAmount,
            totalWethValue: wethAmount,
            tokenPriceInWeth: tokenPriceInEth,
            poolWeight: await getPoolWeight(masterChefContract, pid),
        }
    }

  // Get balance of the token address
  const tokenAmountWholeLP = await tokenContract.methods.balanceOf(lpContract.options.address).call()
  const tokenDecimals = await tokenContract.methods.decimals().call()
  // Get the share of lpContract that masterChefContract owns
  const balance = await lpContract.methods.balanceOf(masterChefContract.options.address).call()
  // Convert that into the portion of total lpContract = p1
  const totalSupply = await lpContract.methods.totalSupply().call()
  // Get total weth value for the lpContract = w1
  const lpContractWeth = await wethContract.methods.balanceOf(lpContract.options.address).call()
  // Return p1 * w1 * 2
  const portionLp = new BigNumber(balance).div(new BigNumber(totalSupply))
  const lpWethWorth = new BigNumber(lpContractWeth)
  const totalLpWethValue = portionLp.times(lpWethWorth).times(new BigNumber(2))
  // Calculate
  const tokenAmount = new BigNumber(tokenAmountWholeLP).times(portionLp).div(new BigNumber(10).pow(tokenDecimals))
  const wethAmount = new BigNumber(lpContractWeth).times(portionLp).div(new BigNumber(10).pow(18))

  return {
    tokenAmount,
    wethAmount,
    totalWethValue: totalLpWethValue.div(new BigNumber(10).pow(18)),
    tokenPriceInWeth: wethAmount.div(tokenAmount),
    poolWeight: await getPoolWeight(masterChefContract, pid),
  }
}

export const approve = async (lpContract, masterChefContract, account) => {
  return lpContract.methods
    .approve(masterChefContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export const getSushiSupply = async (sushi) => {
  return new BigNumber(await sushi.contracts.sushi.methods.totalSupply().call())
}

export const stake = async (masterChefContract, pid, amount, account, recommend) => {
  return masterChefContract.methods
    .deposit(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
      recommend,
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const unstake = async (masterChefContract, pid, amount, account) => {
  return masterChefContract.methods
    .withdraw(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}
export const harvest = async (masterChefContract, pid, account) => {
  return masterChefContract.methods
    .deposit(pid, '0', '0x0000000000000000000000000000000000000000')
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const getStaked = async (masterChefContract, pid, account) => {
  try {
    const { amount } = await masterChefContract.methods
      .userInfo(pid, account)
      .call()
    return new BigNumber(amount)
  } catch {
    return new BigNumber(0)
  }
}

export const redeem = async (masterChefContract, account) => {
  let now = new Date().getTime() / 1000
  if (now >= 1597172400) {
    return masterChefContract.methods
      .exit()
      .send({ from: account })
      .on('transactionHash', (tx) => {
        console.log(tx)
        return tx.transactionHash
      })
  } else {
    alert('pool not active')
  }
}

export const getEthPrice = async (wethContract, usdcContract, usdcWethAddress) => {
    const ethToken = await wethContract.methods.balanceOf(usdcWethAddress).call()
    const usdcToken = await usdcContract.methods.balanceOf(usdcWethAddress).call()
    return new BigNumber(usdcToken).times(new BigNumber(10).pow(12)).div(ethToken)
}
export const getTokenEthPrice = async (wethContract, tokenContract, priceLpAddress) => {
    const ethToken = await wethContract.methods.balanceOf(priceLpAddress).call()
    const token = await tokenContract.methods.balanceOf(priceLpAddress).call()
    return new BigNumber(ethToken).div(token)
}
