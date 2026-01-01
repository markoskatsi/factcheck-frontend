import ClaimItem from "./ClaimItem.jsx";
import { SourceItem } from "../sources/SourceItem.jsx";
import Action from "../../UI/Actions.jsx";
import { Button } from "../../UI/Button.jsx";
import { Card, CardContainer } from "../../UI/Card.jsx";

function ClaimCard({
  claim,
  sources,
  showButton,
  onAddSource,
  onClaimModify,
  onClaimDelete,
  onSourceModify,
  onSourceDelete,
  loggedInUserID,
}) {
  const isOwner = loggedInUserID && claim?.ClaimUserID === loggedInUserID;
  return (
    <CardContainer>
      <Card>
        <ClaimItem claim={claim} />
        {isOwner && (
          <Action.Tray>
            <Action.Modify onClick={onClaimModify} />
            <Action.Delete onClick={onClaimDelete} />
          </Action.Tray>
        )}
        <h3>Attached sources:</h3>
        {sources && sources.length > 0 ? (
          sources.map((source) => (
            <div className="sourceItem" key={source.SourceID}>
              <SourceItem source={source} />
              {isOwner && (
                <Action.Tray>
                  <Action.Modify onClick={() => onSourceModify(source)} />
                  <Action.Delete
                    onClick={() => onSourceDelete(source.SourceID)}
                  />
                </Action.Tray>
              )}
            </div>
          ))
        ) : (
          <p>No sources attached.</p>
        )}
        {isOwner && showButton && (
          <Button onClick={onAddSource}>Add a source</Button>
        )}
      </Card>
    </CardContainer>
  );
}

export default ClaimCard;
