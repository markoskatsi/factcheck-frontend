import Form from "../../UI/Form.js";
import useLoad from "../../api/useLoad.js";

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
  onCancel,
  initialClaim = emptyClaim,
  initialSource = emptySource,
}) {
  // Initialisation --------------------------------
  const validation = {
    isValid: {
      ClaimTitle: (name) => name.length > 5,
      ClaimDescription: (desc) => desc.length > 10,
      SourceURL: (url) => url.startsWith("http"),
      SourceSourcetypeID: (type) => type !== 0,
      SourceDescription: (desc) => desc.length > 10,
    },
    errorMessage: {
      ClaimTitle: "Claim title is too short",
      ClaimDescription: "Claim Description is too short",
      SourceURL: "Source URL is invalid",
      SourceSourcetypeID: "Please select a source type",
      SourceDescription: "Source Description is too short",
    },
  };

  const conformance = ["SourceSourcetypeID"];
  const sourceTypesEndpoint = "/sourcetypes";

  // State -----------------------------------------
  const handleFormSubmit = (data) => {
    const claim = {
      ClaimTitle: data.ClaimTitle,
      ClaimDescription: data.ClaimDescription,
      ClaimClaimstatusID: data.ClaimClaimstatusID,
      ClaimUserID: data.ClaimUserID,
    };

    const source = {
      SourceDescription: data.SourceDescription,
      SourceURL: data.SourceURL,
      SourceSourcetypeID: data.SourceSourcetypeID,
    };

    onSubmit(claim, source);
  };

  const [formData, errors, handleChange, handleSubmit] = Form.useForm(
    { ...initialClaim, ...initialSource },
    conformance,
    validation,
    handleFormSubmit,
    onCancel
  );

  const [sourceTypes, , loadingTypesMessage] = useLoad(sourceTypesEndpoint);

  // Handlers --------------------------------------

  const handleAddSource = () => {
    alert("Not implemented yet.");
  };

  // View ------------------------------------------
  return (
    <Form onSubmit={handleSubmit} onCancel={onCancel}>
      <Form.Item
        label="Claim title"
        htmlFor="ClaimTitle"
        advice="Please enter the title"
        error={errors.ClaimTitle}
      >
        <input
          className="FormInput"
          type="text"
          name="ClaimTitle"
          value={formData.ClaimTitle}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item
        label="Claim description"
        htmlFor="ClaimDescription"
        advice="Please enter the description"
        error={errors.ClaimDescription}
      >
        <textarea
          type="text"
          className="FormInput"
          name="ClaimDescription"
          value={formData.ClaimDescription}
          onChange={handleChange}
          rows="3"
        />
      </Form.Item>

      <Form.Item
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
            className="FormInput"
            name="SourceSourcetypeID"
            value={formData.SourceSourcetypeID}
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
      </Form.Item>

      {source.SourceSourcetypeID !== 0 && (
        <>
          {source.SourceSourcetypeID === 5 ? (
            <FormItem
              label="File"
              htmlFor="SourceFilename"
              advice="Please upload a file"
            >
              <input type="file" name="file" onChange={handleChange} />
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
        <textarea
          className="FormInput"
          name="SourceDescription"
          value={formData.SourceDescription}
          onChange={handleChange}
          rows="3"
        />
      </FormItem>
      <button type="button" onClick={handleAddSource}>
        Add another source
      </button>
    </Form>
  );
}
