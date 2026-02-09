import useLoad from "../api/useLoad.js";
import ClaimsMap from "../entities/claims/ClaimsMap.jsx";
import { useAuth } from "../auth/useAuth.jsx";
import "./MyClaims.scss";

function MyTasks() {
  // Inititalisation ---------------------------------------
  const { loggedInUserID } = useAuth();
  const assignedClaimsEndpoint = `/assignments/users/${loggedInUserID}?orderby=AssignmentCreated%20desc`;

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
