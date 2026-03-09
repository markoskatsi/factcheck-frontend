import { useParams } from "react-router-dom";
import useLoad from "../../api/useLoad.js";
import ClaimAndSources from "../../entities/claims/ClaimAndSources.jsx";
import { Button, ButtonTray } from "../../UI/Button.jsx";
import API from "../../api/API.js";
import { useState } from "react";
import { Spinner } from "../../UI/Spinner.jsx";
import { useNavigate } from "react-router-dom";
import "../submitters/MyClaimInfo.scss";

const TriageInfo = () => {
  // Initialisation --------------------------------
  const { claimId } = useParams();
  const claimEndpoint = `/claims/${claimId}`;
  const claimSourcesEndpoint = `/sources/claims/${claimId}?orderby=SourceCreated%20desc`;

  const navigate = useNavigate();

  // State -----------------------------------------
  const [claims, , , reloadClaims] = useLoad(claimEndpoint);
  const [sources, , ,] = useLoad(claimSourcesEndpoint);
  const [isLoading, setIsLoading] = useState(false);

  const claim = claims?.[0];

  // Handlers --------------------------------------
  const handleAccept = async () => {
    setIsLoading(true);
    const response = await API.put(`/claims/${claim.ClaimID}`, {
      ...claim,
      ClaimClaimstatusID: 2,
    });
    response.isSuccess && (await reloadClaims(claimEndpoint));
    setIsLoading(false);
    alert(response.isSuccess ? "Claim accepted" : "Error accepting claim");
    navigate("/triage");
    return response.isSuccess;
  };

  const handleReject = async () => {
    setIsLoading(true);
    const response = await API.put(`/claims/${claim.ClaimID}`, {
      ...claim,
      ClaimClaimstatusID: 6,
    });
    setIsLoading(false);
    alert(response.isSuccess ? "Claim rejected" : "Error rejecting claim");
    navigate("/triage");
    return response.isSuccess;
  };

  // View ------------------------------------------
  if (!claim) return null;

  return (
    <>
      {isLoading && <Spinner />}
      <ButtonTray>
        <Button onClick={handleAccept}>Accept</Button>
        <Button onClick={handleReject} variant="darkDanger">
          Reject
        </Button>
      </ButtonTray>
      <ClaimAndSources claim={claim} sources={sources} />
    </>
  );
};

export default TriageInfo;
