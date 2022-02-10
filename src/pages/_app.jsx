import {QueryClient, QueryClientProvider} from 'react-query';
import {Hydrate} from 'react-query/hydration';
import 'styles/index.css';
import {ReactQueryDevtools} from 'react-query/devtools';
import 'locales/i18n';
import Layout from 'components/Layout';
import React from 'react';
import {DefaultSeo} from 'next-seo';

const queryClient = new QueryClient();

export default function App({Component, pageProps}) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <DefaultSeo
          openGraph={{
            type: 'website',
            locale: 'en_CH',
            site_name: 'Games of Switzerland',
          }}
        />
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ReactQueryDevtools initialIsOpen />
      </Hydrate>
    </QueryClientProvider>
  );
}
