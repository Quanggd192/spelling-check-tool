import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import sendMessIcon from "../../assets/icons/send.png";
import sendImageIcon from "../../assets/icons/image.png";
import ReactLoading from "react-loading";
import { Uploader } from "uploader"; // Installed by "react-uploader".
import { UploadDropzone } from "react-uploader";
import Modal from "react-modal";

const uploader = Uploader({
  apiKey: "free", // Get production API keys from Bytescale
});
const options = { multi: true };
const prePrompt =
  "Suppose you are a university lecturer and are editing an essay for student, please help to edit it in a better and more optimal way if possible, and return the result.";
const prePromptFindErrors =
  "Suppose you are a university lecturer and are editing an essay for student, please help to find and list down all spelling and grammarly erros.";

export default function EssayImageFixing(props) {
  const { openai } = props;
  const [apiResponse, setApiResponse] = useState(null);
  const [essay, setEssay] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [otherVersion, setOtherVersion] = useState("");
  const [listErrors, setListErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const customStyles = {
    content: {
      width: "100%",
      maxWidth: "550px",
      margin: "auto",
    },
  };
  const afterOpenModal = () => {};
  const closeModal = () => setModalIsOpen(false);
  const handleSubmit = async (image = imageUrl) => {
    setLoading(true);
    const result = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "This is an image of a handwritten essay. give me the text from it",
            },
            {
              type: "image_url",
              image_url: {
                url: image,
              },
            },
          ],
          // max_token: 1000,
        },
      ],
      model: "gpt-4-vision-preview",
      max_tokens: 1500,
    });
    setApiResponse(result.choices[0]?.message?.content);
    setLoading(false);
  };
  const handleGetOtherEssayVersion = async (_prePrompt) => {
    setLoading(true);
    try {
      const prompt = `${_prePrompt}: ${apiResponse}`;
      const result = await openai.chat.completions.create({
        messages: [{ role: "system", content: prompt }],
        model: "gpt-4",
        // response_format: { type: "json_object" },
      });
      if (_prePrompt === prePrompt)
        setOtherVersion(result.choices[0].message.content);
      else setListErrors(result.choices[0].message.content);
    } catch (e) {
      setOtherVersion("Something is going wrong, Please try again.");
    }
    setLoading(false);
  };

  const handleUploadImage = (files) => {
    setApiResponse("");
    setListErrors("");
    setOtherVersion("");
    setModalIsOpen(false);
    setLoading(true);
    console.log("files", files);
    handleSubmit(files[0].fileUrl);
  };
  return (
    <>
      <Navbar />
      <div className="page-container">
        {loading && (
          <div className="chatbox-container loading-container">
            <ReactLoading
              type={"balls"}
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
                value={imageUrl}
                placeholder="Enter image url or upload from your computer"
                onChange={(e) => setImageUrl(e.target.value)}
                rows={4}
              ></textarea>
            </div>
            <div className="send-mess-btn-group">
              <img
                alt=""
                className="send-mess-icon"
                src={sendImageIcon}
                onClick={() => setModalIsOpen(true)}
              />
              <img
                alt=""
                className="send-mess-icon"
                src={sendMessIcon}
                onClick={() => handleSubmit(imageUrl)}
              />
            </div>
          </div>
          <div className="answer-container">
            <div>
              {apiResponse && (
                <div>
                  <button
                    className="action-button"
                    onClick={() => handleGetOtherEssayVersion(prePrompt)}
                  >
                    Get an other version
                  </button>
                  &nbsp;
                  <button
                    className="action-button"
                    onClick={() =>
                      handleGetOtherEssayVersion(prePromptFindErrors)
                    }
                  >
                    Find errors
                  </button>
                </div>
              )}
            </div>
            {essay}
            <div>
              {apiResponse && (
                <div>
                  <pre
                    style={{
                      whiteSpace: "initial",
                    }}
                  >
                    <strong>Essay:</strong>
                    {apiResponse}
                  </pre>
                </div>
              )}
              <br />
              {otherVersion && (
                <div>
                  <pre
                    style={{
                      whiteSpace: "initial",
                    }}
                  >
                    <strong>An other version:</strong>
                    {otherVersion}
                  </pre>
                </div>
              )}
              <br />
              {listErrors && (
                <div>
                  <pre
                    style={{
                      whiteSpace: "initial",
                    }}
                  >
                    <strong>Errors:</strong>
                    {listErrors}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="image Modal"
        >
          <h2>Input image</h2>
          <div className="flex">
            <UploadDropzone
              uploader={uploader}
              options={options}
              onUpdate={(files) => handleUploadImage(files)}
              width="600px"
              height="375px"
            />
          </div>
        </Modal>
      </div>
    </>
  );
}
