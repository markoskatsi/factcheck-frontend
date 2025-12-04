import { useParams } from "react-router-dom";
import useLoad from "../api/useLoad.js";
import ClaimItem from "../entities/claims/ClaimItem.jsx";
import { SourceItem } from "../entities/sources/SourceItem.jsx";
import { Card, CardContainer } from "../UI/Card.jsx";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/useAuth.jsx";

const MyClaimInfo = () => {
  // Initialisation --------------------------------
  const { claimId } = useParams();
  const { loggedInUser } = useAuth();

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
          sources.map((source) => (
            <SourceItem source={source} key={source.SourceID} />
          ))
        ) : (
          <p>No sources attached.</p>
        )}
        {loggedInUser && (
        <button>
          <Link to={`/addsource/${claimId}`}>Add a source</Link>
        </button> 
        )}
      </Card>
    </CardContainer>
  );
};

export default MyClaimInfo;
