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
import { Modal, useModal } from "../../UI/Modal.jsx";
import VerdictItem from "../../entities/verdicts/VerdictItem.jsx";

const EditorTaskInfo = () => {
  // Initialisation --------------------------------
  const { loggedInUserID } = useAuth();
  const { claimId } = useParams();

  const navigate = useNavigate();

  const claimEndpoint = `/claims/${claimId}`;
  const claimSourcesEndpoint = `/sources/claims/${claimId}?orderby=SourceCreated%20desc`;
  const annotationClaimEndpoint = `/annotations/claims/${claimId}`;
  const verdictsEndpoint = `/verdicts/claims/${claimId}`;

  // State -----------------------------------------
  const [isLoading, setIsLoading] = useState(false);
  const [claims, , ,] = useLoad(claimEndpoint);
  const [annotations, , ,] = useLoad(annotationClaimEndpoint);
  const [sources, , ,] = useLoad(claimSourcesEndpoint);
  const [verdicts, , , loadVerdicts] = useLoad(verdictsEndpoint);

  const [showModal, modalContent, modalTitle, openModal, closeModal] =
    useModal(false);

  const evidenceEndpoint = `/evidence/annotations/${annotations?.[0]?.AnnotationID}`;
  const [evidences, , ,] = useLoad(evidenceEndpoint);

  const claim = claims?.[0];
  const annotation = annotations?.[0];
  const verdict = verdicts?.[0];

  // Handlers --------------------------------------
  const handleSubmit = async (verdict) => {
    setIsLoading(true);
    const response = await API.post("/verdicts", verdict);
    if (response.isSuccess) {
      await loadVerdicts(verdictsEndpoint);
    }
    setIsLoading(false);
    closeModal();
    return response.isSuccess;
  };

  const handleModify = async (verdict) => {
    setIsLoading(true);
    const response = await API.put(`/verdicts/${verdict.VerdictID}`, verdict);
    if (response.isSuccess) {
      await loadVerdicts(verdictsEndpoint);
    }
    setIsLoading(false);
    closeModal();
    return response.isSuccess;
  };

  const addVerdictModal = () => {
    openModal(
      <>
        <VerdictForm onSubmit={handleSubmit} onCancel={closeModal} />
      </>,
      "Verdict Form",
    );
  };

  const modifyVerdictModal = () => {
    openModal(
      <>
        <VerdictForm
          onSubmit={handleModify}
          onCancel={closeModal}
          initialVerdict={verdict}
        />
      </>,
      "Modify Verdict",
    );
  };

  const deleteVerdictModal = () => {
    openModal(
      <>
        <p>Are you sure you want to delete this verdict?</p>
        <ButtonTray>
          <Button onClick={closeModal}>Cancel</Button>
        </ButtonTray>
      </>,
      "Delete Verdict",
    );
  };

  // View ------------------------------------------
  if (!claim) return <p>Loading...</p>;
  return (
    <>
      {isLoading && <Spinner />}
      <Modal modalPaneClass="Modal" show={showModal} title={modalTitle}>
        {modalContent}
      </Modal>
      <div className="claimInfoWrapper">
        {!verdict ? (
          <Button onClick={addVerdictModal}>Start Work</Button>
        ) : (
          <VerdictItem
            verdict={verdict}
            onModify={modifyVerdictModal}
            onDelete={deleteVerdictModal}
          />
        )}
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
