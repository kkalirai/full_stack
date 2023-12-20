import React, { useState } from 'react';

function Survey() {
  const maxAgreeDisagreeQuestions = 10;
  const maxShortAnswerQuestions = 10;

  const [agreeDisagreeCount, setAgreeDisagreeCount] = useState(2);
  const [shortAnswerCount, setShortAnswerCount] = useState(2);

  const addAgreeDisagreeQuestion = () => {
    if (agreeDisagreeCount > 10) {
      alert('Reached maximum limit of Agree/Disagree questions!');
      return;
    }

    setAgreeDisagreeCount(prevCount => prevCount + 1);
  };

  const addShortAnswerQuestion = () => {
    if (shortAnswerCount > 10) {
      alert('Reached maximum limit of Short Answer questions!');
      return;
    }

    setShortAnswerCount(prevCount => prevCount + 1);
  };

  return (
    <div className="container">
      <h2>Create a New Survey</h2>
      <p>You can Add Agree/Disagree and Short Answer Type Question in your survey</p>
      <form action="/user/create-survey" method="post">
        <label htmlFor="survey-title">Survey Title:</label>
        <input type="text" id="survey-title" name="survey_title" required />
        <br /><br />

        <div className="question-types">
          <h3>Agree/Disagree Questions</h3>
          <div className="questions-container agreeDisagree">
            {[...Array(agreeDisagreeCount)].map((_, index) => (
              <div className="question" key={`agreeDisagree${index + 1}`}>
                <label htmlFor={`agreeDisagree${index + 1}`}>Question {index + 1}:</label>
                <input type="text" id={`agreeDisagree${index + 1}`} name="agreeDisagree" required />
              </div>
            ))}
          </div>
          <button type="button" onClick={addAgreeDisagreeQuestion} disabled={agreeDisagreeCount >= maxAgreeDisagreeQuestions}>
            Add Agree/Disagree Question
          </button>

          <h3>Short Answer Questions</h3>
          <div className="questions-container shortAnswer">
            {[...Array(shortAnswerCount)].map((_, index) => (
              <div className="question" key={`shortAnswer${index + 1}`}>
                <label htmlFor={`shortAnswer${index + 1}`}>Question {index + 1}:</label>
                <input type="text" id={`shortAnswer${index + 1}`} name="shortAnswer" required />
              </div>
            ))}
          </div>
          <button type="button" onClick={addShortAnswerQuestion} disabled={shortAnswerCount >= maxShortAnswerQuestions}>
            Add Short Answer Question
          </button>
        </div>

        <br /><br />
        <button type="submit">Create Survey</button>
      </form>
    </div>
  );
}

export default Survey;
