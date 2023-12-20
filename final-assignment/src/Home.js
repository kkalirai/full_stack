import React, { useEffect } from "react";

function Home() {


  useEffect(() => {
    
    
  
    return () => {
      
    }
  }, [third])
  


  const surveyData = [
    {
      _id: { $oid: "65832664a5559f834b18e917" },
      title: "testing",
      ownerName: "test",
      ownerID: "65831de45dfd3ae25bf05c66",
      agreeDisagree: ["rkjrlkj", "fasdasdf"],
      shortAnswer: ["wTF"],
      response: [],
      __v: { $numberInt: "0" },
    },
  ];
  return (
    <div className="mainContainer">
      <div className="login-container">
        <a href="/user/login">Login</a>
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
      {surveyData?.map((survey) => (
        <div className="surveyContainer" key={survey._id}>
          <h2>{survey.title}</h2>
          <form action={`/submit-response/${survey._id}`} method="post">
            <label htmlFor="name">Your Name:</label>
            <input type="text" id="name" name="name" required />
            <br />
            <br />
            <label htmlFor="email">Your Email (optional):</label>
            <input type="email" id="email" name="email" />

            <h3>Survey Questions:</h3>

            {/* Rendering Agree/Disagree questions */}
            {survey.agreeDisagree.map((question, index) => (
              <div key={index}>
                <p>{question}</p>
                <label
                  htmlFor={`question${index + 1}-agree`}
                  style={{ display: "inline-block" }}
                >
                  Agree
                </label>
                <input
                  type="radio"
                  required
                  id={`question${index + 1}-agree`}
                  name={`question${index + 1}`}
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
                  id={`question${index + 1}-disagree`}
                  name={`question${index + 1}`}
                  value="disagree"
                  style={{ display: "inline-block" }}
                />
              </div>
            ))}

            {/* Rendering Short Answer questions */}
            {survey.shortAnswer.map((question, index) => (
              <div key={index}>
                <p>{question}</p>
                <textarea
                  name="suggestions"
                  id={`suggestions-${index}`}
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
