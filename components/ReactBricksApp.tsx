import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { ReactBricks } from 'react-bricks/frontend'

import config from '../react-bricks/config'
import { Layout } from './layout/Layout'

const ReactBricksApp = ({ Component, pageProps }: AppProps) => {
  const { pathname } = useRouter()

  return (
    <ReactBricks {...config}>
      <Layout pathname={pathname}>
        <Component {...pageProps} />
      </Layout>
    </ReactBricks>
  )
}

export default ReactBricksApp
