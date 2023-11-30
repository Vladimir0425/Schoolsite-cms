import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'

import { useEffect } from 'react'

import ReactBricksApp from '../components/ReactBricksApp'

import '../css/styles.css'
// import '@/css/ribbon.css'

const MyApp = (props: AppProps) => {
  // useEffect(() => {
  //   document
  //     .querySelector(
  //       "a[href='https://reactbricks.com?utm_campaign=site-badge']"
  //     )
  //     .remove()
  // }, [])

  return (
    <ThemeProvider
      attribute="class"
      storageKey="color-mode"
      enableSystem={false}
      defaultTheme="light"
    >
      <ReactBricksApp {...props} />
    </ThemeProvider>
  )
}

export default MyApp
