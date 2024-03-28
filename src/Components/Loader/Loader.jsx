import React from 'react'
import { ColorRing } from 'react-loader-spinner'

export default function Loader() {
    return (
        <div className='d-flex align-items-center justify-content-center vh-100 w-100 loader'>
            <ColorRing
                visible={true}
                height="130"
                width="130"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={['#0aad0a', '#0aad0a', '#0aad0a', '#0aad0a', '#0aad0a']}
            />
        </div>
    )
}
