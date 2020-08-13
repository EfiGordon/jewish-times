import React from 'react';
import AdBanner from './googleAdSense';
const myFooter = () => {
    return (
        <div>
            <p>Website made by <a href="https://www.efigordon.com/">Efi Gordon</a>. The data is taken from <a href="https://www.hebcal.com/">Hebcal API.</a></p>
            <AdBanner />
        </div>
    )
}

export default myFooter;