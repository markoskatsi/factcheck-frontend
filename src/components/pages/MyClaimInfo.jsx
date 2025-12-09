import { useParams } from "react-router-dom";
import useLoad from "../api/useLoad.js";
import ClaimItem from "../entities/claims/ClaimItem.jsx";
import { SourceItem } from "../entities/sources/SourceItem.jsx";
import { Card, CardContainer } from "../UI/Card.jsx";
import SourceForm from "../entities/sources/SourceForm.jsx";
import API from "../api/API.js";
import { useState } from "react";
import { useAuth } from "../auth/useAuth.jsx";
import "./MyClaimInfo.scss";

const MyClaimInfo = () => {
  // Initialisation --------------------------------
  const { claimId } = useParams();
  const { loggedInUserID } = useAuth();

  const claimEndpoint = `/claims/${claimId}`;
  const claimSourcesEndpoint = `/sources/claims/${claimId}`;
  const sourcesEndpoint = "/sources";

  // State -----------------------------------------
  const [claim, , ,] = useLoad(claimEndpoint);
  const [sources, , , loadSources] = useLoad(claimSourcesEndpoint);

  const [showForm, setShowForm] = useState(false);
  const [showButton, setShowButton] = useState(true);

  // Handlers --------------------------------------
  const handleClick = () => {
    setShowForm(true);
    setShowButton(false);
  };

  const handleSubmit = async (source) => {
    const sourceResponse = await API.post(sourcesEndpoint, source);
    if (sourceResponse.isSuccess) {
      setShowForm(false);
      await loadSources(claimSourcesEndpoint);
    }
    return sourceResponse.isSuccess;
  };

  const handleCancel = () => {
    setShowForm(false);
    setShowButton(true);
  };

  // View ------------------------------------------
  if (!claim) return <p>Loading claim details...</p>;
  if (claim[0]?.ClaimUserID !== loggedInUserID)
    return <p>Claim not available.</p>;
  return (
    <>
      {showForm && (
        <SourceForm onSubmit={handleSubmit} onCancel={handleCancel} />
      )}
      <CardContainer>
        <Card>
          <ClaimItem claim={claim[0]} />
          <h3>Attached sources:</h3>
          {sources ? (
            sources.map((source) => (
              <div className="sourceItem" key={source.SourceID}>
                <SourceItem source={source} />
              </div>
            ))
          ) : (
            <p>No sources attached.</p>
          )}
          {showButton && <button onClick={handleClick}>Add a source</button>}
        </Card>
      </CardContainer>
    </>
  );
};

export default MyClaimInfo;
