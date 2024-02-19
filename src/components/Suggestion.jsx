import React from "react";

const Suggestion = ({ data ,handleclick}) => {
  return (
    <>
      <ul>
        {data && data.length
          ? data.map((item, index) => <li onClick={handleclick} key={index}>{item}</li>)
          : null}
      </ul>
    </>
  );
};

export default Suggestion;
