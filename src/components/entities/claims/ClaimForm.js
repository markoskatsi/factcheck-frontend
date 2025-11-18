import { useState, useEffect } from "react";
import API from "../../api/API.js";
import FormItem from "../../UI/Form.js";
import Action from "../../UI/Actions.js";
import { useNavigate } from "react-router-dom";

const emptyClaim = {
  ClaimTitle: "",
  ClaimDescription: "",
  ClaimStatus: "",
  ClaimCreated: 0,
  ClaimUserID: 0,
  ClaimClaimstatusID: "",
};

const emptySource = {
  SourceDescription: "",
  SourceURL: "",
  SourceCreated: 0,
  SourceClaimID: 0,
  SourceSourcetypeID: 0,
};

export default function ClaimForm({
  initialClaim = emptyClaim,
  initialSource = emptySource,
}) {
  // Initialisation --------------------------------
  const navigate = useNavigate();
  const isValid = {
    ClaimTitle: (name) => name.length > 5,
    ClaimDescription: (desc) => desc.length > 10,
    SourceURL: (url) => url.startsWith("http"),
    SourceSourcetypeID: (type) => type !== "",
    SourceDescription: (desc) => desc.length > 10,
  };

  const errorMessages = {
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
    setClaim({ ...claim, [name]: newValue });
    setSource({ ...source, [name]: newValue });
    setErrors({
      ...errors,
      [name]: isValid[name](newValue) ? null : errorMessages[name],
    });
  };

  const handleSubmit = () => {};
  const handleCancel = () => {
    navigate("/myclaims");
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
