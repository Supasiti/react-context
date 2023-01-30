import "./App.css";
import Display from "./Display";
import Form from "./Form";
import { FullNameProvider } from "./store";

function App() {
  return (
    <FullNameProvider>
      <div className="App stack container">
        <Form />
        <Display />
      </div>
    </FullNameProvider>
  );
}

export default App;
