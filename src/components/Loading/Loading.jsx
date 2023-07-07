import React from "react";
import "./Loading.css";
function Loading() {
  return (
    // <div className="loading"></div>
    <div className="overlay">
      <div className="overlay__inner">
        <div className="overlay__content">
          <span className="spinner"></span>
        </div>
      </div>
    </div>
  );
}
export default Loading;
