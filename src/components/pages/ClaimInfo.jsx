import { useParams } from "react-router-dom";
import useLoad from "../api/useLoad.js";
import ClaimItem from "../entities/claims/ClaimItem.jsx";
import { SourceItem } from "../entities/sources/SourceItem.jsx";
import { Card, CardContainer } from "../UI/Card.jsx";
import ClaimCard from "../entities/claims/ClaimCard.jsx";

const ClaimInfo = () => {
  // Initialisation --------------------------------
  const { claimId } = useParams();
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
  return <ClaimCard claim={claim} sources={sources} />;
};

export default ClaimInfo;
