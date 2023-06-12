import React, { useState } from 'react'
import Link from 'next/link'
import { useWeb3React } from '@web3-react/core';
import { injected } from '@/connectors/metamask';

const Navbar = () => {
  const web3reactContext = useWeb3React(); 

  const handleConnect = async () => {
    try {
      await web3reactContext.activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  }
  return (
    <div className='flex justify-between'>
      <div className='flex justify-between w-2/3'>
      <Link href="/">
        Home
      </Link>
      <Link href="/launchpad">
        Launchpad
      </Link>
      <Link href="/locker">
        Locker
      </Link>
      <Link href="/account">
        Account
      </Link>
      <Link href="/manage">
        Manage
      </Link>
      
      </div>
      <div>
      {web3reactContext.account == null ? (
          <button
            onClick={handleConnect}
          >
            Connect
          </button>
        ) : (
          <button
            className="address text-collapse"
          >
            {web3reactContext.account}
          </button>)}
      </div>
    </div>
    
  )
}

export default Navbar