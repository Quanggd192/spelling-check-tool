import React, { useState } from "react";

export default function ErrorComponent(props) {
  const { bad, better, type } = props.error;
  const [isShowBetter, setIsShowBetter] = useState(false);

  return (
    <div>
      <div
        style={{
          fontWeight: "bold",
          fontStyle: "italic",
          color: type === "grammar" ? "#ff0000" : "#59a7ff",
        }}
        onClick={() => setIsShowBetter(!isShowBetter)}
      >
        {bad}
      </div>
      <div
        style={{
          display: isShowBetter ? "block" : "none",
        }}
      >
        {(better || []).map((item, index) => (
          <span
            key={`better-${index}`}
            onClick={() => props.onClickBetter(props.error, item)}
            style={{
              display: "inline-block",
              paddingRight: "20px",
              fontWeight: "bold",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
