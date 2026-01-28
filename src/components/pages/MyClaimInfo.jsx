import { useNavigate, useParams } from "react-router-dom";
import useLoad from "../api/useLoad.js";
import SourceForm from "../entities/sources/SourceForm.jsx";
import ClaimForm from "../entities/claims/ClaimForm.jsx";
import API from "../api/API.js";
import { useState } from "react";
import { useAuth } from "../auth/useAuth.jsx";
import { Modal, useModal } from "../UI/Modal.jsx";
import { Spinner } from "../UI/Spinner.jsx";
import { Card, CardContainer } from "../UI/Card.jsx";
import ClaimItem from "../entities/claims/ClaimItem.jsx";
import SourcesItem from "../entities/sources/SourcesItem.jsx";
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

  const [showStatusChangeMessage, setShowStatusChangeMessage] = useState(false);
  const [showSourceAddForm, setShowSourceAddForm] = useState(false);
  const [showSourceModifyForm, setShowSourceModifyForm] = useState(false);
  const [showClaimModifyForm, setShowClaimModifyForm] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [selectedSource, setSelectedSource] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [showClaimModal, claimModalContent, openClaimModal, closeClaimModal] =
    useModal(false);
  const [
    showSourceModal,
    sourceModalContent,
    openSourceModal,
    closeSourceModal,
  ] = useModal(false);

  // Handlers --------------------------------------
  const handleAddSourceClick = () => {
    setShowSourceAddForm(true);
    setShowClaimModifyForm(false);
    setShowButton(false);
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
      setShowSourceAddForm(false);
      setShowButton(true);
      await loadSources(claimSourcesEndpoint);
    }
    setIsLoading(false);
    return sourceResponse.isSuccess;
  };

  const handleClaimModifyClick = () => {
    setShowClaimModifyForm(true);
    setShowSourceAddForm(false);
    setShowSourceModifyForm(false);
    setShowButton(true);
    setShowStatusChangeMessage(true);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const handleClaimModifySubmit = async (claim) => {
    setIsLoading(true);
    const response = await API.put(
      `${putClaimEndpoint}/${claim.ClaimID}`,
      claim,
    );
    if (response.isSuccess) {
      setShowClaimModifyForm(false);
      setShowStatusChangeMessage(false);
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
    setSelectedSource(source);
    setShowSourceModifyForm(true);
    setShowSourceAddForm(false);
    setShowClaimModifyForm(false);
    setShowButton(false);
    setShowStatusChangeMessage(true);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
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
      setShowSourceModifyForm(false);
      setShowButton(true);
      setShowStatusChangeMessage(false);
      setSelectedSource(null);
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
      setShowSourceAddForm(false);
      setShowSourceModifyForm(false);
      setSelectedSource(null);
      setShowButton(true);
      closeSourceModal();
      await loadSources(claimSourcesEndpoint);
    }
    setIsLoading(false);
    return deleteResponse.isSuccess;
  };

  const handleCancel = () => {
    setShowSourceAddForm(false);
    setShowSourceModifyForm(false);
    setShowClaimModifyForm(false);
    setShowButton(true);
    setSelectedSource(null);
    setShowStatusChangeMessage(false);
  };

  const showClaimDeleteModal = () => {
    openClaimModal(
      <>
        <p>Are you sure you want to delete this claim?</p>
        <ButtonTray>
          <Button onClick={handleClaimDelete} variant="darkDanger">
            Delete
          </Button>
          <Button onClick={closeClaimModal}>Cancel</Button>
        </ButtonTray>
      </>,
    );
  };

  const showSourceDeleteModal = (id) => {
    openSourceModal(
      <>
        <p>Are you sure you want to delete this source?</p>
        <ButtonTray>
          <Button onClick={() => handleSourceDelete(id)} variant="darkDanger">
            Delete
          </Button>
          <Button onClick={closeSourceModal}>Cancel</Button>
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
      <Modal show={showClaimModal} title="Delete Claim">
        {claimModalContent}
      </Modal>
      <Modal show={showSourceModal} title="Delete Source">
        {sourceModalContent}
      </Modal>
      {showStatusChangeMessage && (
        <div className="statusChangeMessage">
          <p style={{ color: "red" }}>
            Changing claim information will restart the verification process.
          </p>
        </div>
      )}
      {showSourceAddForm && (
        <SourceForm onSubmit={handleSourceSubmit} onCancel={handleCancel} />
      )}
      {showSourceModifyForm && (
        <SourceForm
          onSubmit={handleSourceModifySubmit}
          onCancel={handleCancel}
          initialSource={selectedSource}
        />
      )}
      {showClaimModifyForm && (
        <ClaimForm
          onSubmit={handleClaimModifySubmit}
          onCancel={handleCancel}
          initialClaim={claim[0]}
        />
      )}

      <ClaimItem
        claim={claim[0]}
        isOwner={isOwner}
        onClaimModify={handleClaimModifyClick}
        onClaimDelete={() => showClaimDeleteModal(claim[0])}
      />
      <h3>Attached sources:</h3>
      <SourcesItem
        sources={sources}
        isOwner={isOwner}
        onSourceModify={handleSourceModifyClick}
        onSourceDelete={() => showSourceDeleteModal()}
        showButton={showButton}
        onAddSource={handleAddSourceClick}
      />
    </>
  );
};

export default MyClaimInfo;
