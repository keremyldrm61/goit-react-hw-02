import { useState, useEffect } from "react";
import Description from "../Description/Description.jsx";
import Options from "../Options/Options.jsx";
import Feedback from "../Feedback/Feedback.jsx";
import Notification from "../Notification/Notification.jsx";
import styles from "./App.module.css";

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  // Local Storage'e yüklemek için
  useEffect(() => {
    const saved = localStorage.getItem('feedback');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (
          typeof parsed === 'object' &&
          parsed.good !== undefined &&
          parsed.neutral !== undefined &&
          parsed.bad !== undefined
        ) {
          setFeedback(parsed);
        }
      } catch (e) {
        console.error("Failed to parse feedback from localStorage", e);
      }
    }
  }, []);

  // State değiştiğinde localStorage'e kaydetmek için
  useEffect(() => {
    localStorage.setItem('feedback', JSON.stringify(feedback));
  }, [feedback]);

  // Toplam Geri Bildirimi hesaplamak için
  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
  // Pozitif Yüzde Hesaplamak için
  const positivePercentage =
    totalFeedback > 0 ? Math.round((feedback.good / totalFeedback) * 100) : 0;

  // Geri Bildirimi Güncelle
  const updateFeedback = (type) => {
    setFeedback((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  };

  // Geri Bildirimi Sıfırla
  const resetFeedback = () => {
    setFeedback({ good: 0, neutral: 0, bad: 0 });
  };

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Sip Happens Café</h1>
      <Description />
      <Options
        onFeedback={updateFeedback}
        onReset={resetFeedback}
        showReset={totalFeedback > 0}
      />
      {totalFeedback > 0 ? (
        <Feedback
          good={feedback.good}
          neutral={feedback.neutral}
          bad={feedback.bad}
          total={totalFeedback}
          positive={positivePercentage}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
};

export default App;
