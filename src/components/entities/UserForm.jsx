import Form from "../UI/Form.jsx";
import { useAuth } from "../auth/useAuth.jsx";
const emptyUser = {
  UserFirstname: "",
  UserLastname: "",
  UserEmail: "",
  UserUsertypeID: 0,
};

export default function UserForm({
  onSubmit,
  onCancel,
  initialUser = emptyUser,
}) {
  // Initialisation --------------------------------
  const { loggedInUserID } = useAuth();
  const validation = {
    isValid: {
      UserFirstname: (name) => name.length > 2,
      UserLastname: (name) => name.length > 2,
      UserEmail: (email) => /^\S+@\S+\.\S+$/.test(email),
    },
    errorMessage: {
      UserFirstname: "First name is too short",
      UserLastname: "Last name is too short",
      UserEmail: "Please enter a valid email address",
    },
  };

  const conformance = ["UserID", "UserUsertypeID"];

  // State -----------------------------------------

  const [user, errors, handleChange, handleSubmit] = Form.useForm(
    initialUser,
    conformance,
    validation,
    onSubmit,
    onCancel
  );
  // Handlers --------------------------------------
  user.UserID = loggedInUserID;
  // View ------------------------------------------
  return (
    <Form onSubmit={handleSubmit} onCancel={onCancel}>
      <Form.Item
        label="First name"
        htmlFor="UserFirstname"
        advice="Please enter your first name"
        error={errors.UserFirstname}
      >
        <input
          className="FormInput"
          type="text"
          name="UserFirstname"
          value={user.UserFirstname}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item
        label="Last name"
        htmlFor="UserLastname"
        advice="Please enter your last name"
        error={errors.UserLastname}
      >
        <input
          type="text"
          className="FormInput"
          name="UserLastname"
          value={user.UserLastname}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item
        label="Email"
        htmlFor="UserEmail"
        advice="Please enter your email address"
        error={errors.UserEmail}
      >
        <input
          type="text"
          className="FormInput"
          name="UserEmail"
          value={user.UserEmail}
          onChange={handleChange}
        />
      </Form.Item>
    </Form>
  );
}