import React from 'react';
import styles from './Board.module.css';

interface BoardProps {
  children: React.ReactNode;
  title?: string;
  room?: string;
}

const Board: React.FC<BoardProps> = ({ children, title, room }) => {
  return (
    <div className={styles.greenBoard}>
        <div className={styles.header}>
            <span className={styles.label}>{title}</span>
            {title && <h2 className={styles.boardTitle}>{room}</h2>}
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