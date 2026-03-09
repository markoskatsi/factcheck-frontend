import { useParams } from "react-router-dom";
import useLoad from "../../api/useLoad.js";
import ClaimAndSources from "../../entities/claims/ClaimAndSources.jsx";
import { Button, ButtonTray } from "../../UI/Button.jsx";
import API from "../../api/API.js";
import { useState } from "react";
import { Spinner } from "../../UI/Spinner.jsx";
import { useNavigate } from "react-router-dom";
import { Modal, useModal } from "../../UI/Modal.jsx";
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
  const [showModal, modalContent, modalTitle, openModal, closeModal] =
    useModal(false);

  const claim = claims?.[0];

  // Handlers --------------------------------------
  const handleAccept = async (id) => {
    setIsLoading(true);
    const response = await API.put(`/claims/${id}`, {
      ...claim,
      ClaimClaimstatusID: 2,
    });
    response.isSuccess && (await reloadClaims(claimEndpoint));
    setIsLoading(false);
    alert(response.isSuccess ? "Claim accepted" : "Error accepting claim");
    navigate("/triage");
    return response.isSuccess;
  };

  const handleReject = async (id) => {
    setIsLoading(true);
    const response = await API.put(`/claims/${id}`, {
      ...claim,
      ClaimClaimstatusID: 6,
    });
    setIsLoading(false);
    alert(response.isSuccess ? "Claim rejected" : "Error rejecting claim");
    navigate("/triage");
    return response.isSuccess;
  };

  const rejectClaimModal = (id) => {
    openModal(
      <>
        <p>Are you sure you want to reject this claim?</p>
        <ButtonTray>
          <Button onClick={() => handleReject(id)} variant="darkDanger">
            Reject
          </Button>
          <Button onClick={closeModal}>Cancel</Button>
        </ButtonTray>
      </>,
      "Reject Claim",
    );
  };

  const acceptClaimModal = (id) => {
    openModal(
      <>
        <p>Accepting this claim will foward it to fact-checkers</p>
        <ButtonTray>
          <Button onClick={() => handleAccept(id)} variant="darkDanger">
            Proceed
          </Button>
          <Button onClick={closeModal}>Cancel</Button>
        </ButtonTray>
      </>,
      "Accept Claim",
    );
  };

  // View ------------------------------------------
  if (!claim) return null;

  return (
    <>
      {isLoading && <Spinner />}
      <Modal show={showModal} title={modalTitle}>
        {modalContent}
      </Modal>
      <ButtonTray>
        <Button onClick={() => acceptClaimModal(claim.ClaimID)}>Accept</Button>
        <Button
          onClick={() => rejectClaimModal(claim.ClaimID)}
          variant="darkDanger"
        >
          Reject
        </Button>
      </ButtonTray>
      <ClaimAndSources claim={claim} sources={sources} />
    </>
  );
};

export default TriageInfo;
