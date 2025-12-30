import { useNavigate, useParams } from "react-router-dom";
import useLoad from "../api/useLoad.js";
import ClaimItem from "../entities/claims/ClaimItem.jsx";
import { SourceItem } from "../entities/sources/SourceItem.jsx";
import { Card, CardContainer } from "../UI/Card.jsx";
import SourceForm from "../entities/sources/SourceForm.jsx";
import ClaimForm from "../entities/claims/ClaimForm.jsx";
import API from "../api/API.js";
import { useState } from "react";
import { useAuth } from "../auth/useAuth.jsx";
import Action from "../UI/Actions.jsx";
import { Modal, useModal } from "../UI/Modal.jsx";
import { Spinner } from "../UI/Spinner.jsx";
import "./MyClaimInfo.scss";

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
  const [showSourceForm, setShowSourceForm] = useState(false);
  const [showSourceModifyForm, setShowSourceModifyForm] = useState(false);
  const [showClaimForm, setShowClaimForm] = useState(false);
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
    setShowSourceForm(true);
    setShowClaimForm(false);
    setShowButton(false);
  };

  const handleSourceSubmit = async (source) => {
    setIsLoading(true);
    try {
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
        setShowSourceForm(false);
        setShowButton(true);
        await loadSources(claimSourcesEndpoint);
      }
      return sourceResponse.isSuccess;
    } finally {
      setIsLoading(false);
    }
  };

  const handleClaimModifyClick = () => {
    setShowClaimForm(true);
    setShowSourceForm(false);
    setShowSourceModifyForm(false);
    setShowButton(true);
    setShowStatusChangeMessage(true);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const handleClaimModifySubmit = async (claim) => {
    const response = await API.put(
      `${putClaimEndpoint}/${claim.ClaimID}`,
      claim
    );
    if (response.isSuccess) {
      setShowClaimForm(false);
      setShowStatusChangeMessage(false);
      await loadClaim(claimEndpoint);
    }
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
    setShowSourceForm(false);
    setShowClaimForm(false);
    setShowButton(false);
    setShowStatusChangeMessage(true);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const handleSourceModifySubmit = async (source) => {
    setIsLoading(true);
    try {
      let data;
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
        data
      );
      if (response.isSuccess) {
        setShowSourceModifyForm(false);
        setShowButton(true);
        setShowStatusChangeMessage(false);
        setSelectedSource(null);
        console.log(claimSourcesEndpoint);
        await loadSources(claimSourcesEndpoint);
      }
      return response.isSuccess;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSourceDelete = async (id) => {
    setIsLoading(true);
    const deleteResponse = await API.delete(`${sourcesEndpoint}/${id}`);
    if (deleteResponse.isSuccess) {
      setShowSourceForm(false);
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
    setShowSourceForm(false);
    setShowSourceModifyForm(false);
    setShowClaimForm(false);
    setShowButton(true);
    setSelectedSource(null);
    setShowStatusChangeMessage(false);
  };

  const showClaimDeleteModal = () => {
    openClaimModal(
      <>
        <p>Are you sure you want to delete this claim?</p>
        <button onClick={handleClaimDelete}>Yes</button>
        <button onClick={closeClaimModal}>Cancel</button>
      </>
    );
  };

  const showSourceDeleteModal = (id) => {
    openSourceModal(
      <>
        <p>Are you sure you want to delete this source?</p>
        <button onClick={() => handleSourceDelete(id)}>Yes</button>
        <button onClick={closeSourceModal}>Cancel</button>
      </>
    );
  };

  // View ------------------------------------------
  if (!claim) return <p>Loading claim details...</p>;
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
      {showSourceForm && (
        <SourceForm onSubmit={handleSourceSubmit} onCancel={handleCancel} />
      )}
      {showSourceModifyForm && (
        <SourceForm
          onSubmit={handleSourceModifySubmit}
          onCancel={handleCancel}
          initialSource={selectedSource}
        />
      )}
      {showClaimForm && (
        <ClaimForm
          onSubmit={handleClaimModifySubmit}
          onCancel={handleCancel}
          initialClaim={claim[0]}
        />
      )}
      <CardContainer>
        <Card>
          <ClaimItem claim={claim[0]} />

          <Action.Tray>
            <Action.Modify onClick={handleClaimModifyClick} />
            <Action.Delete onClick={() => showClaimDeleteModal(claim)} />
          </Action.Tray>

          <h3>Attached sources:</h3>
          {sources && sources.length > 0 ? (
            sources.map((source) => (
              <div className="sourceItem" key={source.SourceID}>
                <SourceItem source={source} />
                <Action.Tray>
                  <Action.Modify
                    onClick={() => handleSourceModifyClick(source)}
                  />
                  <Action.Delete
                    onClick={() => showSourceDeleteModal(source.SourceID)}
                  />
                </Action.Tray>
              </div>
            ))
          ) : (
            <p>No sources attached.</p>
          )}

          {showButton && (
            <button onClick={handleAddSourceClick}>Add a source</button>
          )}
        </Card>
      </CardContainer>
    </>
  );
};

export default MyClaimInfo;
