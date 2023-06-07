import SearchBar from '@/components/SearchBar'
import IDOList from '@/components/IDOList'
import React, { useState } from 'react'

const launchpad = () => {
  const [address, setAddress] = useState()
  const onHandleSearch = (value) => {
    setAddress(value)
  }
  const onClearSearch = () => {
    setAddress('')
  }
  return (
    <div>
      <h2>Launch pad</h2>
      <SearchBar onHandleSearch={onHandleSearch} onClearSearch={onClearSearch} />
      <IDOList tokenAddress={address} owner="0x70997970C51812dc3A010C7d01b50e0d17dc79C8" />
    </div>
  )
}

export default launchpad