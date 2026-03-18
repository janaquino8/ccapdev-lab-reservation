import React from 'react';
import styles from './CreateBoard.module.css'; // Adjust path if needed

interface BoardProps {
  children: React.ReactNode;
  title?: string;
  room?: string;
  slot?: string;
}

const Board: React.FC<BoardProps> = ({ children, title, room, slot}) => {
  return (
    <div className={styles.greenBoard}>
      <div className={styles.header}>
        <div className={styles.titlesGroup}>
          {title && <span className={styles.label}>{title}</span>}
          {room && <h2 className={styles.boardTitle}>{room}</h2>}
          {slot && <h2 className={styles.slotName}>{slot}</h2>}
        </div>

        {room && (
          <div className={styles.legendContainer}>
            <div className={`${styles.legendItem} ${styles.available}`}>Available</div>
            <div className={`${styles.legendItem} ${styles.reserved}`}>Reserved</div>
            <div className={`${styles.legendItem} ${styles.unavailable}`}>Unavailable</div>
          </div>
        )}
      </div>

      <div className={styles.layoutContainer}>
        {children}
      </div>
    </div>
  );
};

export default Board;