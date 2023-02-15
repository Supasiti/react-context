import "./App.css";
import { Provider, useStore } from "./store";
// import { useStore } from "./store";

interface InputProps {
  name: string;
  label: string;
}

function Input(props: InputProps) {
  const { name, label } = props;
  const [value, handleChange] = useStore();

  return (
    <label htmlFor={name} className="container">
      <span className="label">{label}</span>
      <input
        name={name}
        id={name}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      />
    </label>
  );
}

function Form() {
  return (
    <div className="container stack">
      <div>Form</div>
      <Input name="name" label="Name" />
    </div>
  );
}

function Display() {
  const [value] = useStore();
  return (
    <div className="container stack">
      <div>Display</div>
      <div>{value}</div>
    </div>
  );
}

function App() {
  return (
    <Provider>
      <div className="App stack container">
        <div>App</div>
        <Form />
        <Display />
      </div>
    </Provider>
  );
}

export default App;
