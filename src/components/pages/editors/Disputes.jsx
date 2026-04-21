import useLoad from "../../api/useLoad.js";
import ClaimsMap from "../../entities/claims/ClaimsMap.jsx";
import { useAuth } from "../../auth/useAuth.jsx";
import "../submitters/MyClaims.scss";

const Disputes = () => {
  // Inititalisation ---------------------------------------
  const { loggedInUserID } = useAuth();

  const claimsEndpoint = `/claims/claimstatus/8?orderby=ClaimCreated%20esc`;
  const assignedClaimsEndpoint = `/assignments`;

  // State -------------------------------------------------
  const [allClaims, ,] = useLoad(claimsEndpoint);
  const [assignedClaims, ,] = useLoad(assignedClaimsEndpoint);

  const filteredClaims = allClaims?.filter(
    (claim) =>
      !assignedClaims?.some(
        (assignment) =>
          assignment.AssignmentUserID === loggedInUserID &&
          assignment.AssignmentClaimID === claim.ClaimID &&
          (assignment.RoleID === 1 || assignment.RoleID === 2),
      ),
  );

  // Context -----------------------------------------------
  // Methods -----------------------------------------------
  // View --------------------------------------------------
  return (
    <section>
      <h1>Resolve Disputes</h1>
      <ClaimsMap claims={filteredClaims} basePath="/disputes" />
    </section>
  );
};

export default Disputes;
