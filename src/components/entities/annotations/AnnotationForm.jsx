import Form from "../../UI/Form.jsx";
const emptyAnnotation = {
  AnnotationDescription: "",
  AnnotationAssignmentID: 1,
};

export default function AnnotationForm({
  onSubmit,
  onCancel,
  initialAnnotation = emptyAnnotation,
}) {
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
