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

      {claims && claims.length > 0 ? (
        <CardContainer>
          {claims.map((claim) => (
            <Link
              to={`/mytasks/${claim.AssignmentClaimID}`}
              key={claim.AssignmentClaimID}
            >
              <div className="fixed">
                  <ClaimItem claim={claim} />
              </div>
            </Link>
          ))}
        </CardContainer>
      ) : (
        <p>You have no tasks assigned</p>
      )}
    </section>
  );
}

export default MyTasks;
