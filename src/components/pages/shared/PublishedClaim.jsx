import { useParams } from "react-router-dom";
import useLoad from "../../api/useLoad.js";
import ClaimAndSources from "../../entities/claims/ClaimAndSources.jsx";
import PageNotFound from "./404.jsx";
import "../submitters/MyClaimInfo.scss";
import VerdictAndEvidence from "../../entities/verdicts/VerdictAndEvidence.jsx";


const PublishedClaim = () => {
  // Initialisation --------------------------------
  const { claimId } = useParams();

  const claimEndpoint = `/claims/${claimId}`;
  const sourcesEndpoint = `/sources/claims/${claimId}?orderby=SourceCreated%20desc`;
  const verdictEndpoint = `/verdicts/claims/${claimId}?orderby=VerdictCreated%20desc`;
  const annotationEndpoint = `/annotations/claims/${claimId}`;

  // State -----------------------------------------
  const [claim, , ,] = useLoad(claimEndpoint);
  const [sources, , ,] = useLoad(sourcesEndpoint);
  const [verdicts, , ,] = useLoad(verdictEndpoint);
  const [annotation, , ,] = useLoad(annotationEndpoint);

  const evidenceEndpoint = `/evidence/annotations/${annotation?.[0]?.AnnotationID}`;
  const [evidence, , ,] = useLoad(evidenceEndpoint);

  // Handlers --------------------------------------

  // View ------------------------------------------
  if (!claim) return null;
  if (claim[0].ClaimClaimstatusID !== 5) return <PageNotFound />;

  return (
    <div className="claimInfoWrapper">
      <div className="claimLayout">
        <div className="claimMain">
          <h2>Claim</h2>
          <ClaimAndSources claim={claim[0]} sources={sources} />
        </div>
        <div className="claimSidebar">
          <h2>Verdict</h2>
          <VerdictAndEvidence verdict={verdicts?.[0]} evidences={evidence} />
        </div>
      </div>
    </div>
  );
};

export default PublishedClaim;
