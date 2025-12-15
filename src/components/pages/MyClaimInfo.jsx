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

  const [showSourceForm, setShowSourceForm] = useState(false);
  const [showClaimForm, setShowClaimForm] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [showModal, modalContent, openModal, closeModal] = useModal(false);

  // Handlers --------------------------------------
  const handleAddSourceClick = () => {
    setShowSourceForm(true);
    setShowClaimForm(false);
    setShowButton(false);
  };

  const handleSourceSubmit = async (source) => {
    const sourceResponse = await API.post(sourcesEndpoint, source);
    if (sourceResponse.isSuccess) {
      setShowSourceForm(false);
      setShowButton(true);
      await loadSources(claimSourcesEndpoint);
    }
    return sourceResponse.isSuccess;
  };

  const handleClaimModifyClick = () => {
    setShowClaimForm(true);
    setShowSourceForm(false);
    setShowButton(true);
  };

  const handleClaimModifySubmit = async (claim) => {
    const response = await API.put(
      `${putClaimEndpoint}/${claim.ClaimID}`,
      claim
    );
    if (response.isSuccess) {
      setShowClaimForm(false);
      await loadClaim(claimEndpoint);
    }
    return response.isSuccess;
  };

  const handleClaimDelete = async () => {
    const deleteResponse = await API.delete(claimEndpoint);
    if (deleteResponse.isSuccess) {
      navigate("/myclaims");
    }
  };

  const handleSourceDelete = async (id) => {
    const deleteResponse = await API.delete(`${sourcesEndpoint}/${id}`);
    if (deleteResponse.isSuccess) {
      await loadSources(claimSourcesEndpoint);
    }
  };

  const handleCancel = () => {
    setShowSourceForm(false);
    setShowClaimForm(false);
    setShowButton(true);
  };

  const showDeleteModal = () => {
    openModal(
      <>
        <p>Are you sure you want to delete this claim?</p>
        <button onClick={handleClaimDelete}>Yes</button>
        <button onClick={closeModal}>Cancel</button>
      </>
    );
  };

  // View ------------------------------------------
  if (!claim) return <p>Loading claim details...</p>;
  if (claim[0]?.ClaimUserID !== loggedInUserID)
    return <p>Claim not available.</p>;
  return (
    <>
      <Modal show={showModal} title="Delete Claim">
        {modalContent}
      </Modal>

      {showSourceForm && (
        <SourceForm onSubmit={handleSourceSubmit} onCancel={handleCancel} />
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
            <Action.Delete onClick={() => showDeleteModal(claim)} />
          </Action.Tray>

          <h3>Attached sources:</h3>
          {sources ? (
            sources.map((source) => (
              <div className="sourceItem" key={source.SourceID}>
                <SourceItem source={source} />
                <Action.Tray>
                  <Action.Delete
                    onClick={() => handleSourceDelete(source.SourceID)}
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
