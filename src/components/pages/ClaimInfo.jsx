import { useNavigate, useParams } from "react-router-dom";
import useLoad from "../api/useLoad.js";
import { useAuth } from "../auth/useAuth.jsx";
import ClaimAndSources from "../entities/claims/ClaimAndSources.jsx";
import API from "../api/API.js";
import { Modal, useModal } from "../UI/Modal.jsx";
import { useState } from "react";
import { Button, ButtonTray } from "../UI/Button.jsx";
import { Spinner } from "../UI/Spinner.jsx";
import AnnotationForm from "../entities/annotations/AnnotationForm.jsx";
import { CardContainer } from "../UI/Card.jsx";
import AnnotationItem from "../entities/annotations/AnnotationItem.jsx";
import EvidenceForm from "../entities/evidence/EvidenceForm.jsx";
import EvidencesMap from "../entities/evidence/EvidencesMap.jsx";
import "./MyClaimInfo.scss";

const ClaimInfo = () => {
  // Initialisation --------------------------------
  const { claimId } = useParams();
  const { loggedInUser } = useAuth();
  const navigate = useNavigate();

  const claimsEndpoint = `/claims`;
  const assignedClaimsEndpoint = `/assignments`;
  const claimSourcesEndpoint = `/sources/claims/${claimId}?orderby=SourceCreated%20desc`;
  const annotationClaimEndpoint = `/annotations/claims/${claimId}`;
  const evidenceEndpoint = `/evidence`;

  // State -----------------------------------------
  const [claims, , , reloadClaims] = useLoad(claimsEndpoint);
  const [annotation, , , reloadAnnotation] = useLoad(annotationClaimEndpoint);
  const [sources, , ,] = useLoad(claimSourcesEndpoint);
  const [assignedClaims, , , reloadAssignedClaims] = useLoad(
    assignedClaimsEndpoint,
  );
  const [evidences, , , reloadEvidences] = useLoad(
    evidenceEndpoint,
  );

  const [isLoading, setIsLoading] = useState(false);
  const [showModal, modalContent, modalTitle, openModal, closeModal] =
    useModal(false);

  // Handlers --------------------------------------
  const claim = claims?.find((claim) => claim.ClaimID === parseInt(claimId));

  const isAssignedToUser = assignedClaims?.some(
    (claim) =>
      claim.AssignmentClaimID === parseInt(claimId) &&
      claim.AssignmentUserID === loggedInUser?.UserID,
  );

  const handleAssignment = async () => {
    closeModal();
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

  const handleAddEvidence = async (evidence) => {
    setIsLoading(true);
    const response = await API.post(`/evidence`, evidence);
    if (response.isSuccess) {
      await reloadEvidences(evidenceEndpoint);
      closeModal();
    }
    setIsLoading(false);
    return response.isSuccess;
  };

  const handleAddAnnotation = async (annotation) => {
    setIsLoading(true);
    const response = await API.post(`/annotations`, annotation);
    if (response.isSuccess) {
      await reloadAnnotation(annotationClaimEndpoint);
      closeModal();
    }
    setIsLoading(false);
    return response.isSuccess;
  };

  const handleModifyAnnotation = async (annotation) => {
    setIsLoading(true);
    const response = await API.put(
      `/annotations/${annotation.AnnotationID}`,
      annotation,
    );
    if (response.isSuccess) {
      await reloadAnnotation(annotationClaimEndpoint);
      closeModal();
    }
    setIsLoading(false);
    return response.isSuccess;
  };

  const handleAnnotationDelete = async () => {
    setIsLoading(true);
    console.log("Deleting annotation:", annotation[0].AnnotationID);
    const deleteResponse = await API.delete(
      `/annotations/${annotation[0].AnnotationID}`,
    );
    if (deleteResponse.isSuccess) {
      await reloadAnnotation(annotationClaimEndpoint);
      closeModal();
    }
    setIsLoading(false);
    return deleteResponse.isSuccess;
  };

  const deleteAnnotationModal = () => {
    openModal(
      <>
        <p>Are you sure you want to delete this annotation?</p>
        <ButtonTray>
          <Button onClick={handleAnnotationDelete} variant="darkDanger">
            Delete
          </Button>
          <Button onClick={closeModal}>Cancel</Button>
        </ButtonTray>
      </>,
      "Delete Annotation",
    );
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

  const addAnnotationsModal = () => {
    const assignmentID = assignedClaims?.find(
      (assignment) =>
        assignment.AssignmentClaimID === claim.ClaimID &&
        assignment.AssignmentUserID === loggedInUser?.UserID,
    )?.AssignmentID;

    openModal(
      <AnnotationForm
        onSubmit={handleAddAnnotation}
        onCancel={closeModal}
        initialAnnotation={{
          AnnotationAssignmentID: assignmentID,
        }}
      />,
      "Add Annotations",
    );
  };

  const modifyAnnotationModal = () => {
    openModal(
      <AnnotationForm
        onSubmit={handleModifyAnnotation}
        onCancel={closeModal}
        initialAnnotation={annotation[0]}
      />,
      "Modify Annotation",
    );
  };

  const addEvidenceModal = () => {
    const annotationID = annotation?.[0]?.AnnotationID;

    openModal(
      <EvidenceForm
        onSubmit={handleAddEvidence}
        onCancel={closeModal}
        initialEvidence={{
          EvidenceAnnotationID: annotationID,
        }}
      />,
      "Add Evidence",
    );
  };

  // View ------------------------------------------

  if (!claims) return <p>Loading...</p>;
  if (!claim) return <p>Claim not available.</p>;
  return (
    <>
      {isLoading && <Spinner />}
      <Modal className="Modal" show={showModal} title={modalTitle}>
        {modalContent}
      </Modal>

      <div className="claimInfoWrapper">
        <ButtonTray>
          {!isAssignedToUser && claim.ClaimClaimstatusID === 2 && (
            <Button variant="secondary" onClick={confirmAssignmentModal}>
              Assign claim
            </Button>
          )}
          {isAssignedToUser && (
            <>
              {!annotation && (
                <Button onClick={addAnnotationsModal} variant="secondary">
                  Add Annotations
                </Button>
              )}
              <Button onClick={addEvidenceModal} variant="secondary">
                Add Evidence
              </Button>
              <Button
                variant="darkDanger"
                disabled={annotation && annotation.length > 0}
                onClick={handleAbandon}
              >
                Abandon Claim
              </Button>
            </>
          )}
        </ButtonTray>

        <div className="claimLayout">
          <div className="claimMain">
            <ClaimAndSources claim={claim} sources={sources} />
          </div>
          <div className="claimSidebar">
            {annotation && annotation.length > 0 && (
              <CardContainer>
                <AnnotationItem
                  annotation={annotation[0]}
                  onAnnotationModify={modifyAnnotationModal}
                  onAnnotationDelete={deleteAnnotationModal}
                />
                <EvidencesMap evidences={evidences} />
              </CardContainer>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ClaimInfo;
