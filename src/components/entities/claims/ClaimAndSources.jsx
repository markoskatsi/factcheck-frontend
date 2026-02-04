import { Card } from "../../UI/Card.jsx";
import ClaimItem from "./ClaimItem.jsx";
import SourcesMap from "../sources/SourcesMap.jsx";

export default function ClaimAndSources({
  claim,
  sources,
  onClaimModify,
  onClaimDelete,
  onSourceModify,
  onSourceDelete,
  onAddSource,
}) {
  return (
    <Card className="claim-details-card">
      <ClaimItem
        claim={claim}
        onClaimModify={onClaimModify}
        onClaimDelete={onClaimDelete}
      />
      <h3>Attached sources:</h3>
      <SourcesMap
        sources={sources}
        onSourceModify={onSourceModify}
        onSourceDelete={onSourceDelete}
        onAddSource={onAddSource}
      />
    </Card>
  );
}
