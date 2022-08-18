import React from "react";

function Day(props) {
  return (
    <div className="Day-header">
      <h1>
        {props.month} {props.day}
      </h1>
    </div>
  );
}

export default Day;
