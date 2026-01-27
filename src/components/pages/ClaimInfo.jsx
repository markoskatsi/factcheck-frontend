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
  const assignedClaimsEndpoint = `/assignments`;

  // State -----------------------------------------
  const [claims, , ,] = useLoad(claimsEndpoint);
  const [sources, , ,] = useLoad(`/sources/claims/${claimId}`);
  const [assignedClaims, , ,] = useLoad(assignedClaimsEndpoint);
  const [isLoading, setIsLoading] = useState(false);
  const [
    showAssignModal,
    assignModalContent,
    openAssignModal,
    closeAssignModal,
  ] = useModal(false);

  // Handlers --------------------------------------
  const claim = claims?.find((claim) => claim.ClaimID === parseInt(claimId));
  const isAssignedToUser = assignedClaims?.some(
    (claim) =>
      claim.AssignmentClaimID === parseInt(claimId) &&
      claim.AssignmentUserID === loggedInUser?.UserID,
  );

  const handleAssignment = async () => {
    closeAssignModal();
    setIsLoading(true);
    const assignmentResponse = await API.post(`/assignments`, {
      AssignmentClaimID: claim.ClaimID,
      AssignmentUserID: loggedInUser?.UserID,
    });
    const response = await API.put(`/claims/${claim.ClaimID}`, {
      ...claim,
      ClaimClaimstatusID: 3,
    });
    setIsLoading(false);
    return assignmentResponse.isSuccess && response.isSuccess;
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
      {!isAssignedToUser && loggedInUser?.UserUsertypeID === 2 && (
        <Button variant="secondary" onClick={confrimAssignmentModal}>
          Assign claim
        </Button>
      )}
      {isAssignedToUser && (
        <ButtonTray>
          <Button>Begin Work</Button>
          <Button variant="darkDanger">Abandon Claim</Button>
        </ButtonTray>
      )}
      <ClaimCard claim={claim} sources={sources} />
    </>
  );
};

export default ClaimInfo;
