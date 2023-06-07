import React from 'react'

const Container = (props) => {
  return (
    <div className='w-full'>
        <div className='w-11/12 mx-auto my-0'>{props.children}</div>
    </div>
  )
}

export default Container