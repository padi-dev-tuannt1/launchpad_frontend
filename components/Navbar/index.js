import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
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
  )
}

export default Navbar