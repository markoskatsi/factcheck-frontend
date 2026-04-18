import "./Dropdown.scss";

export const Dropdown = ({
  list,
  value,
  name,
  loadingMessage,
  handleChange,
  idField,
  labelField,
  labelFormatter,
  className,
}) => {
  const select = !list ? (
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
          {labelFormatter ? labelFormatter(item) : item[labelField]}
        </option>
      ))}
    </select>
  );

  return className ? <div className={className}>{select}</div> : select;
};
