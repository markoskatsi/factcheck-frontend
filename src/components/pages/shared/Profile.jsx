import { useAuth } from "../../auth/useAuth";
import { Card } from "../../UI/Card.jsx";
import useLoad from "../../api/useLoad.js";
import { Button, ButtonTray } from "../../UI/Button.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../../api/API.js";
import "./Profile.scss";
import UserForm from "../../entities/UserForm.jsx";

const Profile = () => {
  // Initialisation --------------------------------
  const navigate = useNavigate();
  const { loggedInUserID, logout } = useAuth();

  // State -----------------------------------------
  const [users, , , loadUsers] = useLoad(`/users`);
  const [claims, , ,] = useLoad(`/claims/users/${loggedInUserID}`);
  const [annotations, , ,] = useLoad(`/annotations/users/${loggedInUserID}`);
  const [verdicts, , ,] = useLoad(
    `/verdicts/users/${loggedInUserID}?VerdictVerdictstatusID=1`,
  );
  const [showEditForm, setShowEditForm] = useState(false);

  const user = users?.find((u) => u.UserID === loggedInUserID);
  // Handlers --------------------------------------
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleEditProfile = async (updatedUser) => {
    const response = await API.put(`/users/${loggedInUserID}`, updatedUser);
    if (response.isSuccess) {
      setShowEditForm(false);
      await loadUsers("/users");
    }
    return response.isSuccess;
  };

  // View ------------------------------------------
  if (!user) return <p>Loading...</p>;
  return (
    <div className="profile-page">
      <h1>Profile</h1>
      {showEditForm && (
        <UserForm
          onSubmit={handleEditProfile}
          onCancel={() => setShowEditForm(false)}
          initialUser={user}
        />
      )}
      <Card className="profile-card">
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
          {!showEditForm && (
            <Button variant="secondary" onClick={() => setShowEditForm(true)}>
              Edit Profile
            </Button>
          )}
          <Button variant="darkDanger" onClick={handleLogout}>
            Logout
          </Button>
        </ButtonTray>
      </Card>
    </div>
  );
};

export default Profile;
