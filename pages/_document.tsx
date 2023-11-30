import { Html, Head, Main, NextScript } from 'next/document'

import { useEffect } from 'react'
import { Link } from 'react-bricks'

export default function Document() {
  return (
    <Html lang="en" className="overflow-x-hidden">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
