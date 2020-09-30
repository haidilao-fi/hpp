import BigNumber from 'bignumber.js'

export const getBalanceNumber = (balance: BigNumber, decimals = 18) => {
  const displayBalance = balance.dividedBy(new BigNumber(10).pow(decimals))
  return displayBalance.toNumber()
}

export const getDisplayBalance = (balance: BigNumber, decimals = 18) => {
  const displayBalance = balance.dividedBy(new BigNumber(10).pow(decimals))
  if (displayBalance.lt(1)) {
    return displayBalance.toPrecision(4)
  } else {
    return displayBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
}

export const getFullDisplayBalance = (balance: BigNumber, decimals = 18) => {
  return balance.dividedBy(new BigNumber(10).pow(decimals)).toFixed()
}

export const getNumber = (balance: BigNumber, decimals = 2) => {
  return balance.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
export const getPrice = (balance: BigNumber, decimals = 2) => {
  return balance.toFixed(decimals)
}
export const getDecimal = (balance: BigNumber, decimals = 4) => {
  const displayBalance = balance.dividedBy(new BigNumber(10).pow(18))
  return displayBalance.toFixed(decimals)
}
