import { useParams } from "react-router-dom";
import useLoad from "../../api/useLoad.js";
import ClaimAndSources from "../../entities/claims/ClaimAndSources.jsx";
import { Button, ButtonTray } from "../../UI/Button.jsx";
import { Card } from "../../UI/Card.jsx";
import API from "../../api/API.js";
import { useState } from "react";
import { Spinner } from "../../UI/Spinner.jsx";
import { useNavigate } from "react-router-dom";
import { Modal, useModal } from "../../UI/Modal.jsx";
import Icon from "../../UI/Icons.jsx";
import { Dropdown } from "../../UI/Dropdown.jsx";
import "../submitters/MyClaimInfo.scss";

const TriageInfo = () => {
  // Initialisation --------------------------------
  const { claimId } = useParams();
  const claimEndpoint = `/claims/${claimId}`;
  const claimSourcesEndpoint = `/sources/claims/${claimId}?orderby=SourceCreated%20desc`;

  const navigate = useNavigate();

  // State -----------------------------------------
  const [claims, , , reloadClaims] = useLoad(claimEndpoint);
  const [users, , loadingUsersMessage] = useLoad("/users");
  const [user, setUser] = useState({});
  const [sources, , ,] = useLoad(claimSourcesEndpoint);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, modalContent, modalTitle, openModal, closeModal] =
    useModal(false);

  const claim = claims?.[0];

  // Handlers --------------------------------------
  const handleAccept = async (id) => {
    setIsLoading(true);
    const response = await API.put(`/claims/${id}`, {
      ...claim,
      ClaimClaimstatusID: 2,
    });
    response.isSuccess && (await reloadClaims(claimEndpoint));
    setIsLoading(false);
    alert(response.isSuccess ? "Claim accepted" : "Error accepting claim");
    navigate("/triage");
    return response.isSuccess;
  };

  const handleReject = async (id) => {
    setIsLoading(true);
    const response = await API.put(`/claims/${id}`, {
      ...claim,
      ClaimClaimstatusID: 6,
    });
    setIsLoading(false);
    alert(response.isSuccess ? "Claim rejected" : "Error rejecting claim");
    navigate("/triage");
    return response.isSuccess;
  };

  const handleChange = (e) => {
    const selectedValue = parseInt(e.target.value);
    if (selectedValue === 0) {
      setUser({});
    } else {
      const selectedUser = users.find((u) => u.UserID === selectedValue);
      setUser(selectedUser);
    }
  };

  const rejectClaimModal = (id) => {
    openModal(
      <>
        <p>Are you sure you want to reject this claim?</p>
        <ButtonTray>
          <Button onClick={() => handleReject(id)} variant="darkDanger">
            Reject
          </Button>
          <Button onClick={closeModal}>Cancel</Button>
        </ButtonTray>
      </>,
      "Reject Claim",
    );
  };

  const selectUserModal = () => {
    if (!users) {
      openModal(<p>Loading users...</p>, "Select Fact-Checker");
      return;
    }
    openModal(
      <>
        {users.length === 0 ? (
          <p>No dropdown options found</p>
        ) : (
          <select
            className="FormInput"
            name={"UserID"}
            value={user.UserID || 0}
            onChange={handleChange}
          >
            <option value={0}>Select an option</option>
            {users.map((user) => (
              <option key={user.UserID} value={user.UserID}>
                {user.UserFirstname} {user.UserLastname} ({user.UserEmail})
              </option>
            ))}
          </select>
        )}
        <ButtonTray>
          <Button variant="darkDanger" onClick={closeModal}>
            <Icon.Cross /> Close
          </Button>
        </ButtonTray>
      </>,
      "Select Fact-Checker",
    );
  };

  const acceptClaimModal = (id) => {
    openModal(
      <>
        <div className="option-card-tray">
          <Card
            className="option-card"
            onClick={() => {
              closeModal();
              selectUserModal();
            }}
          >
            <h3>Assign to Fact-Checker</h3>
            <p>Pick a specific fact-checker to handle this claim.</p>
          </Card>
          <Card className="option-card" onClick={() => handleAccept(id)}>
            <h3>Open Pool</h3>
            <p>Make available for any fact-checker to claim themselves.</p>
          </Card>
        </div>
        <ButtonTray>
          <Button onClick={closeModal && setUser({})} variant="darkDanger">
            <Icon.Cross /> Cancel
          </Button>
        </ButtonTray>
      </>,
      "Accept Claim",
    );
  };

  // View ------------------------------------------
  if (!claim) return null;

  return (
    <>
      {isLoading && <Spinner />}
      <Modal show={showModal} title={modalTitle}>
        {modalContent}
      </Modal>
      <ButtonTray>
        <Button onClick={() => acceptClaimModal(claim.ClaimID)}>Accept</Button>
        <Button
          onClick={() => rejectClaimModal(claim.ClaimID)}
          variant="darkDanger"
        >
          Reject
        </Button>
      </ButtonTray>
      <ClaimAndSources claim={claim} sources={sources} open={true} />
    </>
  );
};

export default TriageInfo;
