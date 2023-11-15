import { useState } from "react";
import OpenAI from "openai";

const prePrompt =
  "Suppose you are a university lecturer and are editing a list of articles for students in the following array, please help me edit it in a better and more optimal way if possible.";
const ChatbotApp = () => {
  // const configuration = new Configuration({
  //   apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  // });
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });
  console.log(
    "process.env.REACT_APP_OPENAI_API_KEY",
    process.env.REACT_APP_OPENAI_API_KEY
  );
  // const openai = new OpenAIApi(configuration);
  const [textInput, setTextInput] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [listEssays, setListEssays] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log("listEssays", listEssays);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const prompt = `${prePrompt} ${listEssays}`;
      const result = await openai.chat.completions.create({
        messages: [{ role: "system", content: prompt }],
        model: "gpt-3.5-turbo",
      });
      //console.log("response", result.data.choices[0].text);
      console.log("result", result);
      setApiResponse(result.choices[0].message.content);
    } catch (e) {
      //console.log(e);
      setApiResponse("Something is going wrong, Please try again.");
    }
    setLoading(false);
  };

  const onAddEssay = () => {
    const newListEssays = [...listEssays];
    newListEssays.push(textInput);
    console.log("newListEssays", newListEssays);
    setListEssays(newListEssays);
    setTextInput("");
  };
  console.log("apiResponse", apiResponse);
  return (
    <>
      <div
        style={{
          margin: "auto",
          paddingTop: "100px",
          height: "100vh",
          width: "400px",
        }}
      >
        <div>
          <div>
            <textarea
              style={{ width: "400px" }}
              type="text"
              value={textInput}
              placeholder="Please ask to openai"
              onChange={(e) => setTextInput(e.target.value)}
              rows={5}
            ></textarea>
          </div>
          <div>
            {/* <button disabled={loading || prompt.length === 0} type="submit">
              {loading ? "Generating..." : "Generate"}
            </button> */}
            <button onClick={onAddEssay}>Add Essay</button>
            <br />
            <button
              disabled={loading || listEssays.length === 0}
              onClick={handleSubmit}
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>
        </div>
        <br />
        <br />
        <br />
        <div>
          <label>List Essays: </label>
          {listEssays.map((item, index) => (
            <div key={`essay-${index}`}>
              <br />
              {item}
            </div>
          ))}
        </div>
      </div>
      {/* {apiResponse && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <pre>
            <strong>API response:</strong>
            {apiResponse}
          </pre>
        </div>
      )} */}
    </>
  );
};

export default ChatbotApp;
