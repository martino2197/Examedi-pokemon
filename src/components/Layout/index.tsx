import React from 'react'
import styles from '@/styles/Home.module.css'

interface Props {
    children?: React.ReactNode
  };

const Layout: React.FC<Props> = ({children}) => {

    return (
    <>
        <div className={styles.main}>
            {children}
        </div>
    </>
    )
}

export default Layout;