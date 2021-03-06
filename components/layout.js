import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import utilStyles from '../styles/utils.module.css'
import styles from './layout.module.css'

import { Typography } from 'antd';
const { Title } = Typography;


import { CitySearchSelect } from './mySearch';
import MyFooter from './myFooter';

export const siteTitle = 'Jewish Holiday And Shabbat Times'

export default function HomeLayout({ children, home, siteTitle }) {
    const router = useRouter()
    const logoPath = `/images/logo.svg`;


    //const adSenseScript = '<script data-ad-client="ca-pub-9268139755114912" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>';
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="description"
                    content={`Get jewish times at ${siteTitle}. Shabbat / Holiday times.`}
                />
                <meta
                    property="og:image"
                    content={`https://jewishtimes.at/favicon.ico`}
                />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
                {/* <script data-ad-client="ca-pub-9268139755114912" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script> */}
            </Head>
            <header className={styles.header}>
                <div className={styles.title}>

                    <Title style={{ flexDirection: 'row' }}>
                        <Link href="/">Jewish Times</Link>
                    </Title>

                </div>

                {
                    <span title="You can type here a city name">
                        <CitySearchSelect style={{ width: 200 }} onSelectCity={(value) => {
                            router.push('/city/' + value + '-on-' + new Date().toISOString().slice(0, 10));
                        }} />
                    </span>}
            </header>
            <main>{children}</main>
            {
                !home && (
                    <div className={styles.backToHome}>
                        <Link href="/">
                            <a>← Back to home</a>
                        </Link>
                    </div>
                )
            }
            <footer>
                <MyFooter />
            </footer>
        </div >
    )
}
