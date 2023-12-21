import React, { useEffect, useState } from "react";
import "./stlyles/Home.css";
import { Link } from "react-router-dom";
import { REACT_APP_BASE_URL } from "./constants";

function Home() {
  const [surveyData, setSurveyData] = useState([]);
  const getSurvey = async () => {
    const res = await fetch(REACT_APP_BASE_URL + "/survey");
    const survey = await res.json();
    setSurveyData(survey);
  };
  useEffect(() => {
    getSurvey();
  }, []);
  const handleSurveySubmit = async (event, surveyID, index) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    // Extract data from the form
    const surveyResponses = {};

    formData.forEach((value, name) => {
      console.log(name, value);
      if (name.startsWith("agree")) {
        surveyResponses["agreeDisagree"]?.push(value);
      } else if (name.startsWith("shortQuestion")) {
        surveyResponses["shortAnswer"]?.push(value);
      } else {
        surveyResponses[name] = value;
      }
    });
    console.log("formData", surveyResponses);

    // // Call the submitSurvey function with the survey ID and user responses
    await submitSurvey(surveyID, surveyResponses, index);
  };
  const submitSurvey = async (surveyID, formData, index) => {
    try {
      const res = await fetch(
        `http://localhost:3000/submit-response/${surveyID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (res.ok) {
        console.log("Survey submitted successfully");
        alert("Survey submitted successfully");
        document.getElementById("myForm" + index).reset();
      } else {
        console.error("Failed to submit survey");
      }
    } catch (error) {
      console.error("Error submitting survey:", error);
    }
  };
  return (
    <div className="mainContainer">
      <div className="login-container">
        <Link to="/user/create-survey">Create Survey</Link>
      </div>
      <div className="login-container">
        <Link to="/user/dashboard">Dashboard</Link>
      </div>

      <h1 style={{ textAlign: "center" }}>SURVEY SITE</h1>

      <div className="surveyContainer">
        <h2>Survey Title: You can fill the form like this on various topics</h2>
        <form action="submit-survey.php" method="post">
          <label htmlFor="name">Your Name:</label>
          <input type="text" id="name" name="name" disabled required />
          <br />
          <br />
          <label htmlFor="email">Your Email (optional):</label>
          <input type="email" id="email" disabled name="email" />

          <h3>Survey Questions:</h3>

          <p>How often do you use this website?</p>
          <label htmlFor="use-often" style={{ display: "inline-block" }}>
            Agree
          </label>
          <input
            type="radio"
            id="use-often"
            disabled
            name="usage"
            value="often"
            style={{ display: "inline-block" }}
          />

          <label htmlFor="use-sometimes" style={{ display: "inline-block" }}>
            Disagree
          </label>
          <input
            type="radio"
            id="use-sometimes"
            disabled
            name="usage"
            value="sometimes"
            style={{ display: "inline-block" }}
          />

          <p>What could be improved on this website?</p>
          <textarea
            name="suggestions"
            id="suggestions"
            disabled
            cols="50"
            rows="3"
          />

          <button type="submit" disabled>
            Submit Survey
          </button>
        </form>
      </div>

      {/* Mapping over survey data */}
      {surveyData?.map((survey, index) => (
        <div className="surveyContainer" key={survey._id}>
          <h2>{survey.title}</h2>
          <form
            id={"myForm" + index}
            onSubmit={(e) => handleSurveySubmit(e, survey._id, index)}
          >
            <label htmlFor="name">Your Name:</label>
            <input type="text" id="name" name="name" required />
            <br />
            <br />
            <label htmlFor="email">Your Email (optional):</label>
            <input type="email" id="email" name="email" />

            <h3>Survey Questions:</h3>

            {/* Rendering Agree/Disagree questions */}
            {survey?.agreeDisagree?.map((question, index) => (
              <div key={index}>
                <p>{question?.question}</p>
                <label
                  htmlFor={`question${index + 1}-agree`}
                  style={{ display: "inline-block" }}
                >
                  Agree
                </label>
                <input
                  type="radio"
                  required
                  id={`agree${index + 1}-agree`}
                  name={`agree${index + 1}`}
                  value="agree"
                  style={{ display: "inline-block" }}
                />
                <label
                  htmlFor={`question${index + 1}-disagree`}
                  style={{ display: "inline-block" }}
                >
                  Disagree
                </label>
                <input
                  type="radio"
                  required
                  id={`agree${index + 1}-disagree`}
                  name={`agree${index + 1}`}
                  value="disagree"
                  style={{ display: "inline-block" }}
                />
              </div>
            ))}

            {/* Rendering Short Answer questions */}
            {survey?.shortAnswer?.map((question, index) => (
              <div key={index}>
                <p>{question?.question}</p>
                <textarea
                  name={`shortQuestion-${index}`}
                  id={`shortQuestion-${index}`}
                  cols="50"
                  rows="3"
                  required
                />
              </div>
            ))}

            <button type="submit">Submit Survey</button>
          </form>
        </div>
      ))}
    </div>
  );
}

export default Home;
