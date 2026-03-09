import { useParams } from "react-router-dom";
import useLoad from "../../api/useLoad.js";
import ClaimAndSources from "../../entities/claims/ClaimAndSources.jsx";
import PageNotFound from "./404.jsx";
import "../submitters/MyClaimInfo.scss";

const PublishedClaim = () => {
  // Initialisation --------------------------------
  const { claimId } = useParams();

  const claimEndpoint = `/claims/${claimId}`;
  const claimSourcesEndpoint = `/sources/claims/${claimId}?orderby=SourceCreated%20desc`;

  // State -----------------------------------------
  const [claim, , ,] = useLoad(claimEndpoint);
  const [sources, , ,] = useLoad(claimSourcesEndpoint);

  // Handlers --------------------------------------

  // View ------------------------------------------
  if (!claim) return null;
  if (claim[0].ClaimClaimstatusID !== 5) return <PageNotFound />;

  return <ClaimAndSources claim={claim[0]} sources={sources} />;
};

export default PublishedClaim;
