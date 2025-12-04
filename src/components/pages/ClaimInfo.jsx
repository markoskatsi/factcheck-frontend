import { useParams } from "react-router-dom";
import useLoad from "../api/useLoad.js";
import ClaimItem from "../entities/claims/ClaimItem.jsx";
import { SourceItem } from "../entities/sources/SourceItem.jsx";
import { Card, CardContainer } from "../UI/Card.jsx";
import { useAuth } from "../auth/useAuth.jsx";
import { useNavigate } from "react-router-dom";

const ClaimInfo = () => {
  // Initialisation --------------------------------
  const { claimId } = useParams();
  const { loggedInUserID } = useAuth();
  const navigate = useNavigate();
  const publishedClaimsEndpoint = `/claims/claimstatus/3`;

  // State -----------------------------------------
  const [publishedClaims, , ,] = useLoad(publishedClaimsEndpoint);
  const [sources, , ,] = useLoad(`/sources/claims/${claimId}`);

  // Handlers --------------------------------------
  const claim = publishedClaims?.find(
    (claim) => claim.ClaimID === parseInt(claimId)
  );

  // View ------------------------------------------
  if (!publishedClaims) return <p>Loading...</p>;
  if (!claim) return <p>Claim not available.</p>;
  return (
    <CardContainer>
      <Card>
        <ClaimItem claim={claim} />
        <h3>Attached sources:</h3>
        {sources ? (
          sources.map((source) => (
            <SourceItem source={source} key={source.SourceID} />
          ))
        ) : (
          <p>No sources attached.</p>
        )}
      </Card>
    </CardContainer>
  );
};

export default ClaimInfo;
