import ClaimForm from "../entities/claims/ClaimForm";
import API from "../api/API.js";
import { useNavigate } from "react-router-dom";

const CreateClaim = () => {
  // Initialisation --------------------------------
  const claimsEndpoint = "/claims";
  const navigate = useNavigate();

  // Handlers --------------------------------------
  const handleSubmit = async (claim) => {
    const claimResponse = await API.post(claimsEndpoint, claim);
    if (claimResponse.isSuccess) {
      navigate("/myclaims");
    }
    return claimResponse.isSuccess;
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
