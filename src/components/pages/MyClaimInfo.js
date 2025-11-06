import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../api/API.js";
import { formatDateTime } from "../utils/dateUtils.jsx";

const MyClaimInfo = () => {
  // Initialisation --------------------------------
  const { claimId } = useParams();
  const claimEndpoint = `/claims/${claimId}`;
  const sourcesEndpoint = `/sources/claims/${claimId}`;
  // State -----------------------------------------
  const [claim, setClaim] = useState(null);
  const [sources, setSources] = useState(null);
  // Handlers --------------------------------------
  const fetchData = async (claimEndpoint, sourcesEndpoint) => {
    const claimResponse = await API.get(claimEndpoint);
    const sourcesResponse = await API.get(sourcesEndpoint);
    if (claimResponse.isSuccess) setClaim(claimResponse.result[0]);
    if (sourcesResponse.isSuccess) setSources(sourcesResponse.result);
  };

  useEffect(() => {
    fetchData(claimEndpoint, sourcesEndpoint);
  }, [claimId]);
  // View ------------------------------------------
  if (!claim) return <p>Loading claim details...</p>;
  return (
    <>
      <h1>{claim.ClaimTitle}</h1>
      <p>{claim.ClaimDescription}</p>
      <p>{claim.ClaimStatus}</p>
      <p>{claim.ClaimstatusName}</p>
      <p>{formatDateTime(claim.ClaimPublished)}</p>
      <h2>Sources:</h2>
      {sources ? (
        sources.map((source) => (
          <div key={source.SourceID}>
            <h3>{source.SourcetypeName}</h3>
            <p>
              {source.SourceDescription} <a href={source.SourceURL}>Link</a>
            </p>
          </div>
        ))
      ) : (
        <p>No sources attached.</p>
      )}
    </>
  );
};

export default MyClaimInfo;
