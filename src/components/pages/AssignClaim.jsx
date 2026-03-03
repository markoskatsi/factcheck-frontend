import { useNavigate, useParams } from "react-router-dom";
import useLoad from "../api/useLoad.js";
import { useAuth } from "../auth/useAuth.jsx";
import ClaimAndSources from "../entities/claims/ClaimAndSources.jsx";
import API from "../api/API.js";
import { Modal, useModal } from "../UI/Modal.jsx";
import { useState } from "react";
import { Button, ButtonTray } from "../UI/Button.jsx";
import Spinner from "react-spinner";
import PageNotFound from "./404.jsx";

const AssignClaim = () => {
  // Initialisation --------------------------------
  const { claimId } = useParams();
  const { loggedInUser } = useAuth();
  const navigate = useNavigate();

  const claimsEndpoint = `/claims/${claimId}`;
  const claimSourcesEndpoint = `/sources/claims/${claimId}?orderby=SourceCreated%20desc`;

  // State -----------------------------------------
  const [claims, , , reloadClaims] = useLoad(claimsEndpoint);
  const [sources, , ,] = useLoad(claimSourcesEndpoint);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, modalContent, modalTitle, openModal, closeModal] =
    useModal(false);

  // Handlers --------------------------------------
  const claim = claims?.[0];

  const handleAssignment = async () => {
    closeModal();
    setIsLoading(true);
    const assignmentResponse = await API.post(`/assignments`, {
      AssignmentClaimID: claim.ClaimID,
      AssignmentUserID: loggedInUser?.UserID,
    });
    if (assignmentResponse.isSuccess) {
      const response = await API.put(`/claims/${claim.ClaimID}`, {
        ...claim,
        ClaimClaimstatusID: 3,
      });
      await reloadClaims(claimsEndpoint);
      setIsLoading(false);
      navigate(`/tasks/${claim.ClaimID}`);
      return response.isSuccess;
    }
    setIsLoading(false);
    return false;
  };

  const confirmAssignmentModal = () => {
    openModal(
      <div>
        <p>Are you sure you want to assign this claim?</p>
        <ButtonTray>
          <Button onClick={handleAssignment} variant="secondary">
            Yes
          </Button>
          <Button onClick={closeModal}>No</Button>
        </ButtonTray>
      </div>,
      "Assign Claim",
    );
  };

  // View ------------------------------------------

  if (!claims) return <p>Loading...</p>;
  if (!claim || loggedInUser.UserUsertypeID !== 2) return <PageNotFound />;
  return (
    <>
      {isLoading && <Spinner />}
      <Modal className="Modal" show={showModal} title={modalTitle}>
        {modalContent}
      </Modal>
      <ButtonTray>
        <Button variant="secondary" onClick={confirmAssignmentModal}>
          Assign claim
        </Button>
      </ButtonTray>
      <ClaimAndSources claim={claim} sources={sources} />
    </>
  );
};

export default AssignClaim;
