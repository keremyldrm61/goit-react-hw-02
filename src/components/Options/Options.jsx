import styles from "./Options.module.css";

const Options = ({ onFeedback, onReset, showReset }) => {
  return (
    <div className={styles.options}>
      <button className={styles.button} onClick={() => onFeedback("good")}>
        Good
      </button>
      <button className={styles.button} onClick={() => onFeedback("neutral")}>
        Neutral
      </button>
      <button className={styles.button} onClick={() => onFeedback("bad")}>
        Bad
      </button>
      {showReset && (
        <button className={styles.resetButton} onClick={onReset}>
          Reset
        </button>
      )}
    </div>
  );
};

export default Options;
