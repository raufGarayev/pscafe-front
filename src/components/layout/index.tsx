import React, { useEffect } from 'react'
import Header from '../ui/header'
import Router from '../../routes'
import useBranchStore from '../../stores/branchesStore'
import AntThemeDesign from './antThemeDesign'
import useTablesStore from '../../stores/tablesStore'

const Layout = () => {
  const { getBranchesToStore } = useBranchStore()
  const { getRunningTablesToStore } = useTablesStore()

  useEffect(() => {
    getBranchesToStore()

    const intervalId = setInterval(() => {
      getRunningTablesToStore()
    }, 5000)

    return () => clearInterval(intervalId)
  }, [])
  return (
    <>
      <Header />
      <main>
        <Router />
      </main>
    </>
  )
}

export default Layout
