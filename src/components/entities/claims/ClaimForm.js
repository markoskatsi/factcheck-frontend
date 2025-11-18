import { useState } from "react";
import FormItem from "../../UI/Form.js";

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

  // View ------------------------------------------
  return (
    <form className="BorderedForm">
      <FormItem
        label="Claim Title"
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
        label="Claim Description"
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
        label="Source Type"
        htmlFor="SourceSourcetypeID"
        advice="Choose a source type"
        error={errors.SourceSourcetypeID}
      >
        <select
          name="SourceSourcetypeID"
          value={source.SourceSourcetypeID}
          onChange={handleChange}
        >
          <option value={0} disabled>
            Select an option
          </option>
          {[
            { id: 1, name: "Article" },
            { id: 2, name: "Report" },
            { id: 3, name: "Video" },
            { id: 4, name: "Social Media" },
            { id: 5, name: "Image" },
          ].map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </FormItem>

      <FormItem
        label="Source Description"
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

      {/* <button}>Add Another Source</button> */}
    </form>
  );
}
