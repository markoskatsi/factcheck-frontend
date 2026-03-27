import { useAuth } from "../../auth/useAuth";

const Profile = () => {
  const { loggedInUser } = useAuth();

  const user = loggedInUser ? loggedInUser : null;

  if (!user) return <p>Loading...</p>;
  return (
    <div>
      <h1>Profile Page</h1>
      <p>{user.UserFirstname}</p>
      <p>{user.UserLastname}</p>
      <p>{user.UserEmail}</p>
      <p>{user.UsertypeName}</p>
    </div>
  );
};

export default Profile;
