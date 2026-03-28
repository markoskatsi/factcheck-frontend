import useLoad from "../../api/useLoad.js";
import ClaimsMap from "../../entities/claims/ClaimsMap.jsx";
import { useAuth } from "../../auth/useAuth.jsx";
import "../submitters/MyClaims.scss";

const Review = () => {
  // Inititalisation ---------------------------------------
  const claimsEndpoint = `/claims/claimstatus/4?orderby=ClaimCreated%20esc`;
  const assignmentsEndpoint = `/assignments`;
  // State -------------------------------------------------
  const [allClaims, ,] = useLoad(claimsEndpoint);
  const [assignedClaims, ,] = useLoad(assignmentsEndpoint);

  const claims = allClaims?.filter(
    (claim) =>
      !assignedClaims?.some(
        (assignment) =>
          assignment.UserUsertypeID === 3 &&
          assignment.AssignmentClaimID === claim.ClaimID,
      ),
  );
  // Context -----------------------------------------------
  // Methods -----------------------------------------------
  // View --------------------------------------------------
  return (
    <section>
      <h1>Review Claims</h1>
      <ClaimsMap claims={claims} basePath="/review" />
    </section>
  );
};

export default Review;
