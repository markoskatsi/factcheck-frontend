import { useParams } from "react-router-dom";
import useLoad from "../../api/useLoad.js";
import ClaimAndSources from "../../entities/claims/ClaimAndSources.jsx";
import AnnotationAndEvidence from "../../entities/annotations/AnnotationAndEvidence.jsx";
import { Button, ButtonTray } from "../../UI/Button.jsx";
import "../submitters/MyClaimInfo.scss";
import API from "../../api/API.js";
import { useState } from "react";
import { Spinner } from "../../UI/Spinner.jsx";
import { DisputeItem } from "../../entities/disputes/DisputeItem.jsx";
import ClaimInfoLayout from "../../UI/ClaimInfoLayout.jsx";
import VerdictForm from "../../entities/verdicts/VerdictForm.jsx";
import { Modal, useModal } from "../../UI/Modal.jsx";
import Icon from "../../UI/Icons.jsx";
import VerdictItem from "../../entities/verdicts/VerdictItem.jsx";

const ResolveDispute = () => {
  // Initialisation --------------------------------
  const { claimId } = useParams();

  const claimEndpoint = `/claims/${claimId}`;
  const claimSourcesEndpoint = `/sources/claims/${claimId}?orderby=SourceCreated%20desc`;
  const annotationClaimEndpoint = `/annotations/claims/${claimId}`;
  const verdictEndpoint = `/verdicts/claims/${claimId}`;

  // State -----------------------------------------
  const [isLoading, setIsLoading] = useState(false);
  const [claims, , , loadClaims] = useLoad(claimEndpoint);
  const [annotations, , ,] = useLoad(annotationClaimEndpoint);
  const [sources, , ,] = useLoad(claimSourcesEndpoint);
  const [verdicts, , , loadVerdicts] = useLoad(verdictEndpoint);

  const [showModal, modalContent, modalTitle, openModal, closeModal] =
    useModal(false);

  const disputeEndpoint = `/disputes/verdicts/${verdicts?.[0]?.VerdictID}`;
  const [disputes, , , loadDisputes] = useLoad(disputeEndpoint);

  const evidenceEndpoint = `/evidence/annotations/${annotations?.[0]?.AnnotationID}`;
  const [evidences, , ,] = useLoad(evidenceEndpoint);

  const claim = claims?.[0];
  const verdict = verdicts?.[0];
  const dispute = disputes?.[0];
  const annotation = annotations?.[0];

  const canResolve =
    claim?.ClaimClaimstatusID === 8 && dispute?.DisputeOutcome === 0;

  // Handlers --------------------------------------
  const handleDismissDispute = async () => {
    setIsLoading(true);
    const disputeResponse = await API.put(`/disputes/${dispute.DisputeID}`, {
      ...dispute,
      DisputeOutcome: 2,
    });
    if (disputeResponse.isSuccess) {
      await API.put(`/claims/${claimId}`, {
        ...claim,
        ClaimClaimstatusID: 5,
      });
      await loadDisputes(disputeEndpoint);
      await loadClaims(claimEndpoint);
    }
    setIsLoading(false);
    closeModal();
  };

  const handleModifyVerdict = async (updatedVerdict) => {
    setIsLoading(true);
    const verdictResponse = await API.put(
      `/verdicts/${verdict.VerdictID}`,
      updatedVerdict,
    );
    if (verdictResponse.isSuccess) {
      const disputeResponse = await API.put(`/disputes/${dispute.DisputeID}`, {
        ...dispute,
        DisputeOutcome: 1,
      });
      if (disputeResponse.isSuccess) {
        await API.put(`/claims/${claimId}`, {
          ...claim,
          ClaimClaimstatusID: 5,
        });
        await loadVerdicts(verdictEndpoint);
        await loadDisputes(disputeEndpoint);
        await loadClaims(claimEndpoint);
      }
    }
    setIsLoading(false);
    closeModal();
    return verdictResponse.isSuccess;
  };

  const dismissDisputeModal = () => {
    openModal(
      <>
        <p>
          Are you sure you want to dismiss this dispute? The original verdict
          will stand.
        </p>
        <ButtonTray>
          <Button onClick={handleDismissDispute} variant="green">
            <Icon.Tick />
            Dismiss Dispute
          </Button>
          <Button onClick={closeModal}>
            <Icon.Cross />
            Cancel
          </Button>
        </ButtonTray>
      </>,
      "Dismiss Dispute",
    );
  };

  const editVerdictModal = () => {
    openModal(
      <>
        <VerdictForm
          onSubmit={handleModifyVerdict}
          onCancel={closeModal}
          initialVerdict={verdict}
        />
      </>,
      "Edit Verdict",
    );
  };

  // View ------------------------------------------
  if (!claim) return <p>Loading...</p>;

  const actions = canResolve && (
    <>
      <ButtonTray>
        <Button variant="green" onClick={dismissDisputeModal}>
          <Icon.Tick />
          Dismiss Dispute
        </Button>
        <Button variant="secondary" onClick={editVerdictModal}>
          <Icon.Pen />
          Edit Verdict
        </Button>
      </ButtonTray>
      {verdict && <VerdictItem verdict={verdict} />}
    </>
  );

  return (
    <>
      {isLoading && <Spinner />}
      <Modal modalPaneClass="Modal" show={showModal} title={modalTitle}>
        {modalContent}
      </Modal>
      <ClaimInfoLayout
        mainTitle="Claim"
        sidebarTitle="Fact-Checkers Work"
        actions={actions}
        main={<ClaimAndSources claim={claim} sources={sources} />}
        sidebar={
          <>
            {annotation && (
              <AnnotationAndEvidence
                annotation={annotation}
                evidences={evidences}
              />
            )}
          </>
        }
      />
    </>
  );
};

export default ResolveDispute;
