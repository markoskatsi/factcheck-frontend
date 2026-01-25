import { useParams } from "react-router-dom";
import useLoad from "../api/useLoad.js";
import ClaimCard from "../entities/claims/ClaimCard.jsx";
import { useAuth } from "../auth/useAuth.jsx";
import { Button } from "../UI/Button.jsx";

const ClaimInfo = () => {
  // Initialisation --------------------------------
  const { claimId } = useParams();
  const { loggedInUser } = useAuth();
  console.log(loggedInUser);
  const claimsEndpoint = `/claims`;

  // State -----------------------------------------
  const [claims, , ,] = useLoad(claimsEndpoint);
  const [sources, , ,] = useLoad(`/sources/claims/${claimId}`);

  // Handlers --------------------------------------
  const claim = claims?.find((claim) => claim.ClaimID === parseInt(claimId));

  // View ------------------------------------------
  if (!claims) return <p>Loading...</p>;
  if (!claim) return <p>Claim not available.</p>;
  return (
    <>
      {loggedInUser?.UserUsertypeID === 2 && (
        <Button variant="secondary">
          Assign claim
        </Button>
      )}
      <ClaimCard claim={claim} sources={sources} />
    </>
  );
};

export default ClaimInfo;
