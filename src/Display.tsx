interface DisplayProps {
  firstName: string;
  lastName: string;
}

function Display(props: DisplayProps) {
  const { firstName, lastName } = props;
  return (
    <div className="container stack">
      <Info label="First name" value={firstName} />
      <Info label="Last name" value={lastName} />
    </div>
  );
}

export default Display;

interface InfoProps {
  label: string;
  value: string;
}

function Info(props: InfoProps) {
  return (
    <div className="container grid">
      <div>{props.label}</div>
      <div>{props.value}</div>
    </div>
  );
}
