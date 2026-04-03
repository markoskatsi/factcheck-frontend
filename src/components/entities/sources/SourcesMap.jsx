import SourceItem from "./SourceItem.jsx";
import { Button, ButtonTray } from "../../UI/Button.jsx";
import Icon from "../../UI/Icons.jsx";
import { Card } from "../../UI/Card.jsx";
import { useParams } from "react-router-dom";
import useLoad from "../../api/useLoad.js";
import "./SourcesMap.scss";

const SourcesMap = ({
  sources,
  onSourceModify,
  onSourceDelete,
  onAddSource,
}) => {
  const { claimId } = useParams();
  const [claim] = useLoad(`/claims/${claimId}`);

  const isEditable = claim?.[0].ClaimClaimstatusID === 1;

  return (
    <div className="sources-map">
      {sources && sources.length > 0 ? (
        <div className="sources-list">
          {sources.map((source) => (
            <Card key={source.SourceID}>
              <SourceItem source={source} />
              {onSourceModify && onSourceDelete && isEditable && (
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
      {onAddSource && isEditable && (
        <Button onClick={onAddSource} variant="secondary">
          Add a source
        </Button>
      )}
    </div>
  );
};

export default SourcesMap;
