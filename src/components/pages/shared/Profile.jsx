import { useAuth } from "../../auth/useAuth";
import { Card } from "../../UI/Card.jsx";
import useLoad from "../../api/useLoad.js";
import { Button, ButtonTray } from "../../UI/Button.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../../api/API.js";
import "./Profile.scss";
import UserForm from "../../entities/users/UserForm.jsx";

const Profile = () => {
  // Initialisation --------------------------------
  const navigate = useNavigate();
  const { loggedInUser, logout } = useAuth();

  // State -----------------------------------------
  const [users, , , loadUsers] = useLoad(`/users`);
  const [claims, , ,] = useLoad(`/claims/users/${loggedInUser.UserID}`);
  const [annotations, , ,] = useLoad(
    `/annotations/users/${loggedInUser.UserID}`,
  );
  const [verdicts, , ,] = useLoad(
    `/verdicts/users/${loggedInUser.UserID}?VerdictVerdictstatusID=1`,
  );
  const [showEditForm, setShowEditForm] = useState(false);

  const user = users?.find((u) => u.UserID === loggedInUser.UserID);
  // Handlers --------------------------------------
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleEditProfile = async (updatedUser) => {
    const response = await API.put(
      `/users/${loggedInUser.UserID}`,
      updatedUser,
    );
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
        <div className="profile-avatar-wrapper">
          <img
            className="profile-avatar"
            src={user.UserImageURL}
            alt={`${user.UserFirstname} ${user.UserLastname}`}
          />
        </div>
        <div className="profile-info">
          <h2 className="profile-name">
            {user.UserFirstname} {user.UserLastname}
          </h2>
          <span className="profile-role">{user.UsertypeName}</span>
          <p className="profile-email">{user.UserEmail}</p>
        </div>
        <div className="profile-divider" />
        <div className="profile-stats">
          {loggedInUser.UserUsertypeID === 1 && (
            <div className="profile-stat">
              <span className="profile-stat-value">{claims?.length ?? "—"}</span>
              <span className="profile-stat-label">Claims Submitted</span>
            </div>
          )}
          {loggedInUser.UserUsertypeID === 2 && (
            <div className="profile-stat">
              <span className="profile-stat-value">{annotations?.length ?? "—"}</span>
              <span className="profile-stat-label">Annotations Submitted</span>
            </div>
          )}
          {loggedInUser.UserUsertypeID === 3 && (
            <div className="profile-stat">
              <span className="profile-stat-value">{verdicts?.length ?? "—"}</span>
              <span className="profile-stat-label">Verdicts Made</span>
            </div>
          )}
        </div>
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
