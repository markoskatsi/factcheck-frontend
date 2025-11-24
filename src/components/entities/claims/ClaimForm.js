import Form from "../../UI/Form.js";
import { useNavigate } from "react-router-dom";
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
  initialClaim = emptyClaim,
  initialSource = emptySource,
}) {
  // Initialisation --------------------------------
  const navigate = useNavigate();

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
  const [claim, claimErrors, setClaimErrors, handleChange] =
    Form.useForm(initialClaim,conformance,validation);
  const [source, sourceErrors, setSourceErrors, handleSourceChange] =
    Form.useForm(initialSource,conformance,validation);
  const [sourceTypes, , loadingTypesMessage, ,] = useLoad(sourceTypesEndpoint);

  // Handlers --------------------------------------

  const isValidClaim = (claim, source) => {
    let isClaimValid = true;
    const allData = { ...claim, ...source };
    const newClaimErrors = { ...claimErrors };
    const newSourceErrors = { ...sourceErrors };

    Object.keys(validation.isValid).forEach((key) => {
      if (validation.isValid[key](allData[key])) {
        if (key.startsWith("Claim")) {
          newClaimErrors[key] = null;
        } else {
          newSourceErrors[key] = null;
        }
      } else {
        if (key.startsWith("Claim")) {
          newClaimErrors[key] = validation.errorMessage[key];
        } else {
          newSourceErrors[key] = validation.errorMessage[key];
        }
        isClaimValid = false;
      }
    });

    setClaimErrors(newClaimErrors);
    setSourceErrors(newSourceErrors);
    return isClaimValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    isValidClaim(claim, source) && onSubmit(claim, source);
  };

  const errors = { ...claimErrors, ...sourceErrors };

  const handleCancel = () => {
    navigate("/myclaims");
  };

  // View ------------------------------------------
  return (
    <Form onSubmit={handleSubmit} onCancel={handleCancel}>
      <Form.Item
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
      </Form.Item>

      <Form.Item
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
      </Form.Item>

      <Form.Item
        label="Source URL"
        htmlFor="SourceURL"
        advice="Please enter the source URL"
        error={errors.SourceURL}
      >
        <input
          type="text"
          name="SourceURL"
          value={source.SourceURL}
          onChange={handleSourceChange}
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
            name="SourceSourcetypeID"
            value={source.SourceSourcetypeID}
            onChange={handleSourceChange}
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

      <Form.Item
        label="Source description"
        htmlFor="SourceDescription"
        advice="Please enter the source description"
        error={errors.SourceDescription}
      >
        <input
          type="text"
          name="SourceDescription"
          value={source.SourceDescription}
          onChange={handleSourceChange}
        />
      </Form.Item>
    </Form>
  );
}
