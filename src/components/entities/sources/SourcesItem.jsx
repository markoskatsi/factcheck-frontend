import { SourceItem } from "./SourceItem.jsx";
import { Button, ButtonTray } from "../../UI/Button.jsx";
import Icon from "../../UI/Icons.jsx";
import { Card } from "../../UI/Card.jsx";
import "./SourcesItem.scss";

const SourcesItem = ({
  sources,
  isOwner,
  onSourceModify,
  onSourceDelete,
  showButton,
  onAddSource,
}) => {
  return (
    <div>
      {sources && sources.length > 0 ? (
        <div className="sources-list">
          {sources.map((source) => (
            <Card key={source.SourceID}>
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
            </Card>
          ))}
        </div>
      ) : (
        <p>No sources attached.</p>
      )}
      {isOwner && showButton && (
        <Button
          onClick={onAddSource}
          variant="secondary"
          style={{ marginTop: "15px" }}
        >
          Add a source
        </Button>
      )}
    </div>
  );
};

export default SourcesItem;
