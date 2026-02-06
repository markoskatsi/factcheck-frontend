import useLoad from "../api/useLoad.js";
import { useAuth } from "../auth/useAuth.jsx";
import { useState } from "react";
import ClaimForm from "../entities/claims/ClaimForm.jsx";
import API from "../api/API.js";
import { Modal, useModal } from "../UI/Modal.jsx";
import { Button } from "../UI/Button.jsx";
import "./MyClaims.scss";
import { Spinner } from "../UI/Spinner.jsx";
import ClaimsMap from "../entities/claims/ClaimsMap.jsx";

function MyClaims() {
  // Inititalisation ---------------------------------------
  const { loggedInUserID } = useAuth();
  const claimsEndpoint = `/claims/users/${loggedInUserID}`;
  const allClaimsEndpoint = "/claims";

  // State -------------------------------------------------
  const [claims, , , loadClaims] = useLoad(claimsEndpoint);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, claimModalContent, claimModalTitle, openModal, closeModal] =
    useModal(false);
  // Context -----------------------------------------------
  // Methods -----------------------------------------------
  const handleSubmit = async (claim) => {
    setIsLoading(true);
    const claimResponse = await API.post(allClaimsEndpoint, claim);
    if (claimResponse.isSuccess) {
      closeModal();
      await loadClaims(claimsEndpoint);
    }
    setIsLoading(false);
    return claimResponse.isSuccess;
  };

  const showAddClaimModal = () => {
    openModal(
      <ClaimForm onSubmit={handleSubmit} onCancel={() => closeModal()} />,
      "Add a Claim",
    );
  };

  // View --------------------------------------------------
  return (
    <section>
      {isLoading && <Spinner />}
      <Modal show={showModal} title={claimModalTitle}>
        {claimModalContent}
      </Modal>
      <h1>My Claims</h1>
      <Button onClick={() => showAddClaimModal()}>Add New Claim</Button>
      <ClaimsMap claims={claims} basePath="/myclaims" />
    </section>
  );
}

export default MyClaims;
