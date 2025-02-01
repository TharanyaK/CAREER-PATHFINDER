import React from "react";

function Loader() {
  return (
    <div className="loader-parent">
      <div className="spinner-border text-info" role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  );
}

export default Loader;
