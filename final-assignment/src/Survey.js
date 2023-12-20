import React, { useState } from "react";

const SurveyForm = () => {
  const maxAgreeDisagreeQuestions = 10;
  const maxShortAnswerQuestions = 10;

  const [agreeDisagreeCount, setAgreeDisagreeCount] = useState(1);
  const [shortAnswerCount, setShortAnswerCount] = useState(1);

  const addAgreeDisagreeQuestion = () => {
    if (agreeDisagreeCount > 10) {
      alert("Reached maximum limit of Agree/Disagree questions!");
      return;
    }

    setAgreeDisagreeCount(agreeDisagreeCount + 1);
  };

  const addShortAnswerQuestion = () => {
    if (shortAnswerCount > 10) {
      alert("Reached maximum limit of Short Answer questions!");
      return;
    }

    setShortAnswerCount(shortAnswerCount + 1);
  };

  return (
    <div
      className="container"
      style={{
        maxWidth: "700px",
        margin: "0 auto",
        padding: "40px",
        backgroundColor: "#d9d4d4",
        marginTop: "50px",
        borderRadius: "10px",
      }}
    >
      <h2>Create a New Survey</h2>
      <p>
        You can Add Agree/Disagree and Short Answer Type Question in your survey
      </p>
      <form action="/user/create-survey" method="post">
        <label
          htmlFor="survey-title"
          style={{ display: "block", marginBottom: "5px" }}
        >
          Survey Title:
        </label>
        <input
          type="text"
          id="survey-title"
          name="survey_title"
          required
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "3px",
          }}
        />
        <br />
        <br />

        <div className="question-types">
          <h3>Agree/Disagree Questions</h3>
          <div className="questions-container agreeDisagree">
            {[...Array(agreeDisagreeCount)].map((_, index) => (
              <div className={`question agreeDisagree${index + 1}`} key={index}>
                <label
                  htmlFor={`agreeDisagree${index + 1}`}
                  style={{ marginRight: "10px", fontWeight: "bold" }}
                >
                  Question {index + 1}
                </label>
                <input
                  type="text"
                  id={`agreeDisagree${index + 1}`}
                  name="agreeDisagree"
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "3px",
                  }}
                />
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addAgreeDisagreeQuestion}
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "3px",
              cursor: "pointer",
              backgroundColor: "#007bff",
              color: "#fff",
            }}
          >
            Add Agree/Disagree Question
          </button>

          <h3>Short Answer Questions</h3>
          <div className="questions-container shortAnswer">
            {[...Array(shortAnswerCount)].map((_, index) => (
              <div className={`question shortAnswer${index + 1}`} key={index}>
                <label
                  htmlFor={`shortAnswer${index + 1}`}
                  style={{ marginRight: "10px", fontWeight: "bold" }}
                >
                  Question {index + 1}
                </label>
                <input
                  type="text"
                  id={`shortAnswer${index + 1}`}
                  name="shortAnswer"
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "3px",
                  }}
                />
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addShortAnswerQuestion}
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "3px",
              cursor: "pointer",
              backgroundColor: "#007bff",
              color: "#fff",
            }}
          >
            Add Short Answer Question
          </button>
        </div>

        <br />
        <br />
        <button
          type="submit"
          id="submitBtn"
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "3px",
            cursor: "pointer",
            backgroundColor: "#007bff",
            color: "#fff",
          }}
        >
          Create Survey
        </button>
      </form>
    </div>
  );
};

export default SurveyForm;
