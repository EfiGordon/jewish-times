import Head from 'next/head'
import HomeLayout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import CountriesList from '../components/countriesList';
import { Typography } from 'antd';
const { Title, Paragraph } = Typography;
import { countries } from '../lib/data/countries'

export default function Home() {
  return (
    <HomeLayout titleName="Zmanim">
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <Typography>
          <Title>Introduction</Title>
          <Paragraph>
            Welcome to <span>Zmanim</span>. You can look for shabat / jewish holiday times by navigating to your country or you can just enter your city (or nearest) in the search field.
          </Paragraph>
        </Typography>
      </section>
      <CountriesList countries={countries} />
    </HomeLayout>
  )
}
