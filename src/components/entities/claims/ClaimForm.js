import { useState, useEffect } from "react";
import API from "../../api/API.js";
import FormItem from "../../UI/Form.js";
import Action from "../../UI/Actions.js";
import { useNavigate } from "react-router-dom";

const emptyClaim = {
  ClaimTitle: "",
  ClaimDescription: "",
  ClaimClaimstatusID: 1,
  ClaimUserID: 1,
};

const emptySource = {
  SourceDescription: "",
  SourceURL: "",
  SourceSourcetypeID: 0,
};

export default function ClaimForm({
  onSubmit,
  initialClaim = emptyClaim,
  initialSource = emptySource,
}) {
  // Initialisation --------------------------------
  const navigate = useNavigate();
  const isValid = {
    ClaimTitle: (name) => name.length > 5,
    ClaimDescription: (desc) => desc.length > 10,
    SourceURL: (url) => url.startsWith("http"),
    SourceSourcetypeID: (type) => type !== 0,
    SourceDescription: (desc) => desc.length > 10,
  };

  const errorMessage = {
    ClaimTitle: "Claim title is too short",
    ClaimDescription: "Claim Description is too short",
    SourceURL: "Source URL is invalid",
    SourceSourcetypeID: "Please select a source type",
    SourceDescription: "Source Description is too short",
  };
  // State -----------------------------------------
  const [claim, setClaim] = useState(initialClaim);
  const [source, setSource] = useState(initialSource);
  const [errors, setErrors] = useState(
    [...Object.keys(initialClaim), ...Object.keys(initialSource)].reduce(
      (accum, key) => ({
        ...accum,
        [key]: null,
      }),
      {}
    )
  );

  const [sourceTypes, setSourceTypes] = useState([]);
  const [loadingTypesMessage, setLoadingTypesMessage] = useState(
    "Loading records...."
  );

  const getSourceTypes = async () => {
    const response = await API.get("/sourcetypes");
    response.isSuccess
      ? setSourceTypes(response.result)
      : setLoadingTypesMessage("Error loading source types");
  };

  useEffect(() => {
    getSourceTypes();
  }, []);

  // Handlers --------------------------------------
  const handleChange = (event) => {
    const { name, value } = event.target;
    const newValue = name === "SourceSourcetypeID" ? parseInt(value) : value;
    if (name.startsWith("Claim")) {
      setClaim({ ...claim, [name]: newValue });
    } else if (name.startsWith("Source")) {
      setSource({ ...source, [name]: newValue });
    }
    setErrors({
      ...errors,
      [name]: isValid[name](newValue) ? null : errorMessage[name],
    });
  };

  const isValidClaim = (claim, source) => {
    let isClaimValid = true;
    const allData = { ...claim, ...source };

    Object.keys(isValid).forEach((key) => {
      if (isValid[key](allData[key])) {
        errors[key] = null;
      } else {
        errors[key] = errorMessage[key];
        isClaimValid = false;
      }
    });
    return isClaimValid;
  };

  const handleCancel = () => {
    navigate("/myclaims");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    isValidClaim(claim, source) && onSubmit(claim, source);
    setErrors({ ...errors });
  };

  // View ------------------------------------------
  return (
    <form className="Form Bordered">
      <FormItem
        label="Claim title"
        htmlFor="ClaimTitle"
        advice="Please enter the title"
        error={errors.ClaimTitle}
      >
        <input
          type="text"
          name="ClaimTitle"
          value={claim.ClaimTitle}
          onChange={handleChange}
        />
      </FormItem>

      <FormItem
        label="Claim description"
        htmlFor="ClaimDescription"
        advice="Please enter the description"
        error={errors.ClaimDescription}
      >
        <input
          type="text"
          name="ClaimDescription"
          value={claim.ClaimDescription}
          onChange={handleChange}
        />
      </FormItem>

      <FormItem
        label="Source type"
        htmlFor="SourceSourcetypeID"
        advice="Choose a source type"
        error={errors.SourceSourcetypeID}
      >
        {!sourceTypes ? (
          <p>{loadingTypesMessage}</p>
        ) : sourceTypes.length === 0 ? (
          <p>No source types found</p>
        ) : (
          <select
            name="SourceSourcetypeID"
            value={source.SourceSourcetypeID}
            onChange={handleChange}
          >
            <option value={0} disabled>
              Select an option
            </option>
            {sourceTypes.map((type) => (
              <option key={type.SourcetypeID} value={type.SourcetypeID}>
                {type.SourcetypeName}
              </option>
            ))}
          </select>
        )}
      </FormItem>

      {source.SourceSourcetypeID !== 0 && (
        <>
          {source.SourceSourcetypeID === 5 ? (
            <FormItem
              label="File"
              htmlFor="SourceFilename"
              advice="Please upload a file"
            >
              <input
                type="file"
                name="file"
                onChange={handleChange}
              />
            </FormItem>
          ) : (
            <FormItem
              label="Source URL"
              htmlFor="SourceURL"
              advice="Please enter the source URL"
              error={errors.SourceURL}
            >
              <input
                type="text"
                name="SourceURL"
                value={source.SourceURL}
                onChange={handleChange}
              />
            </FormItem>
          )}
        </>
      )}

      <FormItem
        label="Source description"
        htmlFor="SourceDescription"
        advice="Please enter the source description"
        error={errors.SourceDescription}
      >
        <input
          type="text"
          name="SourceDescription"
          value={source.SourceDescription}
          onChange={handleChange}
        />
      </FormItem>

      <Action.Tray>
        <Action.Add
          showText
          buttonText={"Submit claim"}
          onClick={handleSubmit}
        />
        <Action.Cancel showText buttonText={"Cancel"} onClick={handleCancel} />
      </Action.Tray>
    </form>
  );
}
