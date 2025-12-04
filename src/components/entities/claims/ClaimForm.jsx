import Form from "../../UI/Form.jsx";
import { useAuth } from "../../auth/useAuth.jsx";
const emptyClaim = {
  ClaimTitle: "",
  ClaimDescription: "",
  ClaimClaimstatusID: 1,
  ClaimUserID: 1,
};

export default function ClaimForm({
  onSubmit,
  onCancel,
  initialClaim = emptyClaim,
}) {
  // Initialisation --------------------------------
  const { loggedInUserID } = useAuth();
  const validation = {
    isValid: {
      ClaimTitle: (name) => name.length > 5,
      ClaimDescription: (desc) => desc.length > 10,
    },
    errorMessage: {
      ClaimTitle: "Claim title is too short",
      ClaimDescription: "Claim Description is too short",
    },
  };

  const conformance = ["ClaimUserID", "ClaimClaimstatusID"];

  // State -----------------------------------------

  const [claim, errors, handleChange, handleSubmit] = Form.useForm(
    initialClaim,
    conformance,
    validation,
    onSubmit,
    onCancel
  );
  // Handlers --------------------------------------
  claim.ClaimUserID = loggedInUserID;
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
        <textarea
          type="text"
          className="FormInput"
          name="ClaimDescription"
          value={claim.ClaimDescription}
          onChange={handleChange}
          rows="3"
        />
      </Form.Item>
    </Form>
  );
}
