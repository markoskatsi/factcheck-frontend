import { useParams } from "react-router-dom";
import useLoad from "../api/useLoad.js";
import ClaimCard from "../entities/claims/ClaimCard.jsx";
import { useAuth } from "../auth/useAuth.jsx";
import API from "../api/API.js";
import { Modal, useModal } from "../UI/Modal.jsx";
import { useState } from "react";
import { Button, ButtonTray } from "../UI/Button.jsx";
import { Spinner } from "../UI/Spinner.jsx";

const ClaimInfo = () => {
  // Initialisation --------------------------------
  const { claimId } = useParams();
  const { loggedInUser } = useAuth();
  const claimsEndpoint = `/claims`;

  // State -----------------------------------------
  const [claims, , ,] = useLoad(claimsEndpoint);
  const [sources, , ,] = useLoad(`/sources/claims/${claimId}`);
  const [isLoading, setIsLoading] = useState(false);

  const [
    showAssignModal,
    assignModalContent,
    openAssignModal,
    closeAssignModal,
  ] = useModal(false);

  // Handlers --------------------------------------
  const claim = claims?.find((claim) => claim.ClaimID === parseInt(claimId));

  const handleAssignment = async () => {
    closeAssignModal();
    setIsLoading(true);
    const response = await API.post(`/assignments`, {
      AssignmentClaimID: claim.ClaimID,
      AssignmentUserID: loggedInUser.UserID,
    });
    setIsLoading(false);
    return response.isSuccess;
  };

  // View ------------------------------------------
  const confrimAssignmentModal = () => {
    openAssignModal(
      <div>
        <p>Are you sure you want to assign this claim?</p>
        <ButtonTray>
          <Button onClick={handleAssignment} variant="secondary">
            Yes
          </Button>
          <Button onClick={closeAssignModal}>No</Button>
        </ButtonTray>
      </div>,
    );
  };

  if (!claims) return <p>Loading...</p>;
  if (!claim) return <p>Claim not available.</p>;
  return (
    <>
      {isLoading && <Spinner />}
      <Modal className="Modal" show={showAssignModal} title="Assign Claim">
        {assignModalContent}
      </Modal>
      {loggedInUser?.UserUsertypeID === 2 && (
        <Button variant="secondary" onClick={confrimAssignmentModal}>
          Assign claim
        </Button>
      )}
      <ClaimCard claim={claim} sources={sources} />
    </>
  );
};

export default ClaimInfo;
