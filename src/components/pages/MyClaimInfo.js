import { useParams } from "react-router-dom";
import useLoad from "../api/useLoad.js";
import ClaimItem from "../entities/claims/ClaimItem.js";
import { SourceItem } from "../entities/sources/SourceItem.js";
import { Card, CardContainer } from "../UI/Card.js";

const MyClaimInfo = () => {
  // Initialisation --------------------------------
  const { claimId } = useParams();
  const claimEndpoint = `/claims/${claimId}`;
  const sourcesEndpoint = `/sources/claims/${claimId}`;
  // State -----------------------------------------
  const [claim, , ,] = useLoad(claimEndpoint);
  const [sources, , ,] = useLoad(sourcesEndpoint);

  // Handlers --------------------------------------
  // View ------------------------------------------
  if (!claim) return <p>Loading claim details...</p>;
  return (
    <CardContainer>
      <Card>
        <ClaimItem claim={claim[0]} />
        <h3>Attached sources:</h3>
        {sources ? (
          sources.map((source) => <SourceItem source={source} />)
        ) : (
          <p>No sources attached.</p>
        )}
      </Card>
    </CardContainer>
  );
};

export default MyClaimInfo;
