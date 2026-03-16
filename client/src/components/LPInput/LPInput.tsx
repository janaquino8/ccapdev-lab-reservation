import styles from './LPInput.module.css';
import { ChangeEvent } from 'react';

interface LPInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function LPInput({ label, type, value, onChange }: LPInputProps) {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{label}</label>
      <input 
        type={type} 
        placeholder={`Enter ${label}`}
        className={styles.roundedInput}
        value={value}
        onChange={onChange} 
      />
    </div>
  );
}

export default LPInput;