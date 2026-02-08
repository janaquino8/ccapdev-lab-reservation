import styles from './LPInput.module.css';

function LPInput({ label, type }: { label: string; type: string }) {
  return (
    <div className={`styles.inputContainer`}>
      <label className={styles.label}>{label}</label>
      <input type={type} 
      placeholder={`Enter ${label}`}
      className={`${styles.roundedInput}`} />
    </div>
  );
}

export default LPInput;