function Input({ id, label, name, value, onChange, type }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <div className="field">
        <input
          id={id}
          type={type}
          name={name}
          className="form-control"
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
export default Input;
