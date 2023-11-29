import React, { useState } from "react";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import useOpenai from "./openaiHook";
import ReactLoading from "react-loading";
import Uploader from "../../components/Uploader";

export default function CompoundPage(props) {
  const { openai } = props;
  const {
    loading,
    handleSubmitText,
    handleSubmitImage,
    apiResponse,
    apiResponseImage,
    imageEssay,
  } = useOpenai(openai);
  const [activeTab, setActiveTab] = useState("text");
  const [essay, setEssay] = useState("");

  const onInputChange = (text) => {
    setEssay(text);
  };

  const handleCheck = () => {
    handleSubmitText(essay);
  };
  const handleUploadImage = (file) => {
    handleSubmitImage(file, "image");
  };
  console.log("apiResponseImage", apiResponseImage);
  return (
    <div>
      <Navbar />
      <div className="content-container">
        <Header active={activeTab} setActiveTab={setActiveTab} />
        <div className="essay-content-boxes">
          {activeTab === "text" && (
            <textarea
              className="essay-content-box essay-inbox"
              placeholder={
                activeTab === "text" ? "Insert text" : "Insert image url"
              }
              value={essay}
              onChange={(event) => onInputChange(event.target.value)}
            ></textarea>
          )}
          {activeTab === "image" && (
            <div className="essay-content-box">
              <Uploader onUploadImage={(file) => handleUploadImage(file)} />
              <br />
              {imageEssay}
            </div>
          )}
          <div className="essay-content-box">
            {((activeTab === "text" && !apiResponse) ||
              (activeTab === "image" && !apiResponseImage)) &&
              !loading && <div>Errors will be shown here...</div>}
            {loading && (
              <div className="loading-container-1">
                <ReactLoading
                  type={"spin"}
                  color={"#1ab5c9"}
                  height={"64px"}
                  width={"64px"}
                />
              </div>
            )}
            {!loading && apiResponse && activeTab === "text" && (
              <div
                contentEditable="true"
                dangerouslySetInnerHTML={{
                  __html: apiResponse.replaceAll("\n", "<br/>"),
                }}
              ></div>
            )}
            {!loading && activeTab === "image" && (
              <div
                contentEditable="true"
                dangerouslySetInnerHTML={{
                  __html: apiResponseImage.replaceAll("\n", "<br/>"),
                }}
              ></div>
            )}
          </div>
        </div>
        <div className="footer">
          {activeTab === "text" && (
            <button className="action-button" onClick={handleCheck}>
              Check
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
