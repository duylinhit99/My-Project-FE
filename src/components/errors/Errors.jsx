function Errors(props) {
  const { errors } = props;

  if (!errors && Object.keys(errors).length === 0) return null;

  return (
    <ul style={{ color: 'red', paddingLeft: 20 }}>
      {Object.entries(errors).map(([key, msg], i) => (
        <li key={i}>{msg}</li>
      ))}
    </ul>
  );
}

export default Errors;
