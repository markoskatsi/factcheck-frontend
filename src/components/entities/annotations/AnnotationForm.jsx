import Form from "../../UI/Form.jsx";
const emptyAnnotation = {
  AnnotationTitle: "",
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
      AnnotationTitle: (name) => name.length >= 8,
      AnnotationDescription: (desc) => desc.length >= 20,
    },
    errorMessage: {
      AnnotationTitle: "Annotation title must be at least 8 characters",
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
        label="Annotation title"
        htmlFor="AnnotationTitle"
        advice="Please enter the title"
        error={errors.AnnotationTitle}
      >
        <input
          className="FormInput"
          type="text"
          name="AnnotationTitle"
          value={annotation.AnnotationTitle}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item
        label="Annotation description"
        htmlFor="AnnotationDescription"
        advice="Please enter the description"
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
