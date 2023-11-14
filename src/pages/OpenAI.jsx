import { useState } from "react";
import OpenAI from "openai";

const ChatbotApp = () => {
  // const configuration = new Configuration({
  //   apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  // });
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });
  // const openai = new OpenAIApi(configuration);
  const [prompt, setPrompt] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await openai.chat.completions.create({
        messages: [{ role: "system", content: prompt }],
        model: "gpt-3.5-turbo",
      });
      //console.log("response", result.data.choices[0].text);
      console.log('result', result)
      setApiResponse(result.choices[0].message.content);
    } catch (e) {
      //console.log(e);
      setApiResponse("Something is going wrong, Please try again.");
    }
    setLoading(false);
  };

  console.log('apiResponse', apiResponse)
  return (
    <>
      <div
        style={{
          marginTop: "100px",
          height: "100vh",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{ width: "400px", margin: "auto", marginTop: "100px" }}
        >
          <div>
            <textarea
              style={{ width: "400px" }}
              type="text"
              value={prompt}
              placeholder="Please ask to openai"
              onChange={(e) => setPrompt(e.target.value)}
              rows={5}
            ></textarea>
          </div>
          <div>
            <button disabled={loading || prompt.length === 0} type="submit">
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>
        </form>
      </div>
      {apiResponse && (
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
      )}
    </>
  );
};

export default ChatbotApp;
