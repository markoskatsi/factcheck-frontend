import ClaimForm from "../entities/claims/ClaimForm";
import API from "../api/API.js";
import { useNavigate } from "react-router-dom";

const CreateClaim = () => {
  // Initialisation --------------------------------
  const claimsEndpoint = "/claims";
  const sourcesEndpoint = "/sources";
  const navigate = useNavigate();

  // Handlers --------------------------------------
  const handleSubmit = async (claim, source) => {
    const claimResponse = await API.post(claimsEndpoint, claim);
    if (!claimResponse.isSuccess) return false;

    const sourceResponse = await API.post(sourcesEndpoint, {
      ...source,
      SourceClaimID: claimResponse.result[0].ClaimID,
    });
    if (sourceResponse.isSuccess) {
      navigate("/myclaims");
    }
    return sourceResponse.isSuccess;
  };

  const handleCancel = () => {
    navigate("/myclaims");
  };

  // View ------------------------------------------
  return (
    <>
      <h1>Create a new Claim</h1>
      <ClaimForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </>
  );
};

export default CreateClaim;