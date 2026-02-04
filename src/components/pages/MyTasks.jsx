import useLoad from "../api/useLoad.js";
import { CardContainer } from "../UI/Card.jsx";
import ClaimItem from "../entities/claims/ClaimItem.jsx";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/useAuth.jsx";
import "./MyClaims.scss";

function MyTasks() {
  // Inititalisation ---------------------------------------
  const { loggedInUserID } = useAuth();
  const assignedClaimsEndpoint = `/assignments/users/${loggedInUserID}`;

  // State -------------------------------------------------
  const [claims, ,] = useLoad(assignedClaimsEndpoint);
  // Context -----------------------------------------------
  // Methods -----------------------------------------------
  // View --------------------------------------------------
  return (
    <section>
      <h1>My Tasks</h1>
      <ClaimsMap claims={claims} basePath="/mytasks" />
    </section>
  );
}

export default MyTasks;
