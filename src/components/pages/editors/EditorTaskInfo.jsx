import { useParams } from "react-router-dom";
import useLoad from "../../api/useLoad.js";
import ClaimDetails from "../../entities/claims/ClaimAndSources.jsx";
import AnnotationDetails from "../../entities/annotations/AnnotationAndEvidence.jsx";
import { Button, ButtonTray } from "../../UI/Button.jsx";
import "../submitters/MyClaimInfo.scss";
import API from "../../api/API.js";
import { useState } from "react";
import { Spinner } from "../../UI/Spinner.jsx";
import VerdictForm from "../../entities/verdicts/VerdictForm.jsx";
import { Modal, useModal } from "../../UI/Modal.jsx";
import Icon from "../../UI/Icons.jsx";
import VerdictItem from "../../entities/verdicts/VerdictItem.jsx";

const EditorTaskInfo = () => {
  // Initialisation --------------------------------
  const { claimId } = useParams();

  const claimEndpoint = `/claims/${claimId}`;
  const claimSourcesEndpoint = `/sources/claims/${claimId}?orderby=SourceCreated%20desc`;
  const annotationClaimEndpoint = `/annotations/claims/${claimId}`;
  const verdictsEndpoint = `/verdicts/claims/${claimId}`;

  // State -----------------------------------------
  const [isLoading, setIsLoading] = useState(false);
  const [claims, , , loadClaims] = useLoad(claimEndpoint);
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

  const canEdit = claim?.ClaimClaimstatusID === 4;

  // Handlers --------------------------------------
  const handleSubmitWork = async (claim) => {
    setIsLoading(true);
    const claimResponse = await API.put(`/claims/${claimId}`, {
      ...claim,
      ClaimClaimstatusID: 5,
    });
    if (claimResponse.isSuccess) {
      const verdictResponse = await API.put(`/verdicts/${verdict.VerdictID}`, {
        ...verdict,
        VerdictStatusID: 1,
      });
      await loadVerdicts(verdictsEndpoint);
      await loadClaims(claimEndpoint);
      setIsLoading(false);
      closeModal();
      return verdictResponse.isSuccess;
    }
  };

  // const handleUnsubmitWork = async (claim) => {
  //   setIsLoading(true);
  //   const claimResponse = await API.put(`/claims/${claimId}`, {
  //     ...claim,
  //     ClaimClaimstatusID: 4,
  //   });
  //   if (claimResponse.isSuccess) {
  //     const verdictResponse = await API.put(`/verdicts/${verdict.VerdictID}`, {
  //       ...verdict,
  //       VerdictStatusID: 3,
  //     });
  //     await loadVerdicts(verdictsEndpoint);
  //     await loadClaims(claimEndpoint);
  //     setIsLoading(false);
  //     return verdictResponse.isSuccess;
  //   }
  // };

  const handleSubmitVerdict = async (verdict) => {
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

  const handleDelete = async (verdict) => {
    setIsLoading(true);
    const response = await API.delete(`/verdicts/${verdict.VerdictID}`);
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
        <VerdictForm onSubmit={handleSubmitVerdict} onCancel={closeModal} />
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
          <Button onClick={() => handleDelete(verdict)} variant="darkDanger">
            <Icon.Trash />
            Delete
          </Button>
          <Button onClick={closeModal}> Cancel</Button>
        </ButtonTray>
      </>,
      "Delete Verdict",
    );
  };

  const submitVerdictModal = (claim) => {
    openModal(
      <>
        <p>Are you sure you want to submit this verdict?</p>
        <ButtonTray>
          <Button onClick={() => handleSubmitWork(claim)} variant="green">
            <Icon.Tick />
            Submit
          </Button>
          <Button onClick={closeModal}>
            <Icon.Cross />
            Cancel
          </Button>
        </ButtonTray>
      </>,
      "Submit Verdict",
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
        {/* <Button onClick={() => handleUnsubmitWork(claim)}>Unsubmit TEST</Button> */}
        {!verdict ? (
          <Button onClick={addVerdictModal}>Start Work</Button>
        ) : (
          <>
            {canEdit && (
              <Button
                variant="secondary"
                onClick={() => submitVerdictModal(claim)}
              >
                Submit Work
              </Button>
            )}
            <VerdictItem
              verdict={verdict}
              onModify={canEdit && modifyVerdictModal}
              onDelete={canEdit && deleteVerdictModal}
            />
          </>
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
