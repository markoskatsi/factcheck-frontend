import { useParams } from "react-router-dom";
import useLoad from "../../api/useLoad.js";
import ClaimDetails from "../../entities/claims/ClaimAndSources.jsx";
import AnnotationDetails from "../../entities/annotations/AnnotationAndEvidence.jsx";
import "../submitters/MyClaimInfo.scss";

const ReviewInfo = () => {
  // Initialisation --------------------------------
  const { claimId } = useParams();

  const claimEndpoint = `/claims/${claimId}`;
  const claimSourcesEndpoint = `/sources/claims/${claimId}?orderby=SourceCreated%20desc`;
  const annotationClaimEndpoint = `/annotations/claims/${claimId}`;

  // State -----------------------------------------
  const [claims, , ,] = useLoad(claimEndpoint);
  const [annotations, , ,] = useLoad(annotationClaimEndpoint);
  const [sources, , ,] = useLoad(claimSourcesEndpoint);

  const evidenceEndpoint = `/evidence/annotations/${annotations?.[0]?.AnnotationID}`;
  const [evidences, , , ] = useLoad(evidenceEndpoint);

  const claim = claims?.[0];
  const annotation = annotations?.[0];

  // Handlers --------------------------------------
  // View ------------------------------------------
  if (!claim) return <p>Claim not available.</p>;
  return (
    <>
      <div className="claimInfoWrapper">
        <div className="claimLayout">
          <div className="claimMain">
            <h2>Claim</h2>
            <ClaimDetails claim={claim} sources={sources} />
          </div>
          <div className="claimSidebar">
            {annotation && (
              <>
                <h2>Fact-Checkers Work</h2>
                <AnnotationDetails
                  annotation={annotation}
                  evidences={evidences}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewInfo;
