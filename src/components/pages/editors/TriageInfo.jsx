import { useParams } from "react-router-dom";
import useLoad from "../../api/useLoad.js";
import ClaimAndSources from "../../entities/claims/ClaimAndSources.jsx";
import { Button, ButtonTray } from "../../UI/Button.jsx";
import "../submitters/MyClaimInfo.scss";

const TriageInfo = () => {
  // Initialisation --------------------------------
  const { claimId } = useParams();

  const claimEndpoint = `/claims/${claimId}`;
  const claimSourcesEndpoint = `/sources/claims/${claimId}?orderby=SourceCreated%20desc`;

  // State -----------------------------------------
  const [claim, , ,] = useLoad(claimEndpoint);
  const [sources, , ,] = useLoad(claimSourcesEndpoint);

  // Handlers --------------------------------------

  // View ------------------------------------------
  if (!claim) return null;

  return (
    <>
      <ButtonTray>
        <Button>Accept</Button>
        <Button variant="darkDanger">Reject</Button>
      </ButtonTray>
      <ClaimAndSources claim={claim[0]} sources={sources} />
    </>
  );
};

export default TriageInfo;
