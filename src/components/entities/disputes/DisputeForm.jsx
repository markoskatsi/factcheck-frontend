import Form from "../../UI/Form.jsx";
import useLoad from "../../api/useLoad.js";
import { Dropdown } from "../../UI/Dropdown.jsx";

const emptyDispute = {
  DisputeDescription:
    "The verdict labels this claim as misleading, but the government's press release clearly stated the 20% figure in the context of the longest waiters — this is standard practice in NHS reporting. The verdict fails to acknowledge this and presents a misleading characterisation of what was actually claimed. The 6.4% overall reduction figure, while accurate, does not invalidate the specific 20% reduction in 65-week waiters.",
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
