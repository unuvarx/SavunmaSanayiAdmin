import Navbar from '@/components/navbar';
import React from 'react'
import styles from "@/lib/layout/layout.module.scss";

export default function Layout({ children }) {
    return (
      <React.Fragment>
        <div className={styles.salesContainer}>
          <Navbar />
          {children}
        </div>
      </React.Fragment>
    );
  }
  