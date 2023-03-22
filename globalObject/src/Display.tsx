import { FullNameKey, fullNameStore } from "./store";

function Display() {
  return (
    <div className="container stack">
      <Info label="First name" name="firstName" />
      <Info label="Last name" name="lastName" />
    </div>
  );
}

export default Display;

interface InfoProps {
  label: string;
  name: FullNameKey;
}

function Info(props: InfoProps) {
  const value = fullNameStore.use((state) => state[props.name]);

  return (
    <div className="container grid">
      <div>{props.label}</div>
      <div>{value}</div>
    </div>
  );
}
