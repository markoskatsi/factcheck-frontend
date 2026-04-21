import Form from "../../UI/Form.jsx";
const emptyAnnotation = {
  AnnotationDescription:
    "NHS England RTT data shows total waiting list figures fell from 7.8 million to 7.3 million between Jan 2024 and Jan 2025 — a reduction of approximately 6.4%, not 20%. The 20% figure appears to refer only to the subset of patients waiting over 65 weeks, not the overall list. The government's claim uses selective data and is therefore misleading without further qualification.",
  AnnotationAssignmentID: 1,
};

export default function AnnotationForm({
  onSubmit,
  onCancel,
  initialAnnotation: initialAnnotationProp = {},
}) {
  const initialAnnotation = { ...emptyAnnotation, ...initialAnnotationProp };
  // Initialisation --------------------------------
  const validation = {
    isValid: {
      AnnotationDescription: (desc) => desc.length >= 20,
    },
    errorMessage: {
      AnnotationDescription: "Description must be at least 20 characters",
    },
  };

  const conformance = ["AnnotationAssignmentID"];

  // State -----------------------------------------

  const [annotation, errors, handleChange, handleSubmit] = Form.useForm(
    initialAnnotation,
    conformance,
    validation,
    onSubmit,
    onCancel,
  );
  // Handlers --------------------------------------
  // View ------------------------------------------
  return (
    <Form onSubmit={handleSubmit} onCancel={onCancel} submitText="Save annotation">
      <Form.Item
        label="Annotations"
        htmlFor="AnnotationDescription"
        advice="Please enter some notes"
        error={errors.AnnotationDescription}
      >
        <textarea
          type="text"
          className="FormInput"
          name="AnnotationDescription"
          value={annotation.AnnotationDescription}
          onChange={handleChange}
          rows="10"
        />
      </Form.Item>
    </Form>
  );
}
