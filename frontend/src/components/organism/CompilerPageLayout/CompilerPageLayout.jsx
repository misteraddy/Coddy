import Header from '@/components/molecule/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'

function CompilerPageLayout() {
  return (
    <div>
        <Header />
        <div><Outlet/></div>
    </div>
  )
}

export default CompilerPageLayout