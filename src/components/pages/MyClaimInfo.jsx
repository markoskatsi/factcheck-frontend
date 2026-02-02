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

const MyClaimInfo = () => {
  // Initialisation --------------------------------
  const navigate = useNavigate();
  const { claimId } = useParams();
  const { loggedInUserID } = useAuth();

  const claimEndpoint = `/claims/${claimId}`;
  const claimSourcesEndpoint = `/sources/claims/${claimId}`;
  const putClaimEndpoint = `/claims`;
  const sourcesEndpoint = "/sources";

  // State -----------------------------------------
  const [claim, , , loadClaim] = useLoad(claimEndpoint);
  const [sources, , , loadSources] = useLoad(claimSourcesEndpoint);

  const [showButton, setShowButton] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [
    showClaimDeleteModal,
    claimDeleteModalContent,
    openClaimDeleteModal,
    closeClaimDeleteModal,
  ] = useModal(false);
  const [
    showClaimModifyModal,
    claimModifyModalContent,
    openClaimModifyModal,
    closeClaimModifyModal,
  ] = useModal(false);
  const [
    showSourceAddModal,
    sourceAddModalContent,
    openSourceAddModal,
    closeSourceAddModal,
  ] = useModal(false);
  const [
    showSourceModifyModal,
    sourceModifyModalContent,
    openSourceModifyModal,
    closeSourceModifyModal,
  ] = useModal(false);

  // Handlers --------------------------------------
  const handleAddSourceClick = () => {
    setShowButton(false);
    addSourceModal();
  };

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
      setShowButton(true);
      closeSourceAddModal();
      await loadSources(claimSourcesEndpoint);
    }
    setIsLoading(false);
    return sourceResponse.isSuccess;
  };

  const handleClaimModifyClick = () => {
    setShowButton(true);
    modifyClaimModal();
  };

  const handleClaimModifySubmit = async (claim) => {
    setIsLoading(true);
    const response = await API.put(
      `${putClaimEndpoint}/${claim.ClaimID}`,
      claim,
    );
    if (response.isSuccess) {
      closeClaimModifyModal();
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

  const handleSourceModifyClick = (source) => {
    setShowButton(false);
    modifySourceModal(source);
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
      setShowButton(true);
      closeSourceModifyModal();
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
      setShowButton(true);
      closeSourceAddModal();
      await loadSources(claimSourcesEndpoint);
    }
    setIsLoading(false);
    return deleteResponse.isSuccess;
  };

  const handleCancel = () => {
    closeSourceAddModal();
    closeSourceModifyModal();
    closeClaimModifyModal();
    setShowButton(true);
  };

  const deleteClaimModal = () => {
    openClaimDeleteModal(
      <>
        <p>Are you sure you want to delete this claim?</p>
        <ButtonTray>
          <Button onClick={handleClaimDelete} variant="darkDanger">
            Delete
          </Button>
          <Button onClick={closeClaimDeleteModal}>Cancel</Button>
        </ButtonTray>
      </>,
    );
  };

  const modifyClaimModal = () => {
    openClaimModifyModal(
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
    );
  };

  const addSourceModal = () => {
    openSourceAddModal(
      <SourceForm onSubmit={handleSourceSubmit} onCancel={handleCancel} />,
    );
  };

  const modifySourceModal = (source) => {
    openSourceModifyModal(
      <SourceForm
        onSubmit={handleSourceModifySubmit}
        onCancel={handleCancel}
        initialSource={source}
      />,
    );
  };

  const deleteSourceModal = (id) => {
    openSourceAddModal(
      <>
        <p>Are you sure you want to delete this source?</p>
        <ButtonTray>
          <Button onClick={() => handleSourceDelete(id)} variant="darkDanger">
            Delete
          </Button>
          <Button onClick={closeSourceAddModal}>Cancel</Button>
        </ButtonTray>
      </>,
    );
  };

  // View ------------------------------------------
  if (!claim) return <p>Loading claim details...</p>;

  const isOwner = loggedInUserID && claim[0]?.ClaimUserID === loggedInUserID;

  if (claim[0]?.ClaimUserID !== loggedInUserID)
    return <p>Claim not available.</p>;
  return (
    <>
      {isLoading && <Spinner />}
      <Modal show={showClaimDeleteModal} title="Delete Claim">
        {claimDeleteModalContent}
      </Modal>
      <Modal show={showSourceAddModal} title="Add Source">
        {sourceAddModalContent}
      </Modal>
      <Modal show={showSourceModifyModal} title="Modify Source">
        {sourceModifyModalContent}
      </Modal>
      <Modal show={showClaimModifyModal} title="Modify Claim">
        {claimModifyModalContent}
      </Modal>
      <ClaimAndSources
        claim={claim[0]}
        sources={sources}
        isOwner={isOwner}
        onClaimModify={handleClaimModifyClick}
        onClaimDelete={() => deleteClaimModal(claim[0])}
        onSourceModify={handleSourceModifyClick}
        onSourceDelete={deleteSourceModal}
        showButton={showButton}
        onAddSource={handleAddSourceClick}
      />
    </>
  );
};

export default MyClaimInfo;
