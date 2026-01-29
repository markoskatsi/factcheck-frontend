import { useNavigate, useParams } from "react-router-dom";
import useLoad from "../api/useLoad.js";
import { useAuth } from "../auth/useAuth.jsx";
import ClaimItem from "../entities/claims/ClaimItem.jsx";
import SourcesItem from "../entities/sources/SourcesItem.jsx";
import API from "../api/API.js";
import { Modal, useModal } from "../UI/Modal.jsx";
import { useState } from "react";
import { Button, ButtonTray } from "../UI/Button.jsx";
import { Spinner } from "../UI/Spinner.jsx";
import { Card } from "../UI/Card.jsx";

const ClaimInfo = () => {
  // Initialisation --------------------------------
  const { claimId } = useParams();
  const { loggedInUser } = useAuth();
  const navigate = useNavigate();
  const claimsEndpoint = `/claims`;
  const assignedClaimsEndpoint = `/assignments`;

  // State -----------------------------------------
  const [claims, , , reloadClaims] = useLoad(claimsEndpoint);
  const [sources, , ,] = useLoad(`/sources/claims/${claimId}`);
  const [assignedClaims, , , reloadAssignedClaims] = useLoad(
    assignedClaimsEndpoint,
  );
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
    await reloadAssignedClaims(assignedClaimsEndpoint);
    await reloadClaims(claimsEndpoint);
    setIsLoading(false);
    navigate(`/mytasks/${claim.ClaimID}`);
    return assignmentResponse.isSuccess && response.isSuccess;
  };

  const handleAbandon = async () => {
    setIsLoading(true);
    const assignmentToDelete = assignedClaims.find(
      (assignment) =>
        assignment.AssignmentClaimID === claim.ClaimID &&
        assignment.AssignmentUserID === loggedInUser?.UserID,
    );
    const deleteResponse = await API.delete(
      `/assignments/${assignmentToDelete.AssignmentID}`,
    );
    const response = await API.put(`/claims/${claim.ClaimID}`, {
      ...claim,
      ClaimClaimstatusID: 2,
    });
    await reloadAssignedClaims(assignedClaimsEndpoint);
    await reloadClaims(claimsEndpoint);
    setIsLoading(false);
    navigate(`/mytasks`);
    return deleteResponse.isSuccess && response.isSuccess;
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

      {isAssignedToUser && (
        <ButtonTray>
          <Button>Begin Work</Button>
          <Button variant="darkDanger" onClick={handleAbandon}>
            Abandon Claim
          </Button>
        </ButtonTray>
      )}
      <Card className="claim-details-card">
        {!isAssignedToUser && loggedInUser?.UserUsertypeID === 2 && (
          <Button variant="secondary" onClick={confrimAssignmentModal}>
            Assign claim
          </Button>
        )}
        <ClaimItem claim={claim} />
        <h3>Attached sources:</h3>
        <SourcesItem sources={sources} />
      </Card>
    </>
  );
};

export default ClaimInfo;
