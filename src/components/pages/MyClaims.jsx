import useLoad from "../api/useLoad.js";
import { CardContainer, Card } from "../UI/Card.jsx";
import ClaimItem from "../entities/claims/ClaimItem.jsx";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/useAuth.jsx";
import { useState } from "react";
import ClaimForm from "../entities/claims/ClaimForm.jsx";
import API from "../api/API.js";
import { Modal, useModal } from "../UI/Modal.jsx";
import { Button } from "../UI/Button.jsx";
import "./MyClaims.scss";
import { Spinner } from "../UI/Spinner.jsx";

function MyClaims() {
  // Inititalisation ---------------------------------------
  const { loggedInUserID } = useAuth();
  const claimsEndpoint = `/claims/users/${loggedInUserID}`;
  const allClaimsEndpoint = "/claims";

  // State -------------------------------------------------
  const [claims, , loadingClaimsMessage, loadClaims] = useLoad(claimsEndpoint);
  const [isLoading, setIsLoading] = useState(false);
  const [showClaimModal, claimModalContent, openClaimModal, closeClaimModal] =
    useModal(false);
  // Context -----------------------------------------------
  // Methods -----------------------------------------------
  const handleSubmit = async (claim) => {
    setIsLoading(true);
    const claimResponse = await API.post(allClaimsEndpoint, claim);
    if (claimResponse.isSuccess) {
      closeClaimModal();
      await loadClaims(claimsEndpoint);
    }
    setIsLoading(false);
    return claimResponse.isSuccess;
  };

  const handleCancel = () => {
    closeClaimModal();
  };

  const handleClick = () => {
    showAddClaimModal(true);
  };

  const showAddClaimModal = () => {
    openClaimModal(
      <ClaimForm onSubmit={handleSubmit} onCancel={handleCancel} />,
    );
  };

  // View --------------------------------------------------
  return (
    <section>
      {isLoading && <Spinner />}
      <Modal className="Modal" show={showClaimModal} title="Add a Claim">
        {claimModalContent}
      </Modal>
      <h1>My Claims</h1>
      <Button onClick={handleClick}>Add New Claim</Button>

      {claims && claims.length > 0 ? (
        <CardContainer>
          {claims.map((claim) => (
            <Link to={`/myclaims/${claim.ClaimID}`} key={claim.ClaimID}>
              <div className="fixed">
                <ClaimItem claim={claim} />
              </div>
            </Link>
          ))}
        </CardContainer>
      ) : (
        <p>You have not made any claims</p>
      )}
    </section>
  );
}

export default MyClaims;
