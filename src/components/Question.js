import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    // This function decrements the time and handles the expiration logic
    function handleTimer() {
      if (timeRemaining === 1) {
        onAnswered(false);  // Call onAnswered with false because the time is up
        setTimeRemaining(10);  // Optionally reset the timeRemaining for a new question
      } else {
        setTimeRemaining(timeRemaining - 1);
      }
    }

    const timerId = setTimeout(handleTimer, 1000);

    // Clear the timeout when the component unmounts or the question changes
    return () => clearTimeout(timerId);
  }, [timeRemaining, question, onAnswered]);

  const { id, prompt, answers, correctIndex } = question;

  function handleAnswer(isCorrect) {
    clearTimeout(timerId); // This won't work directly due to scope; you'll need to manage state or ref
    setTimeRemaining(10); // Reset the timer for the next question
    onAnswered(isCorrect);
  }

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => (
        <button key={answer} onClick={() => handleAnswer(index === correctIndex)}>
          {answer}
        </button>
      ))}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
