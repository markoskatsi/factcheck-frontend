import { Card } from "../../UI/Card.jsx";
import ClaimItem from "./ClaimItem.jsx";
import SourcesItem from "../sources/SourcesItem.jsx";

export default function ClaimAndSources({
  claim,
  sources,
  isOwner,
  onClaimModify,
  onClaimDelete,
  onSourceModify,
  onSourceDelete,
  showButton,
  onAddSource,
}) {
  return (
    <Card className="claim-details-card">
      <ClaimItem
        claim={claim}
        isOwner={isOwner}
        onClaimModify={onClaimModify}
        onClaimDelete={onClaimDelete}
      />
      <h3>Attached sources:</h3>
      <SourcesItem
        sources={sources}
        isOwner={isOwner}
        onSourceModify={onSourceModify}
        onSourceDelete={onSourceDelete}
        showButton={showButton}
        onAddSource={onAddSource}
      />
    </Card>
  );
}
