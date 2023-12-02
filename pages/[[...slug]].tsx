import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useEffect, useRef } from 'react'

import {
  PageViewer,
  cleanPage,
  fetchPage,
  fetchPages,
  types,
  useReactBricksContext,
  renderJsonLd,
  renderMeta,
} from 'react-bricks/frontend'

import config from '../react-bricks/config'

interface PageProps {
  page: types.Page
  errorNoKeys: boolean
  errorPage: boolean
}

const Page: React.FC<PageProps> = ({ page, errorNoKeys, errorPage }) => {
  // Clean the received content
  // Removes unknown or not allowed bricks
  const { pageTypes, bricks } = useReactBricksContext()
  const pageOk = page ? cleanPage(page, pageTypes, bricks) : null
  let timeout = useRef<NodeJS.Timeout>(null)

  useEffect(() => {
    if (typeof document !== 'undefined') {
      timeout.current = setInterval(() => {
        const link = document.querySelector(
          "a[href='https://reactbricks.com?utm_campaign=site-badge'"
        )
        if (link) {
          link.remove()
          clearInterval(timeout.current)
        }
      }, 500) as any
    }
  }, [])

  return (
    <>
      <Head>
        {renderMeta(pageOk)}
        {renderJsonLd(pageOk)}
      </Head>
      {pageOk && !errorPage && !errorNoKeys && (
        <PageViewer page={pageOk} showClickToEdit={false} />
      )}
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  let errorNoKeys: boolean = false
  let errorPage: boolean = false

  if (!config.apiKey) {
    errorNoKeys = true
    return { props: { errorNoKeys } }
  }

  const { slug } = context.params

  let cleanSlug = ''

  if (!slug || slug === '') {
    cleanSlug = 'home'
  } else if (typeof slug === 'string') {
    cleanSlug = slug
  } else {
    cleanSlug = slug.join('/')
  }

  const [page] = await Promise.all([
    fetchPage(cleanSlug, config.apiKey, context.locale, config.pageTypes).catch(
      () => {
        errorPage = true
        return {}
      }
    ),
  ])

  return {
    props: {
      page,
      errorNoKeys,
      errorPage,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async (context) => {
  if (!config.apiKey) {
    return { paths: [], fallback: true }
  }

  const allPages = await fetchPages(config.apiKey)

  const paths = allPages
    .map((page) =>
      page.translations
        .filter(
          (translation) => context.locales.indexOf(translation.language) > -1
        )
        .map((translation) => ({
          params: {
            slug: [...translation.slug.split('/')],
          },
          locale: translation.language,
        }))
    )
    .flat()

  return {
    paths: [...paths, { params: { slug: [''], locale: 'en' } }],
    fallback: false,
  }
}

export default Page
