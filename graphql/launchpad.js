const GET_ALL_LAUNCHPAD_INFO = 
`
query {
  idopools(first: 10) {
    id
    dexInfo {
      factory
      router
      weth
    }
    distributed
    distributedTokens
    finInfo {
      hardCap
      listingPrice
      lpInterestRate
      maxEthPayment
      minEthPayment
      softCap
      tokenPrice
    }
    lockerFactory
    metadataURL
    rewardToken
    tokensForDistribution
    timestamps {
      endTimestamp
      startTimestamp
      unlockTimestamp
    }
    totalInvestedETH
    userInfos(first: 10) {
      debt
      total
      totalInvestedETH
    }   
  }
}
`


export { GET_ALL_LAUNCHPAD_INFO }
