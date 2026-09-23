import Form from "../../UI/Form.jsx";
const emptyAnnotation = {
  AnnotationDescription:
    "SMMT data shows BEV registrations grew by roughly 21% year-on-year (approx. 315,000 to 382,000), not 100%. The 'doubled' figure appears to describe one manufacturer's model range rather than the overall market. The government's claim uses selective data and is misleading without further qualification.",
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
    <Form
      onSubmit={handleSubmit}
      onCancel={onCancel}
      submitText="Save annotation"
    >
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
