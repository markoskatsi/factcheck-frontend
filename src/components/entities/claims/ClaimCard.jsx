import ClaimItem from "./ClaimItem.jsx";
import { SourceItem } from "../sources/SourceItem.jsx";
import Icon from "../../UI/Icons.jsx";
import { Button, ButtonTray } from "../../UI/Button.jsx";
import { Card, CardContainer } from "../../UI/Card.jsx";
import "./ClaimCard.scss";

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
          // <Action.Tray>
          //   <Action.Modify onClick={onClaimModify} />
          //   <Action.Delete onClick={onClaimDelete} />
          // </Action.Tray>
          <ButtonTray>
            <Button onClick={onClaimModify} variant="secondary">
              <Icon.Pen />
            </Button>
            <Button onClick={onClaimDelete} variant="danger">
              <Icon.Trash />
            </Button>
          </ButtonTray>
        )}
        <h3>Attached sources:</h3>
        {sources && sources.length > 0 ? (
          sources.map((source) => (
            <div className="sourceItem" key={source.SourceID}>
              <SourceItem source={source} />
              {isOwner && (
                <ButtonTray>
                  <Button
                    onClick={() => onSourceModify(source)}
                    variant="secondary"
                  >
                    <Icon.Pen />
                  </Button>
                  <Button
                    onClick={() => onSourceDelete(source.SourceID)}
                    variant="danger"
                  >
                    <Icon.Trash />
                  </Button>
                </ButtonTray>
              )}
            </div>
          ))
        ) : (
          <p>No sources attached.</p>
        )}
        {isOwner && showButton && (
          <Button onClick={onAddSource} variant="secondary">
            Add a source
          </Button>
        )}
      </Card>
    </CardContainer>
  );
}

export default ClaimCard;
