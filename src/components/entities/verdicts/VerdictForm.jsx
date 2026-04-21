import Form from "../../UI/Form.jsx";
import { useParams } from "react-router-dom";
import { useAuth } from "../../auth/useAuth.jsx";
import useLoad from "../../api/useLoad.js";

const emptyVerdict = {
  VerdictDescription:
    "MISLEADING. The claim that NHS waiting lists have been cut by 20% is not supported by overall NHS England data. Total incomplete pathways fell by approximately 6.4% over the period cited. The 20% figure refers specifically to the reduction in patients waiting over 65 weeks — a subset of the waiting list. Presenting this as an overall 20% reduction is misleading and lacks the necessary context.",
  VerdictVerdictstatusID: 3,
};

export default function VerdictForm({
  onSubmit,
  onCancel,
  initialVerdict = emptyVerdict,
}) {
  // Initialisation --------------------------------
  const { claimId } = useParams();
  const { loggedInUserID } = useAuth();

  const [assignments, , ,] = useLoad(
    `/assignments?AssignmentClaimID=${claimId}&AssignmentUserID=${loggedInUserID}`,
  );

  const assignmentId = assignments?.[0]?.AssignmentID;

  const validation = {
    isValid: {
      VerdictDescription: (desc) => desc.length > 20,
    },
    errorMessage: {
      VerdictDescription: "Description should be at least 20 characters long",
    },
  };

  const conformance = ["VerdictVerdictstatusID"];

  // State -----------------------------------------
  const [verdict, errors, handleChange, handleSubmit] = Form.useForm(
    initialVerdict,
    conformance,
    validation,
    (data) => onSubmit({ ...data, VerdictAssignmentID: assignmentId }),
    onCancel,
  );

  // Handlers --------------------------------------

  // View ------------------------------------------
  return (
    <Form
      onSubmit={handleSubmit}
      onCancel={onCancel}
      submitText="Save In Progress"
    >
      <Form.Item
        label="Verdict description"
        htmlFor="VerdictDescription"
        advice="Please enter the verdict description"
        error={errors.VerdictDescription}
      >
        <textarea
          className="FormInput"
          name="VerdictDescription"
          value={verdict.VerdictDescription}
          onChange={handleChange}
          rows="7"
        />
      </Form.Item>
    </Form>
  );
}
