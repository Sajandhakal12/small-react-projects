import React, { useState } from "react";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [validations, setValidations] = useState([]);
  const [strength, setStrenght] = useState(null);

  const handleChange = (e) => {
    setPassword(e.target.value);
    checkStrength(e.target.value);
  };

  const checkStrength = (str) => {
    let validations = [];
    const password = str;
    validations = [
      password.length > 6,
      password.search(/[A-Z]/) > -1,
      password.search(/[0-9]/) > -1,
      password.search(/[$&+,:;=?@#]/) > -1,
    ];
    const tempstrength = validations.reduce((acc, cur) => acc + cur, 0);
    setValidations(validations);
    setStrenght(tempstrength);
  };
  return (
    <div className='App'>
      <ul style={{ listStyle: "none" }}>
        <li>
          [{validations[0] ? "✔️" : "❌"}] A password should be atleast 6
          letters
        </li>
        <li>
          [{validations[1] ? "✔️" : "❌"}] A password mush contain a capital
          letter
        </li>
        <li>
          [{validations[2] ? "✔️" : "❌"}] A password should contain a number
        </li>
        <li>
          [{validations[3] ? "✔️" : "❌"}] A password must contain a special
          symbol
        </li>
      </ul>
      <form>
        <input
          type='password'
          value={password}
          onChange={(e) => handleChange(e)}
        />
      </form>
      {strength > 3 ? "strong" : "Not strong enough"}
      <br />
      Note: Strong password are generally longer password
    </div>
  );
}

export default App;
