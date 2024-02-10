import viteLogo from "/vite.svg";
import "./App.css";
import Persons from "./Persons";
import { PersonForm } from "./PersonForm";
import { usePersons } from "./persons/custom-hooks";
import { useState } from "react";
import Notify from "./Notify";
import { PhoneForm } from "./PhoneForm";

function App() {
  /* useEffect(() => {
    fetch("http://localhost:4000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
        query {
          allPersons {name}
        }
      `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res.data);
      });
  }, []); */
  const { data, loading, error } = usePersons();
  const [erroMessage, SetErrorMessage] = useState(null);

  if (error) return <span style={{ color: "red" }}>{error}</span>;

  const notifyError = (message) => {
    SetErrorMessage(message);
    setTimeout(() => SetErrorMessage(null), 5000);
  };

  return (
    <div>
      <Notify errorMessage={erroMessage} />
      <header>
        <img src={viteLogo} className="logo" alt="Vite logo" />
        {loading ? <p>Loading...</p> : <Persons persons={data.allPersons} />}
      </header>
      <PhoneForm notifyError={notifyError} />
      <PersonForm notifyError={notifyError} />
    </div>
  );
}

export default App;
