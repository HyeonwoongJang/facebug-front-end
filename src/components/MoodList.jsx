import React from "react";
import "../styles/moodList.css";

const MoodList = ({ keys, values }) => {
  const numberArr = [0, 20, 40, 60, 80, 100];

  return (
    <section>
      <div className="mood-wrap">
        <div>
          <p className="list"></p>
          {keys.map((mood, idx) => {
            return (
              <div className="keys" key={idx}>
                {mood}
              </div>
            );
          })}
        </div>
        <div className="graph-container">
          <div className="graph-container_number">
            {numberArr.map((num, idx) => {
              return <span key={idx}>{num}</span>;
            })}
          </div>
          {values.map((num, idx) => {
            return (
              <div
                className="bar"
                style={{
                  width: `${num * 2.9}px`,
                  height: "25px",
                  background: "#2e52a0",
                }}
                key={idx}
              ></div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MoodList;
