import App, { AppProps, AppContext } from 'next/app';
import { DefaultSeo } from 'next-seo';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

import { PersonContext } from '@blog/person-context';
import { getPerson, Person } from '@blog/cms/person';

import '@blog/styles/globals.css';

interface Props extends AppProps {
  hostUrl?: string;
  person?: Person;
}

const MyApp = ({ Component, pageProps, person, hostUrl }: Props): JSX.Element => {
  pageProps.hostUrl = hostUrl;

  if (!person) {
    return <Component {...pageProps} />;
  }

  return (
    <PersonContext.Provider value={person}>
      <DefaultSeo
        title={person.name}
        description={person.title}
        twitter={{
          cardType: 'summary',
        }}
        openGraph={{
          title: person.name,
          description: person.title,
          type: 'website',
          url: hostUrl,
          images: [
            {
              url: `${hostUrl}/images/og.jpg`,
              width: 1200,
              alt: 'Og image',
            },
          ],
        }}
      />
      <Component {...pageProps} />
    </PersonContext.Provider>
  );
};

MyApp.getInitialProps = async (appContext: AppContext): Promise<Partial<Props>> => {
  const appProps = await App.getInitialProps(appContext);

  // TODO: Probably can be handled better
  if (appContext.router.route === '/_error') {
    return { ...appProps };
  }

  // TODO: Probably can be handled better as well
  const { req } = appContext.ctx;
  const hostUrl = `https://${req?.headers.host ?? req?.headers['x-forwarded-host']}`;

  const person = await getPerson({ allFields: false });

  return { ...appProps, person, hostUrl };
};

export default MyApp;
