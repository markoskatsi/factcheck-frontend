import { Card } from "../../UI/Card.jsx";
import VerdictItem from "./VerdictItem.jsx";
import EvidencesMap from "../evidence/EvidencesMap.jsx";
import Accordion from "../../UI/Accordion.jsx";
import useLoad from "../../api/useLoad.js";
import { useParams } from "react-router-dom";
import { useAuth } from "../../auth/useAuth.jsx";
import { useState } from "react";
import API from "../../api/API.js";
import { Button, ButtonTray } from "../../UI/Button.jsx";
import { Modal, useModal } from "../../UI/Modal.jsx";
import DisputeForm from "../disputes/DisputeForm.jsx";
import { useNavigate } from "react-router-dom";
import Icon from "../../UI/Icons.jsx";

export default function VerdictAndEvidence({ verdict, evidences }) {
  const evidenceCount = evidences?.length ?? 0;
  const { claimId } = useParams();
  const { loggedInUserID } = useAuth();
  const navigate = useNavigate();

  const claimEndpoint = `/claims/${claimId}`;

  const [claims, , , loadClaims] = useLoad(claimEndpoint);
  const [showModal, modalContent, modalTitle, openModal, closeModal] =
    useModal(false);

  const [
    showConfirmationModal,
    modalConfirmationContent,
    modalConfirmationTitle,
    openConfirmationModal,
    closeConfirmationModal,
  ] = useModal(false);

  const claim = claims?.[0];

  const handleSubmitDispute = async (dispute) => {
    const response = await API.post("/disputes", {
      ...dispute,
      DisputeVerdictID: verdict.VerdictID,
      DisputeOutcome: 0,
    });
    if (response.isSuccess) {
      await disputeOpened();
      closeConfirmationModal();
    }
    return response.isSuccess;
  };

  const disputeOpened = async () => {
    const response = await API.put(`/claims/${claimId}`, {
      ...claim,
      ClaimClaimstatusID: 8,
    });
    await loadClaims(claimEndpoint);
    navigate(`/myclaims/${claimId}`);
    return response.isSuccess;
  };

  const openDisputeModal = () => {
    openModal(
      <DisputeForm onSubmit={showConfirmation} onCancel={closeModal} />,
      "Open Dispute",
    );
  };

  const showConfirmation = (dispute) => {
    closeModal();
    openConfirmationModal(
      <>
        <p style={{ color: "red" }}>
          Opening a dispute MAY restart the verification process.
        </p>
        <p>Are you sure you want to continue?</p>
        <ButtonTray>
          <Button
            onClick={() => handleSubmitDispute(dispute)}
            variant="darkDanger"
          >
            <Icon.Tick />
            Proceed
          </Button>
          <Button onClick={closeConfirmationModal}>
            <Icon.Cross />
            Cancel
          </Button>
        </ButtonTray>
      </>,
      "Confirm Dispute",
    );
  };

  return (
    <>
      <Modal className="Modal" show={showModal} title={modalTitle}>
        {modalContent}
      </Modal>

      <Modal
        className="Modal"
        show={showConfirmationModal}
        title={modalConfirmationTitle}
      >
        {modalConfirmationContent}
      </Modal>

      <Card className="claim-details-card">
        {claim?.ClaimClaimstatusID === 5 &&
          loggedInUserID === claim?.ClaimUserID && (
            <Button onClick={openDisputeModal} variant="orange">
              Open Dispute
            </Button>
          )}
        <VerdictItem verdict={verdict} />
        <Accordion title={`Attached Evidence (${evidenceCount})`}>
          <EvidencesMap evidences={evidences} />
        </Accordion>
      </Card>
    </>
  );
}
