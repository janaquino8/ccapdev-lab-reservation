import React from 'react';
import styles from './Board.module.css';

interface BoardProps {
  children: React.ReactNode;
  title?: string;
}

const Board: React.FC<BoardProps> = ({ children, title }) => {
  return (
    <div className={styles.greenBoard}>
        <div className={styles.header}>
            <span className={styles.label}>View Slots</span>
            {title && <h2 className={styles.boardTitle}>{title}</h2>}
        </div>

        <div className={styles.legendContainer}>
            <div className={`${styles.legendItem} ${styles.available}`}>Available</div>
            <div className={`${styles.legendItem} ${styles.reserved}`}>Reserved</div>
            <div className={`${styles.legendItem} ${styles.unavailable}`}>Unavailable</div>
        </div>

        <div className={styles.layoutContainer}>
            {children}
        </div>
    </div>
  );
};

export default Board;