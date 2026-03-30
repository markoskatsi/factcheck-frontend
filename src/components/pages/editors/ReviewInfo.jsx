import { useParams } from "react-router-dom";
import useLoad from "../../api/useLoad.js";
import ClaimAndSources from "../../entities/claims/ClaimAndSources.jsx";
import AnnotationAndEvidence from "../../entities/annotations/AnnotationAndEvidence.jsx";
import { Button, ButtonTray } from "../../UI/Button.jsx";
import "../submitters/MyClaimInfo.scss";
import { useAuth } from "../../auth/useAuth.jsx";
import API from "../../api/API.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../UI/Spinner.jsx";
import ClaimInfoLayout from "../../UI/ClaimInfoLayout.jsx";

const ReviewInfo = () => {
  // Initialisation --------------------------------
  const { loggedInUserID } = useAuth();
  const { claimId } = useParams();

  const navigate = useNavigate();

  const claimEndpoint = `/claims/${claimId}`;
  const claimSourcesEndpoint = `/sources/claims/${claimId}?orderby=SourceCreated%20desc`;
  const annotationClaimEndpoint = `/annotations/claims/${claimId}`;

  // State -----------------------------------------
  const [isLoading, setIsLoading] = useState(false);
  const [claims, , , reloadClaims] = useLoad(claimEndpoint);
  const [annotations, , ,] = useLoad(annotationClaimEndpoint);
  const [sources, , ,] = useLoad(claimSourcesEndpoint);

  const evidenceEndpoint = `/evidence/annotations/${annotations?.[0]?.AnnotationID}`;
  const [evidences, , ,] = useLoad(evidenceEndpoint);

  const claim = claims?.[0];
  const annotation = annotations?.[0];

  // Handlers --------------------------------------
  const handleAssignment = async () => {
    setIsLoading(true);
    const assignmentResponse = await API.post(`/assignments`, {
      AssignmentClaimID: claim.ClaimID,
      AssignmentUserID: loggedInUserID,
    });
    await reloadClaims(claimEndpoint);
    setIsLoading(false);
    navigate(`/verdict/${claim.ClaimID}`);
    return assignmentResponse.isSuccess;
  };
  // View ------------------------------------------
  if (!claim) return <p>Loading...</p>;
  return (
    <>
      {isLoading && <Spinner />}
      <ClaimInfoLayout
        mainTitle="Claim"
        sidebarTitle="Fact-Checkers Work"
        actions={<Button onClick={handleAssignment}>Assign to you</Button>}
        main={<ClaimAndSources claim={claim} sources={sources} />}
        sidebar={
          annotation && (
            <AnnotationAndEvidence
              annotation={annotation}
              evidences={evidences}
            />
          )
        }
      />
    </>
  );
};

export default ReviewInfo;
