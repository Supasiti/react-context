import { useState } from "react";
import "./App.css";
import Display from "./Display";
import Form from "./Form";

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <div className="App stack container">
      <Form
        firstName={firstName}
        setFirstName={(newName) => setFirstName(newName)}
        lastName={lastName}
        setLastName={(newName) => setLastName(newName)}
      />
      <Display firstName={firstName} lastName={lastName} />
    </div>
  );
}

export default App;
