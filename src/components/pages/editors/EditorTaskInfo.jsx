import { useParams } from "react-router-dom";
import useLoad from "../../api/useLoad.js";
import ClaimDetails from "../../entities/claims/ClaimAndSources.jsx";
import AnnotationDetails from "../../entities/annotations/AnnotationAndEvidence.jsx";
import { Button, ButtonTray } from "../../UI/Button.jsx";
import "../submitters/MyClaimInfo.scss";
import { useAuth } from "../../auth/useAuth.jsx";
import API from "../../api/API.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../UI/Spinner.jsx";
import VerdictForm from "../../entities/verdicts/VerdictForm.jsx";

const EditorTaskInfo = () => {
  // Initialisation --------------------------------
  const { loggedInUserID } = useAuth();
  const { claimId } = useParams();

  const navigate = useNavigate();

  const claimEndpoint = `/claims/${claimId}`;
  const claimSourcesEndpoint = `/sources/claims/${claimId}?orderby=SourceCreated%20desc`;
  const annotationClaimEndpoint = `/annotations/claims/${claimId}`;

  // State -----------------------------------------
  const [isLoading, setIsLoading] = useState(false);
  const [claims, , ,] = useLoad(claimEndpoint);
  const [annotations, , ,] = useLoad(annotationClaimEndpoint);
  const [sources, , ,] = useLoad(claimSourcesEndpoint);
  const [verdicts, , , loadVerdicts] = useLoad(`/verdicts`);

  const evidenceEndpoint = `/evidence/annotations/${annotations?.[0]?.AnnotationID}`;
  const [evidences, , ,] = useLoad(evidenceEndpoint);

  const claim = claims?.[0];
  const annotation = annotations?.[0];

  // Handlers --------------------------------------
  const handleSubmit = async (verdict) => {
    setIsLoading(true);
    const response = await API.post("/verdicts", verdict);
    console.log(response);
    console.log(verdict);
    if (response.isSuccess) {
      await loadVerdicts(`/verdicts`);
    }
    setIsLoading(false);
    return response.isSuccess;
  };
  // View ------------------------------------------
  if (!claim) return <p>Loading...</p>;
  return (
    <>
      {isLoading && <Spinner />}
      <VerdictForm onSubmit={handleSubmit} onCancel={() => {}} submitText="Save In Progress" />
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

export default EditorTaskInfo;
