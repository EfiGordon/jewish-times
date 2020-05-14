
import styles from './myPageHeader.module.css'
import { PageHeader } from 'antd';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
export default function MyPageHeader({ flagPath, countryName, subTitle, countryCode }) {
    const router = useRouter()
    useEffect(() => {

    }, [])
    return (
        <div className={styles.Container}>
            <PageHeader
                onBack={() => {
                    if (router.asPath.includes('/city')) {
                        router.push('/country', '/country?countryCode=' + countryCode);
                    } else {
                        router.push('/');
                    }
                }}
                title={countryName + " Jewish times"}
                subTitle={subTitle}
                avatar={{
                    src: flagPath,
                    alt: subTitle,
                    onError: () => {
                        console.log('avatar error - not the movie');
                    }
                }}

            />
        </div>
    )
}
