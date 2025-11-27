import SourceForm from "../entities/sources/SourceForm";
import API from "../api/API.js";
import { useNavigate, useParams } from "react-router-dom";

const AddSource = () => {
  // Initialisation --------------------------------
  const { claimId } = useParams();
  const sourcesEndpoint = "/sources";
  const navigate = useNavigate();

  // State -----------------------------------------
  // Handlers --------------------------------------
  const handleSubmit = async (source) => {
    const sourceResponse = await API.post(sourcesEndpoint, source);
    if (sourceResponse.isSuccess) {
      navigate(`/myclaims/${claimId}`);
    }
    return sourceResponse.isSuccess;
  };

  const handleCancel = () => {
    navigate(`/myclaims/${claimId}`);
  };

  // View ------------------------------------------
  return (
    <>
      <h1>Attach a source</h1>
      <SourceForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </>
  );
};

export default AddSource;
