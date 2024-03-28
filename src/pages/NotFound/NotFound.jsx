import React from 'react'
import './NotFound.module.css'
import logo from '../../assets/images/error.svg'

export default function NotFound() {
  return (
    <div className='text-center py-5'><img src={logo} alt="NotFound" className='w-50' /></div>
    
  )
}
