import { useAuth } from "../../auth/useAuth";
import { Card } from "../../UI/Card.jsx";
import useLoad from "../../api/useLoad.js";
import { Button, ButtonTray } from "../../UI/Button.jsx";
import { useNavigate } from "react-router-dom";
import "./Profile.scss";

const Profile = () => {
  // Initialisation --------------------------------
  const navigate = useNavigate();
  const { loggedInUser, loggedInUserID, logout } = useAuth();
  const user = loggedInUser ? loggedInUser : null;
  
  // State -----------------------------------------
  const [claims, , ,] = useLoad(`/claims/users/${loggedInUserID}`);
  const [annotations, , ,] = useLoad(`/annotations/users/${loggedInUserID}`);
  const [verdicts, , ,] = useLoad(
    `/verdicts/users/${loggedInUserID}?VerdictVerdictstatusID=1`,
  );

  // Handlers --------------------------------------
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // View ------------------------------------------
  if (!user) return <p>Loading...</p>;
  return (
    <>
      <h1>Profile</h1>
      <Card className="profileCard">
        <img
          src={user.UserProfileImage}
          alt={`${user.UserFirstname} ${user.UserLastname}`}
        />
        <p>
          {user.UserFirstname} {user.UserLastname}
        </p>
        <p>{user.UserEmail}</p>
        <p>{user.UsertypeName}</p>
        {loggedInUserID === 1 && <p>Claims Submitted: {claims?.length}</p>}
        {loggedInUserID === 2 && (
          <p>Annotations Submitted: {annotations?.length}</p>
        )}
        {loggedInUserID === 3 && <p>Verdicts Made: {verdicts?.length}</p>}
        <ButtonTray>
          <Button variant="secondary">Edit</Button>
          <Button variant="darkDanger" onClick={handleLogout}>
            Logout
          </Button>
        </ButtonTray>
      </Card>
    </>
  );
};

export default Profile;
