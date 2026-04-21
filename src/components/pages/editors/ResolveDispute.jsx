import { useParams } from "react-router-dom";
import useLoad from "../../api/useLoad.js";
import ClaimAndSources from "../../entities/claims/ClaimAndSources.jsx";
import { Button } from "../../UI/Button.jsx";
import "../submitters/MyClaimInfo.scss";
import { useAuth } from "../../auth/useAuth.jsx";
import API from "../../api/API.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../UI/Spinner.jsx";
import { DisputeItem } from "../../entities/disputes/DisputeItem.jsx";
import ClaimInfoLayout from "../../UI/ClaimInfoLayout.jsx";
import VerdictAndEvidence from "../../entities/verdicts/VerdictAndEvidence.jsx";

const ResolveDispute = () => {
  // Initialisation --------------------------------
  const { loggedInUserID } = useAuth();
  const { claimId } = useParams();

  const navigate = useNavigate();

  const claimEndpoint = `/claims/${claimId}`;
  const claimSourcesEndpoint = `/sources/claims/${claimId}?orderby=SourceCreated%20desc`;
  const annotationClaimEndpoint = `/annotations/claims/${claimId}`;
  const verdictEndpoint = `/verdicts/claims/${claimId}`;

  // State -----------------------------------------
  const [isLoading, setIsLoading] = useState(false);
  const [claims, , , reloadClaims] = useLoad(claimEndpoint);
  const [annotations, , ,] = useLoad(annotationClaimEndpoint);
  const [sources, , ,] = useLoad(claimSourcesEndpoint);
  const [verdicts, , ,] = useLoad(verdictEndpoint);

  const disputeEndpoint = `/disputes/verdicts/${verdicts?.[0]?.VerdictID}`;
  const [disputes, , ,] = useLoad(disputeEndpoint);

  const evidenceEndpoint = `/evidence/annotations/${annotations?.[0]?.AnnotationID}`;
  const [evidences, , ,] = useLoad(evidenceEndpoint);

  const claim = claims?.[0];
  const verdict = verdicts?.[0];
  const dispute = disputes?.[0];

  // Handlers --------------------------------------
  // View ------------------------------------------
  if (!claim) return <p>Loading...</p>;

  return (
    <>
      {isLoading && <Spinner />}
      <ClaimInfoLayout
        mainTitle="Claim"
        sidebarTitle="Verdict"
        main={<ClaimAndSources claim={claim} sources={sources} />}
        sidebar={
          verdict && (
            <VerdictAndEvidence verdict={verdict} evidences={evidences} />
          )
        }
      />
    </>
  );
};

export default ResolveDispute;
