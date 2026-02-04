import SourceItem from "./SourceItem.jsx";
import { Button, ButtonTray } from "../../UI/Button.jsx";
import Icon from "../../UI/Icons.jsx";
import { Card } from "../../UI/Card.jsx";
import "./SourcesMap.scss";

const SourcesMap = ({
  sources,
  onSourceModify,
  onSourceDelete,
  onAddSource,
}) => {
  return (
    <div>
      {sources && sources.length > 0 ? (
        <div className="sources-list">
          {sources.map((source) => (
            <Card key={source.SourceID}>
              <SourceItem source={source} />
              {onSourceModify && onSourceDelete && (
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
      {onAddSource && (
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

export default SourcesMap;
