import Form from "../../UI/Form.jsx";
import useLoad from "../../api/useLoad.js";
import { Dropzone } from "../../UI/Dropzone.jsx";

const emptyEvidence = {
  EvidenceDescription: "",
  EvidenceURL: "",
  EvidenceEvidencetypeID: 0,
};

export default function EvidenceForm({
  onSubmit,
  onCancel,
  initialEvidence = emptyEvidence,
}) {
  // Initialisation --------------------------------
  const validation = {
    isValid: {
      EvidenceURL: (url) => !url || url.startsWith("http"),
      EvidenceEvidencetypeID: (type) => type !== 0,
      EvidenceDescription: (desc) => desc.length > 20,
      file: (file) => !file || file instanceof File,
    },
    errorMessage: {
      EvidenceURL: "Evidence URL is invalid",
      EvidenceEvidencetypeID: "Please select an evidence type",
      EvidenceDescription: "Evidence Description is too short",
      file: "Please select a valid file",
    },
  };

  const conformance = ["EvidenceEvidencetypeID"];
  const evidenceTypesEndpoint = "/evidencetypes";

  // State -----------------------------------------
  const [evidence, errors, handleChange, handleSubmit] = Form.useForm(
    initialEvidence,
    conformance,
    validation,
    onSubmit,
    onCancel,
  );

  const [evidenceTypes, , loadingTypesMessage] = useLoad(evidenceTypesEndpoint);

  // Handlers --------------------------------------
  const handleFileDrop = (files) => {
    handleChange({
      target: {
        name: "file",
        value: files[0],
        files: files,
      },
    });
  };
  // View ------------------------------------------
  return (
    <Form onSubmit={handleSubmit} onCancel={onCancel} submitText="Save evidence">
      <Form.Item
        label="Evidence type"
        htmlFor="EvidenceEvidencetypeID"
        advice="Choose an evidence type"
        error={errors.EvidenceEvidencetypeID}
      >
        {!evidenceTypes ? (
          <p>{loadingTypesMessage}</p>
        ) : evidenceTypes.length === 0 ? (
          <p>No evidence types found</p>
        ) : (
          <select
            className="FormInput"
            name="EvidenceEvidencetypeID"
            value={evidence.EvidenceEvidencetypeID}
            onChange={handleChange}
          >
            <option value={0} disabled>
              Select an option
            </option>
            {evidenceTypes.map((type) => (
              <option key={type.EvidencetypeID} value={type.EvidencetypeID}>
                {type.EvidencetypeName}
              </option>
            ))}
          </select>
        )}
      </Form.Item>

      {evidence.EvidenceEvidencetypeID !== 0 && (
        <>
          {evidence.EvidenceEvidencetypeID === 1 ? (
            <Form.Item
              label="File"
              htmlFor="EvidenceFilename"
              advice={
                evidence.EvidenceFilename
                  ? `Current file: ${evidence.EvidenceFilename}`
                  : "Please upload a file"
              }
            >
              <Dropzone onDrop={handleFileDrop} selectedFile={evidence.file} />
              {evidence.EvidenceFilename && !evidence.file && (
                <p style={{ fontSize: "0.9em", color: "#666" }}>
                  Leave empty to keep the existing file
                </p>
              )}
            </Form.Item>
          ) : (
            <Form.Item
              label="Evidence URL"
              htmlFor="EvidenceURL"
              advice="Please enter the evidence URL"
              error={errors.EvidenceURL}
            >
              <input
                type="text"
                className="FormInput"
                name="EvidenceURL"
                value={evidence.EvidenceURL}
                onChange={handleChange}
              />
            </Form.Item>
          )}
        </>
      )}

      <Form.Item
        label="Evidence description"
        htmlFor="EvidenceDescription"
        advice="Please enter the evidence description"
        error={errors.EvidenceDescription}
      >
        <textarea
          className="FormInput"
          name="EvidenceDescription"
          value={evidence.EvidenceDescription}
          onChange={handleChange}
          rows="3"
        />
      </Form.Item>
    </Form>
  );
}
