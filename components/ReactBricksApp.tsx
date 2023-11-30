import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { ReactBricks } from 'react-bricks/frontend'
import { SnackbarProvider } from 'notistack'

import config from '../react-bricks/config'
import { Layout } from './layout/Layout'

const ReactBricksApp = ({ Component, pageProps }: AppProps) => {
  const { pathname } = useRouter()

  return (
    <ReactBricks {...config}>
      <SnackbarProvider maxSnack={5} autoHideDuration={2000}>
        <Layout pathname={pathname}>
          <Component {...pageProps} />
        </Layout>
      </SnackbarProvider>
    </ReactBricks>
  )
}

export default ReactBricksApp
