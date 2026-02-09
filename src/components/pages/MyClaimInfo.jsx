import { useNavigate, useParams } from "react-router-dom";
import useLoad from "../api/useLoad.js";
import SourceForm from "../entities/sources/SourceForm.jsx";
import ClaimForm from "../entities/claims/ClaimForm.jsx";
import API from "../api/API.js";
import { useState } from "react";
import { useAuth } from "../auth/useAuth.jsx";
import { Modal, useModal } from "../UI/Modal.jsx";
import { Spinner } from "../UI/Spinner.jsx";
import ClaimAndSources from "../entities/claims/ClaimAndSources.jsx";
import { Button, ButtonTray } from "../UI/Button.jsx";
import "./MyClaimInfo.scss";

const MyClaimInfo = () => {
  // Initialisation --------------------------------
  const navigate = useNavigate();
  const { claimId } = useParams();
  const { loggedInUserID } = useAuth();

  const claimEndpoint = `/claims/${claimId}`;
  const claimSourcesEndpoint = `/sources/claims/${claimId}?orderby=SourceCreated%20desc`;
  const putClaimEndpoint = `/claims`;
  const sourcesEndpoint = "/sources";

  // State -----------------------------------------
  const [claim, , , loadClaim] = useLoad(claimEndpoint);
  const [sources, , , loadSources] = useLoad(claimSourcesEndpoint);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, modalContent, modalTitle, openModal, closeModal] =
    useModal(false);

  // Handlers --------------------------------------
  const handleSourceSubmit = async (source) => {
    setIsLoading(true);
    let data;
    if (source.file) {
      data = new FormData();
      data.append("file", source.file);
      data.append("SourceFilename", source.SourceFilename);
      data.append("SourceDescription", source.SourceDescription);
      data.append("SourceSourcetypeID", source.SourceSourcetypeID);
      data.append("SourceClaimID", source.SourceClaimID);
    } else {
      data = source;
    }
    const sourceResponse = await API.post(sourcesEndpoint, data);
    if (sourceResponse.isSuccess) {
      closeModal();
      await loadSources(claimSourcesEndpoint);
    }
    setIsLoading(false);
    return sourceResponse.isSuccess;
  };

  const handleClaimModifySubmit = async (claim) => {
    setIsLoading(true);
    const response = await API.put(
      `${putClaimEndpoint}/${claim.ClaimID}`,
      claim,
    );
    if (response.isSuccess) {
      closeModal();
      await loadClaim(claimEndpoint);
    }
    setIsLoading(false);
    return response.isSuccess;
  };

  const handleClaimDelete = async () => {
    setIsLoading(true);
    const deleteResponse = await API.delete(claimEndpoint);
    setIsLoading(false);
    if (deleteResponse.isSuccess) {
      navigate("/myclaims");
    }
  };

  const handleSourceModifySubmit = async (source) => {
    setIsLoading(true);
    let data;
    if (!source.SourceURL && !source.file) {
    }
    if (source.file) {
      data = new FormData();
      data.append("file", source.file);
      data.append("SourceID", source.SourceID);
      data.append("SourceFilename", source.SourceFilename);
      data.append("SourceDescription", source.SourceDescription);
      data.append("SourceSourcetypeID", source.SourceSourcetypeID);
      data.append("SourceClaimID", source.SourceClaimID);
    } else {
      data = source;
    }
    const response = await API.put(
      `${sourcesEndpoint}/${source.SourceID}`,
      data,
    );
    if (response.isSuccess) {
      closeModal();
      console.log(claimSourcesEndpoint);
      await loadSources(claimSourcesEndpoint);
    }
    setIsLoading(false);
    return response.isSuccess;
  };

  const handleSourceDelete = async (id) => {
    setIsLoading(true);
    const deleteResponse = await API.delete(`${sourcesEndpoint}/${id}`);
    if (deleteResponse.isSuccess) {
      closeModal();
      await loadSources(claimSourcesEndpoint);
    }
    setIsLoading(false);
    return deleteResponse.isSuccess;
  };

  const handleCancel = () => {
    closeModal();
  };

  const deleteClaimModal = () => {
    openModal(
      <>
        <p>Are you sure you want to delete this claim?</p>
        <ButtonTray>
          <Button onClick={handleClaimDelete} variant="darkDanger">
            Delete
          </Button>
          <Button onClick={closeModal}>Cancel</Button>
        </ButtonTray>
      </>,
      "Delete Claim",
    );
  };

  const modifyClaimModal = () => {
    openModal(
      <>
        <div className="statusChangeMessage">
          <p style={{ color: "red" }}>
            Changing claim information will restart the verification process.
          </p>
        </div>
        <ClaimForm
          onSubmit={handleClaimModifySubmit}
          onCancel={handleCancel}
          initialClaim={claim[0]}
        />
      </>,
      "Modify Claim",
    );
  };

  const addSourceModal = () => {
    openModal(
      <SourceForm onSubmit={handleSourceSubmit} onCancel={handleCancel} />,
      "Add Source",
    );
  };

  const modifySourceModal = (source) => {
    openModal(
      <SourceForm
        onSubmit={handleSourceModifySubmit}
        onCancel={handleCancel}
        initialSource={source}
      />,
      "Modify Source",
    );
  };

  const deleteSourceModal = (id) => {
    openModal(
      <>
        <p>Are you sure you want to delete this source?</p>
        <ButtonTray>
          <Button onClick={() => handleSourceDelete(id)} variant="darkDanger">
            Delete
          </Button>
          <Button onClick={closeModal}>Cancel</Button>
        </ButtonTray>
      </>,
      "Delete Source",
    );
  };

  // View ------------------------------------------
  if (!claim) return <p>Loading claim details...</p>;
  if (claim[0]?.ClaimUserID !== loggedInUserID)
    return <p>Claim not available.</p>;
  return (
    <>
      {isLoading && <Spinner />}
      <Modal
        show={showModal}
        title={modalTitle}
        modalPaneClass={
          modalTitle.includes("Modify") || modalTitle.includes("Add")
            ? "Modal"
            : ""
        }
      >
        {modalContent}
      </Modal>
      <ClaimAndSources
        claim={claim[0]}
        sources={sources}
        onClaimModify={modifyClaimModal}
        onClaimDelete={() => deleteClaimModal(claim[0])}
        onSourceModify={modifySourceModal}
        onSourceDelete={deleteSourceModal}
        onAddSource={addSourceModal}
      />
    </>
  );
};

export default MyClaimInfo;
