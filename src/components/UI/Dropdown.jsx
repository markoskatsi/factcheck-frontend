export const Dropdown = ({
  list,
  value,
  name,
  loadingMessage,
  handleChange,
  idField,
  labelField,
}) => {
  return !list ? (
    <p>{loadingMessage}</p>
  ) : list.length === 0 ? (
    <p>No dropdown options found</p>
  ) : (
    <select
      className="FormInput"
      name={name}
      value={value}
      onChange={handleChange}
    >
      <option value={0} disabled>
        Select an option
      </option>
      {list.map((item) => (
        <option key={item[idField]} value={item[idField]}>
          {item[labelField]}
        </option>
      ))}
    </select>
  );
};
