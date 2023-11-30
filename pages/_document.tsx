import { Html, Head, Main, NextScript } from 'next/document'

import { useEffect } from 'react'

export default function Document() {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document
        .querySelector(
          "a[href='https://reactbricks.com?utm_campaign=site-badge'"
        )
        .remove()
    }
  }, [])

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

export function getStaticProps() {
  console.log('HERE??????')
}

// export function getStaticProps() {
//   if (typeof document !== 'undefined') {
//     console.log('HERE???')
//     document
//       .querySelector("a[href='https://reactbricks.com?utm_campaign=site-badge'")
//       .remove()
//   }
// }
