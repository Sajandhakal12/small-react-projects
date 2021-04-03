import React, { useState } from "react";
import { Check } from "./_helpers/helper";
import GaugeChart from "react-gauge-chart";
import { FaStethoscope } from "react-icons/fa";

function App() {
  const [metric, setMetric] = useState(false);
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const [heightft, setHeightft] = useState();
  const [heightIn, setHeightIn] = useState();

  const [age, setAge] = useState();
  const [bmi, setBmi] = useState(0);
  const [remark, setRemark] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (gender && age && weight) {
      let tempError = null;

      if (weight <= 0) {
        tempError.weight = "Weight must be greater than 0";
      }

      if (height <= 0) {
        tempError.height = "Height must be greater than 0";
      }

      if (age <= 0) {
        tempError.age = "Age must be greater than 0";
      }
      if (tempError) {
        return setError(tempError);
      } else {
        setError(null);
      }
      let calcHeight, calWeigth;
      if (!metric) {
        calcHeight = heightft + heightIn / 12; //changing into feet
        calcHeight = calcHeight * 0.3048; //changing into meter
        calWeigth = weight * 0.453592; //changing into kg from pound
      } else {
        calcHeight = height / 100;
        calWeigth = weight;
      }
      console.log(calcHeight, calWeigth);
      const bmiTemp = calWeigth / (calcHeight * calcHeight);

      if (!isNaN(bmiTemp) && bmiTemp !== Infinity) {
        setBmi(bmiTemp);
        if (Check(gender, age, bmiTemp) !== "noResult") {
          setRemark(Check(gender, age, bmiTemp));
        }
      }
    } else {
      setError({ general: "Select all the field" });
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-box">
          <form onSubmit={(e) => handleSubmit(e)}>
            <h1>BMI Calculator</h1>
            <div className="row">
              <div className="col-1-of-2">
                <p className="s-p field-name">System</p>
                <p className="s-p field-name">Gender</p>
                <p className="s-p field-name">
                  <label htmlFor="age">age</label>
                </p>
                <p className="s-p field-name">
                  <label htmlFor="weight">Weight({metric ? "kg" : "p"})</label>
                </p>
                <p className="s-p field-name">
                  <label htmlFor="height">
                    height({metric ? "cm" : "ft/in"})
                  </label>
                </p>
              </div>
              <div className="col-1-of-2">
                <div className="s-p">
                  <label htmlFor="metric">Metric</label>
                  <input
                    id="metric"
                    type="radio"
                    onChange={() => setMetric(true)}
                    checked={metric === true}
                  />
                  <label htmlFor="old">Old</label>
                  <input
                    id="old"
                    type="radio"
                    onChange={() => setMetric(false)}
                    checked={metric === false}
                  />
                </div>
                <div className="s-p">
                  <label htmlFor="male">Male</label>
                  <input
                    id="male"
                    type="radio"
                    value="male"
                    onChange={(e) => setGender(e.target.value)}
                    checked={gender === "male"}
                  />
                  <label htmlFor="female">female</label>
                  <input
                    id="female"
                    type="radio"
                    value="female"
                    onChange={(e) => setGender(e.target.value)}
                    checked={gender === "female"}
                  />
                </div>
                <div className="s-p">
                  <input
                    id="age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                  {error && error.age && <p>{error.age}</p>}
                </div>
                <div className="s-p">
                  <input
                    id="weight"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                  {error && error.weight && <p>{error.weight}</p>}
                </div>
                <div className="s-p">
                  {metric ? (
                    <input
                      id="height"
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                    />
                  ) : (
                    <div style={{ display: "flex" }}>
                      <div style={{ marginRigth: "1rem" }}>
                        <input
                          id="height"
                          type="number"
                          placeholder="feet"
                          value={heightft}
                          onChange={(e) => setHeightft(e.target.value)}
                        />
                      </div>
                      <div>
                        <input
                          style={{ width: "80%" }}
                          type="number"
                          placeholder="inch"
                          value={heightIn}
                          onChange={(e) => setHeightIn(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                  {error && error.height && <p>{error.height}</p>}
                </div>
              </div>
            </div>
            {error && error.general && <p>{error.general}</p>}
            <button
              className="btn-circle"
              style={{
                borderColor: `${
                  remark === "under weight" || remark === "over weight"
                    ? "red"
                    : "green"
                }`,
              }}
              type="submit"
            >
              <FaStethoscope size="24" color="green" />
            </button>
          </form>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: "50%",
          transform: "translate(-50%,0)",
          padding: "1rem",
          minWidth: "30rem",
        }}
      >
        {remark && (
          <p style={{ fontSize: "2rem", fontWeight: "bold" }}>
            You have {remark}.
          </p>
        )}
        <GaugeChart
          id="gauge-chart8"
          nrOfLevels={40}
          colors={["#5BE12C", "#F5CD19", "#EA4228"]}
          arcWidth={0.3}
          percent={bmi / 100}
          formatTextValue={(value) => value + " BMI"}
        />
      </div>
    </div>
  );
}

export default App;
