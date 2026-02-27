import Form from "../../UI/Form.jsx";
import { useAuth } from "../../auth/useAuth.jsx";
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
  const { loggedInUserID } = useAuth();
  const validation = {
    isValid: {
      // AnnotationTitle: (name) => name.length > 5,
      AnnotationDescription: (desc) => desc.length > 10,
    },
    errorMessage: {
      AnnotationTitle: "Annotation title is too short",
      AnnotationDescription: "Please enter more notes",
    },
  };

  const conformance = ["AnnotationUserID", "AnnotationAssignmentID"];

  // State -----------------------------------------

  const [annotation, errors, handleChange, handleSubmit] = Form.useForm(
    initialAnnotation,
    conformance,
    validation,
    onSubmit,
    onCancel,
  );
  // Handlers --------------------------------------
  annotation.AnnotationUserID = loggedInUserID;
  // View ------------------------------------------
  return (
    <Form onSubmit={handleSubmit} onCancel={onCancel}>
      {/* <Form.Item
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
      </Form.Item> */}

      <Form.Item
        label="Notes"
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
