import React, { useState } from "react";
import * as textgears from "textgears-api";
import ErrorComponent from "./ErrorComponent";

export default function TextGears() {
  const [text, setText] = useState("I is a engineer");
  const [errors, setErrors] = useState([]);
  const textgearsApi = textgears("eq4WTGYk9Am7sHLx", {
    language: "en-US",
    ai: false,
  });

  const handleCheck = () => {
    textgearsApi
      .checkGrammar(text)
      .then((data) => {
        console.log("data", data);
        for (const error of data.response.errors) {
          console.log(
            "Error: %s. Suggestions: %s",
            error.bad,
            error.better.join(", ")
          );
        }
        setErrors(data.response.errors);
      })
      .catch((err) => {});
  };

  const onClickBetter = (error, better) => {
    const result = text.replace(" " + error.bad + " ", ` ${better} `)
    setText(result);
  };
  const buttonStyle = {
    background: "#59a7ff",
    width: '120px',
    height: '40px',
    lineHeight: '40px',
    border: 'none',
    color: '#FFF',
    borderRadius: '8px'
  }
  return (
    <div
      style={{
        width: "500px",
        margin: "100px auto",
      }}
    >
      <div>Input your text</div>
      <textarea
        style={{ width: "500px", padding: '10px', borderRadius: '5px' }}
        value={text}
        rows={5}
        onChange={(event) => {
          setText(event.target.value);
        }}
      />
      <button style={buttonStyle} onClick={handleCheck}>Check</button>
      <div style={{ marginTop: "40px" }}>
      <div>Errors: </div>
        {errors.map((item, index) => (
          <ErrorComponent
            key={`error-${index}`}
            error={item}
            onClickBetter={onClickBetter}
          />
        ))}
      </div>
    </div>
  );
}
