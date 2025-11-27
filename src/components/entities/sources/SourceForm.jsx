import Form from "../../UI/Form.jsx";
import useLoad from "../../api/useLoad.js";
import { useParams } from "react-router-dom";

const emptySource = {
  SourceDescription: "",
  SourceURL: "",
  SourceSourcetypeID: 0,
};

export default function SourceForm({
  onSubmit,
  onCancel,
  initialSource = emptySource,
}) {
  // Initialisation --------------------------------
  const { claimId } = useParams();
  const sourceWithClaim = { ...initialSource, SourceClaimID: claimId };
  const validation = {
    isValid: {
      SourceURL: (url) => url === "" || url.startsWith("http"),
      SourceSourcetypeID: (type) => type !== 0,
      SourceDescription: (desc) => desc.length > 10,
      file: (file) => file instanceof File,
    },
    errorMessage: {
      SourceURL: "Source URL is invalid",
      SourceSourcetypeID: "Please select a source type",
      SourceDescription: "Source Description is too short",
      file: "Please select a valid file",
    },
  };

  const conformance = ["SourceSourcetypeID"];
  const sourceTypesEndpoint = "/sourcetypes";

  // State -----------------------------------------
  const [source, errors, handleChange, handleSubmit] = Form.useForm(
    sourceWithClaim,
    conformance,
    validation,
    onSubmit,
    onCancel
  );

  const [sourceTypes, , loadingTypesMessage] = useLoad(sourceTypesEndpoint);

  // Handlers --------------------------------------
  // View ------------------------------------------
  return (
    <Form onSubmit={handleSubmit} onCancel={onCancel}>
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
      </Form.Item>

      {source.SourceSourcetypeID !== 0 && (
        <>
          {source.SourceSourcetypeID === 5 ? (
            <Form.Item
              label="File"
              htmlFor="SourceFilename"
              advice="Please upload a file"
            >
              <input
                type="file"
                name="file"
                className="FormInput"
                onChange={handleChange}
              />
            </Form.Item>
          ) : (
            <Form.Item
              label="Source URL"
              htmlFor="SourceURL"
              advice="Please enter the source URL"
              error={errors.SourceURL}
            >
              <input
                type="text"
                className="FormInput"
                name="SourceURL"
                value={source.SourceURL}
                onChange={handleChange}
              />
            </Form.Item>
          )}
        </>
      )}

      <Form.Item
        label="Source description"
        htmlFor="SourceDescription"
        advice="Please enter the source description"
        error={errors.SourceDescription}
      >
        <textarea
          className="FormInput"
          name="SourceDescription"
          value={source.SourceDescription}
          onChange={handleChange}
          rows="3"
        />
      </Form.Item>
    </Form>
  );
}
