import { FullNameKey, useFullNameStore } from "./store";

function Form() {
  return (
    <div className="container stack">
      <Input name="firstName" label="First name" />
      <Input name="lastName" label="Last name" />
    </div>
  );
}

export default Form;

interface InputProps {
  name: FullNameKey;
  label: string;
}

function Input(props: InputProps) {
  const { name, label } = props;
  const store = useFullNameStore();

  return (
    <label htmlFor={name} className="container">
      <span className="label">{label}</span>
      <input
        name={name}
        id={name}
        value={store.fullName[name]}
        onChange={(e) => store.setFullName({ [name]: e.target.value })}
      />
    </label>
  );
}
