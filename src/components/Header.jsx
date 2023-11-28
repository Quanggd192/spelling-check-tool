import React from "react";

export default function Header(props) {
  const { active, setActiveTab } = props;
  return (
    <div className="header">
      {/* <div className="header">Get instant feedback on your essay.</div> */}
      <div className="toggle-group">
        <div
          className={`toggle ${active === "text" ? "active-toggle" : ""}`}
          onClick={() => setActiveTab("text")}
        >
          Text
        </div>
        <div
          className={`toggle ${active === "image" ? "active-toggle" : ""}`}
          onClick={() => setActiveTab("image")}
        >
          Image
        </div>
      </div>
    </div>
  );
}
