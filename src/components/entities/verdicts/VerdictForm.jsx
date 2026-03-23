import Form from "../../UI/Form.jsx";
import { useParams } from "react-router-dom";
import { useAuth } from "../../auth/useAuth.jsx";
import useLoad from "../../api/useLoad.js";

const emptyVerdict = {
  VerdictDescription: "",
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
    <Form onSubmit={handleSubmit} onCancel={onCancel}>
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
          rows="3"
        />
      </Form.Item>
    </Form>
  );
}
