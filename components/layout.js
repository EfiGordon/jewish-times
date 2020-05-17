import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { Input, Typography } from 'antd';
import { CitySearchSelect } from './mySearch';
import { useRouter } from 'next/router'
import MyFooter from './myFooter';
const { Title } = Typography;
const { Search } = Input;

export const siteTitle = 'Zmanim - Jewish Holiday Times'

export default function HomeLayout({ children, home, titleName }) {
    const router = useRouter()
    const logoPath = `/images/logo.svg`;
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="description"
                    content="Learn how to build a personal website using Next.js"
                />
                <meta
                    property="og:image"
                    content={`https://og-image.now.sh/${encodeURI(
                        siteTitle
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <header className={styles.header}>
                <div className={styles.title}>

                    <Title style={{ flexDirection: 'row' }}>
                        <img
                            src={logoPath}
                            className={`${styles.logoImage} ${utilStyles.borderCircle}`}
                            alt={'Logo'}
                        />
            Zmanim
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
            {!home && (
                <div className={styles.backToHome}>
                    <Link href="/">
                        <a>← Back to home</a>
                    </Link>
                </div>
            )}
            <footer>
                <MyFooter />
            </footer>
        </div>
    )
}
