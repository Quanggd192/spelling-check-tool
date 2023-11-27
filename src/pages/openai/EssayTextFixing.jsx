import { useState } from "react";
import Navbar from "../../components/Navbar";
import sendMessIcon from "../../assets/icons/send.png";
import ReactLoading from "react-loading";

const prePrompt =
  "Suppose you are a university lecturer and are editing an essay for student, please help to edit it in a better and more optimal way if possible, and return the result.";
const prePromptFindErrors =
  "Suppose you are a university lecturer and are editing an essay for student, please help to find and list down all spelling and grammarly erros.";

const EssayTextFixing = (props) => {
  const { openai } = props;
  const [textInput, setTextInput] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [otherVersion, setOtherVersion] = useState("");
  const handleSubmit = async (_prePrompt = prePromptFindErrors) => {
    setLoading(true);
    try {
      const prompt = `${_prePrompt}: ${textInput}`;
      const result = await openai.chat.completions.create({
        messages: [{ role: "system", content: prompt }],
        model: "gpt-4",
        // response_format: { type: "json_object" },
      });
      console.log(
        "(_prePrompt === prePromptFindErrors)",
        _prePrompt === prePromptFindErrors
      );
      if (_prePrompt === prePromptFindErrors)
        setApiResponse(result.choices[0].message.content);
      else setOtherVersion(result.choices[0].message.content);
    } catch (e) {
      setApiResponse("Something is going wrong, Please try again.");
    }
    setLoading(false);
  };
  console.log("apiResponse", apiResponse);
  return (
    <>
      <Navbar />
      <div className="page-container">
        {loading && (
          <div className="chatbox-container loading-container">
            <ReactLoading
              type={"spin"}
              color={"#1ab5c9"}
              height={"64px"}
              width={"64px"}
            />
          </div>
        )}
        <div className="chatbox-container">
          <div className="input-box">
            <div>
              <textarea
                className="input-text"
                style={{ width: "100%" }}
                type="text"
                value={textInput}
                placeholder="Enter essay"
                onChange={(e) => setTextInput(e.target.value)}
                rows={4}
              ></textarea>
            </div>
            <div className="send-mess-btn-group">
              <img
                alt=""
                className="send-mess-icon"
                src={sendMessIcon}
                onClick={() => handleSubmit(prePromptFindErrors)}
              />
            </div>
          </div>
          <div className="answer-container">
            <div>
              {apiResponse && (
                <div>
                  <strong>Essays: </strong>
                  <br />
                  {textInput}
                  <pre
                    style={{
                      whiteSpace: "initial",
                    }}
                  >
                    <strong>Errors:</strong>
                    {apiResponse}
                  </pre>
                </div>
              )}
              {apiResponse && (
                <button
                  className="action-button"
                  onClick={() => handleSubmit(prePrompt)}
                >
                  Get another version
                </button>
              )}
              {otherVersion && (
                <div>
                  <br />
                  <pre
                    style={{
                      whiteSpace: "initial",
                    }}
                  >
                    <strong>Other version:</strong>
                    {otherVersion}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EssayTextFixing;
