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
import AnnotationAndEvidence from "../entities/annotations/AnnotationAndEvidence.jsx";
import EvidenceForm from "../entities/evidence/EvidenceForm.jsx";
import { AnnotationHandlers } from "../entities/annotations/AnnotationHandlers.jsx";
import { EvidenceHandlers } from "../entities/evidence/EvidenceHandlers.jsx";
import "./MyClaimInfo.scss";

const ClaimInfo = () => {
  // Initialisation --------------------------------
  const { claimId } = useParams();
  const { loggedInUser } = useAuth();
  const navigate = useNavigate();

  const claimEndpoint = `/claims/${claimId}`;
  const assignedClaimsEndpoint = `/assignments`;
  const claimSourcesEndpoint = `/sources/claims/${claimId}?orderby=SourceCreated%20desc`;
  const annotationClaimEndpoint = `/annotations/claims/${claimId}`;

  // State -----------------------------------------
  const [claim, , , reloadClaim] = useLoad(claimEndpoint);
  const [annotation, , , reloadAnnotation] = useLoad(annotationClaimEndpoint);
  const [sources, , ,] = useLoad(claimSourcesEndpoint);
  const [assignedClaims, , ,] = useLoad(assignedClaimsEndpoint);

  const evidenceEndpoint = `/evidence/annotations/${annotation?.[0]?.AnnotationID}`;
  const [evidences, , , reloadEvidences] = useLoad(evidenceEndpoint);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, modalContent, modalTitle, openModal, closeModal] =
    useModal(false);

  // Handlers --------------------------------------
  const [handleAddAnnotation, handleModifyAnnotation, handleDeleteAnnotation] =
    AnnotationHandlers({
      setIsLoading,
      reloadAnnotation,
      annotationClaimEndpoint,
      closeModal,
    });

  const [handleAddEvidence, handleModifyEvidence, handleDeleteEvidence] =
    EvidenceHandlers({
      setIsLoading,
      reloadEvidences,
      evidenceEndpoint,
      closeModal,
    });

  const canEdit = claim?.ClaimClaimstatusID === 3;

  const assignmentID = assignedClaims?.find(
    (assignment) =>
      assignment.AssignmentClaimID === claim?.[0]?.ClaimID &&
      assignment.AssignmentUserID === loggedInUser?.UserID,
  )?.AssignmentID;

  const handleAbandon = async () => {
    setIsLoading(true);
    const deleteResponse = await API.delete(`/assignments/${assignmentID}`);
    if (deleteResponse.isSuccess) {
      const response = await API.put(`/claims/${claim?.[0]?.ClaimID}`, {
        ...claim?.[0],
        ClaimClaimstatusID: 2,
      });
      await reloadClaim(claimEndpoint);
      setIsLoading(false);
      navigate(`/tasks`);
      return response.isSuccess;
    }
    setIsLoading(false);
    return false;
  };

  const handleSubmitWork = async () => {
    setIsLoading(true);
    const response = await API.put(`/claims/${claimId}`, {
      ...claim?.[0],
      ClaimClaimstatusID: 4,
    });
    if (response.isSuccess) {
      closeModal();
      await reloadClaim(claimEndpoint);
    }
    setIsLoading(false);
  };

  const deleteAnnotationModal = () => {
    openModal(
      <>
        <p>Are you sure you want to delete this annotation?</p>
        <ButtonTray>
          <Button
            onClick={() => handleDeleteAnnotation(annotation[0])}
            variant="darkDanger"
          >
            Delete
          </Button>
          <Button onClick={closeModal}>Cancel</Button>
        </ButtonTray>
      </>,
      "Delete Annotation",
    );
  };

  const addAnnotationsModal = () => {
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

  const modifyEvidenceModal = (evidence) => {
    openModal(
      <EvidenceForm
        onSubmit={handleModifyEvidence}
        onCancel={closeModal}
        initialEvidence={evidence}
      />,
      "Modify Evidence",
    );
  };

  const deleteEvidenceModal = (id) => {
    openModal(
      <>
        <p>Are you sure you want to delete this evidence?</p>
        <ButtonTray>
          <Button onClick={() => handleDeleteEvidence(id)} variant="darkDanger">
            Delete
          </Button>
          <Button onClick={closeModal}>Cancel</Button>
        </ButtonTray>
      </>,
      "Delete Evidence",
    );
  };

  const submitWorkModal = () => {
    openModal(
      <>
        <p>Are you sure you want to submit your work on this claim?</p>
        <ButtonTray>
          <Button onClick={handleSubmitWork} variant="secondary">
            Yes
          </Button>
          <Button onClick={closeModal}>No</Button>
        </ButtonTray>
      </>,
      "Submit Work",
    );
  };

  // View ------------------------------------------
  if (!claim) return <p>Claim not available.</p>;
  return (
    <>
      {isLoading && <Spinner />}
      <Modal className="Modal" show={showModal} title={modalTitle}>
        {modalContent}
      </Modal>

      <div className="claimInfoWrapper">
        {canEdit && (
          <ButtonTray>
            {!annotation && (
              <Button onClick={addAnnotationsModal} variant="secondary">
                Add Annotations
              </Button>
            )}
            <Button onClick={addEvidenceModal} variant="secondary">
              Add Evidence
            </Button>
            {annotation && evidences && (
              <Button onClick={submitWorkModal} variant="secondary">
                Submit Work
              </Button>
            )}
            <Button
              variant="darkDanger"
              disabled={annotation && annotation.length > 0}
              onClick={handleAbandon}
            >
              Abandon Claim
            </Button>
          </ButtonTray>
        )}

        <div className="claimLayout">
          <div className="claimMain">
            <h2>Claim</h2>
            <ClaimAndSources claim={claim?.[0]} sources={sources} />
          </div>
          <div className="claimSidebar">
            {annotation && (
              <>
                <h2>Your Work</h2>
                <AnnotationAndEvidence
                  annotation={annotation[0]}
                  evidences={evidences}
                  onAnnotationModify={canEdit && modifyAnnotationModal}
                  onAnnotationDelete={canEdit && deleteAnnotationModal}
                  onEvidenceModify={canEdit && modifyEvidenceModal}
                  onEvidenceDelete={canEdit && deleteEvidenceModal}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ClaimInfo;
