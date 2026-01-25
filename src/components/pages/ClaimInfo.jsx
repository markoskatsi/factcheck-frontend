import { useParams } from "react-router-dom";
import useLoad from "../api/useLoad.js";
import ClaimCard from "../entities/claims/ClaimCard.jsx";
import { useAuth } from "../auth/useAuth.jsx";
import API from "../api/API.js";
import { Modal, useModal } from "../UI/Modal.jsx";
import { Button, ButtonTray } from "../UI/Button.jsx";

const ClaimInfo = () => {
  // Initialisation --------------------------------
  const { claimId } = useParams();
  const { loggedInUser } = useAuth();
  const claimsEndpoint = `/claims`;

  // State -----------------------------------------
  const [claims, , ,] = useLoad(claimsEndpoint);
  const [sources, , ,] = useLoad(`/sources/claims/${claimId}`);

  const [
    showAssignModal,
    assignModalContent,
    openAssignModal,
    closeAssignModal,
  ] = useModal(false);

  // Handlers --------------------------------------
  const claim = claims?.find((claim) => claim.ClaimID === parseInt(claimId));

  const handleAssignment = async () => {
    const response = await API.post(`/assignments`, {
      AssignmentClaimID: claim.ClaimID,
      AssignmentUserID: loggedInUser.UserID,
    });
    if (response.isSuccess) {
      closeAssignModal();
      alert("Claim assigned successfully.");
    }
    return response.isSuccess;
  };

  // View ------------------------------------------
  const modalContent = () => {
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
      <Modal className="Modal" show={showAssignModal} title="Assign Claim">
        {assignModalContent}
      </Modal>
      {loggedInUser?.UserUsertypeID === 2 && (
        <Button variant="secondary" onClick={modalContent}>
          Assign claim
        </Button>
      )}
      <ClaimCard claim={claim} sources={sources} />
    </>
  );
};

export default ClaimInfo;
