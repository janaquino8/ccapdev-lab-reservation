import styles from './LPButton.module.css';

interface LPButtonProps {
    text: string;
    variant: string;
    onClick?: () => void;
}

function LPButton({ text, variant, onClick }: LPButtonProps) {
    return (
    <button 
    className={`${styles.customButton} ${styles[variant]}`}
    onClick={onClick}
    >
      {text}
    </button>
  );
}

export default LPButton;