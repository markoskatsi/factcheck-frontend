import Form from "../../UI/Form.jsx";
import useLoad from "../../api/useLoad.js";
import { Dropdown } from "../../UI/Dropdown.jsx";

const emptyDispute = {
  DisputeDescription:
    "The claim states a 40% increase in screen time across all children aged 5–15, but the Ofcom 2024 report shows this figure represents the upper end of the range and applies primarily to younger children (5–10). Teenagers showed more moderate growth in certain categories. Presenting 40% as a uniform average across all age groups is misleading and not supported by the data.",
  DisputeDisputetypeID: 0,
  DisputeOutcome: 0,
  DisputeVerdictID: 0,
};

export default function DisputeForm({
  onSubmit,
  onCancel,
  initialDispute = emptyDispute,
}) {
  // Initialisation --------------------------------
  const disputeTypesEndpoint = "/disputetypes";
  const validation = {
    isValid: {
      DisputeDescription: (desc) => desc.length > 20,
      DisputeDisputetypeID: (type) => type !== 0,
    },
    errorMessage: {
      DisputeDescription: "Description should be at least 20 characters long",
      DisputeDisputetypeID: "Please select a dispute type",
    },
  };

  const conformance = ["DisputeDisputetypeID"];

  // State -----------------------------------------
  const [dispute, errors, handleChange, handleSubmit] = Form.useForm(
    initialDispute,
    conformance,
    validation,
    (data) => onSubmit({ ...data }),
    onCancel,
  );

  const [disputeTypes, , loadingTypesMessage] = useLoad(disputeTypesEndpoint);

  // Handlers --------------------------------------

  // View ------------------------------------------
  return (
    <Form
      onSubmit={handleSubmit}
      onCancel={onCancel}
      submitText="Submit Dispute"
    >
      <Form.Item
        label="Dispute description"
        htmlFor="DisputeDescription"
        advice="Please enter the dispute description"
        error={errors.DisputeDescription}
      >
        <textarea
          className="FormInput"
          name="DisputeDescription"
          value={dispute.DisputeDescription}
          onChange={handleChange}
          rows="7"
        />
      </Form.Item>
      <Form.Item
        label="Dispute type"
        htmlFor="DisputeDisputetypeID"
        advice="Please select the dispute type"
        error={errors.DisputeDisputetypeID}
      >
        <Dropdown
          list={disputeTypes}
          value={dispute.DisputeDisputetypeID}
          name="DisputeDisputetypeID"
          loadingMessage={loadingTypesMessage}
          handleChange={handleChange}
          idField="DisputetypeID"
          labelField="DisputetypeName"
        />
      </Form.Item>
    </Form>
  );
}
