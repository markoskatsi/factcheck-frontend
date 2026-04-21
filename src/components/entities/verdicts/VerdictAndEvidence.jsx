import { Card } from "../../UI/Card.jsx";
import VerdictItem from "./VerdictItem.jsx";
import EvidencesMap from "../evidence/EvidencesMap.jsx";
import Accordion from "../../UI/Accordion.jsx";
import useLoad from "../../api/useLoad.js";
import { useParams } from "react-router-dom";
import { useAuth } from "../../auth/useAuth.jsx";
import { Button } from "../../UI/Button.jsx";

export default function VerdictAndEvidence({ verdict, evidences }) {
  const evidenceCount = evidences?.length ?? 0;
  const { claimId } = useParams();
  const { loggedInUserID } = useAuth();

  const claimEndpoint = `/claims/${claimId}`;

  const [claims, , ,] = useLoad(claimEndpoint);
  const claim = claims?.[0];

  return (
    <Card className="claim-details-card">
      {claim?.ClaimClaimstatusID === 5 &&
        loggedInUserID === claim?.ClaimUserID && (
          <Button variant="orange">Open Dispute</Button>
        )}
      <VerdictItem verdict={verdict} />
      <Accordion title={`Attached Evidence (${evidenceCount})`}>
        <EvidencesMap evidences={evidences} />
      </Accordion>
    </Card>
  );
}
