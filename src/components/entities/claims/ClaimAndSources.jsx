import { Card } from "../../UI/Card.jsx";
import ClaimItem from "./ClaimItem.jsx";
import { DisputeItem } from "../disputes/DisputeItem.jsx";
import SourcesMap from "../sources/SourcesMap.jsx";
import useLoad from "../../api/useLoad.js";
import Accordion from "../../UI/Accordion.jsx";

export default function ClaimAndSources({
  claim,
  sources,
  onClaimModify,
  onClaimDelete,
  onSourceModify,
  onSourceDelete,
  onAddSource,
  open = false,
}) {
  const sourceCount = sources?.length ?? 0;

  const verdictEndpoint = `/verdicts/claims/${claim.ClaimID}`;
  const [verdict] = useLoad(verdictEndpoint);

  const disputeEndpoint = `/disputes/verdicts/${verdict?.[0]?.VerdictID}`;
  const [disputes] = useLoad(disputeEndpoint);

  const dispute = disputes?.[0];

  return (
    <Card className="claim-details-card">
      <ClaimItem
        claim={claim}
        onClaimModify={onClaimModify}
        onClaimDelete={onClaimDelete}
      />
      {dispute && dispute.DisputeOutcome === 0 && (
        <Accordion title="Dispute" defaultOpen={true}>
          <DisputeItem dispute={dispute} />
        </Accordion>
      )}
      <Accordion title={`Attached Sources (${sourceCount})`} defaultOpen={open}>
        <SourcesMap
          sources={sources}
          onSourceModify={onSourceModify}
          onSourceDelete={onSourceDelete}
          onAddSource={onAddSource}
        />
      </Accordion>
    </Card>
  );
}
