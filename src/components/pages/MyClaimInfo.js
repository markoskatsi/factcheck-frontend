import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../api/API.js";
import { ClaimItem } from "../entities/claims/ClaimItem.js";
import { SourceItem } from "../entities/sources/SourceItem.js";
import { Card, CardContainer } from "../UI/Card.js";

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
    <CardContainer>
      <Card>
        <ClaimItem claim={claim} />
      <h3>Attached sources:</h3>
      {sources ? (
        sources.map((source) => (
            <SourceItem source={source} />
        ))
      ) : (
        <p>No sources attached.</p>
      )}
      </Card>
    </CardContainer>
  );
};

export default MyClaimInfo;
