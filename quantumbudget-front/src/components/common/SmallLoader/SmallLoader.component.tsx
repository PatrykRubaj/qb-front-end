import React from 'react';
import styles from './SmallLoader.module.css';

interface Props {
  className?: string;
}

const SmallLoader = (props: Props) => (
  <div className={`${styles.skChase} ${props.className}`}>
    <div className={styles.skChaseDot}></div>
    <div className={styles.skChaseDot}></div>
    <div className={styles.skChaseDot}></div>
    <div className={styles.skChaseDot}></div>
    <div className={styles.skChaseDot}></div>
    <div className={styles.skChaseDot}></div>
  </div>
);

export default SmallLoader;
