import { Card } from "../../UI/Card.jsx";
import ClaimItem from "./ClaimItem.jsx";
import { DisputeItem } from "../disputes/DisputeItem.jsx";
import SourcesMap from "../sources/SourcesMap.jsx";
import Accordion from "../../UI/Accordion.jsx";

export default function ClaimAndSources({
  claim,
  sources,
  dispute,
  onClaimModify,
  onClaimDelete,
  onSourceModify,
  onSourceDelete,
  onAddSource,
  open = false,
}) {
  const sourceCount = sources?.length ?? 0;

  return (
    <Card className="claim-details-card">
      <ClaimItem
        claim={claim}
        onClaimModify={onClaimModify}
        onClaimDelete={onClaimDelete}
      />
      {dispute && (
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
