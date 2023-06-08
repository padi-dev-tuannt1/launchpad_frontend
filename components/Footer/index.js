import React from 'react'
import Link from 'next/link'
import { useApplicationContext } from '@/context/applicationContext'
const Footer = () => {
  const { IDOFactoryAddress, TokenLockerFactoryAddress } = useApplicationContext()
  return (
    <div>
      <h2>Contract addresses</h2>
      <h3>IDO Factory</h3>
      <Link href="/">{IDOFactoryAddress}</Link>
      <h3>Locker Factory</h3>
      <Link href="/">{TokenLockerFactoryAddress}</Link>
    </div>
  )
}

export default Footer