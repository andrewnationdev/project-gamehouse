import { useCallback, useEffect, useState } from 'react'
import Button from '../components/Button'
import ClickCount from '../components/ClickCount'
import StoreApp from '../components/store_app'
import styles from '../styles/home.module.css'

function throwError() {
  console.log(
    // The function body() is not defined
    document.body()
  )
}

function Home() {
  return (
    <main className={styles.main}>
     <StoreApp/>
    </main>
  )
}

export default Home
