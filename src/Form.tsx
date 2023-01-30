interface FormProps {
  firstName: string;
  lastName: string;
  setFirstName: (name: string) => void;
  setLastName: (name: string) => void;
}

function Form(props: FormProps) {
  const { firstName, lastName, setFirstName, setLastName } = props;

  return (
    <div className="container stack">
      <Input
        name="firstName"
        label="First name"
        value={firstName}
        onChange={setFirstName}
      />
      <Input
        name="lastName"
        label="Last name"
        value={lastName}
        onChange={setLastName}
      />
    </div>
  );
}

export default Form;

interface InputProps {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}

function Input(props: InputProps) {
  const { name, label, value, onChange } = props;
  return (
    <label htmlFor={name} className="container">
      <span className="label">{label}</span>
      <input
        name={name}
        id={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
