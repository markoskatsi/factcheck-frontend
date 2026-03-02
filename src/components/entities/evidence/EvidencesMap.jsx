import { Button, ButtonTray } from "../../UI/Button.jsx";
import Icon from "../../UI/Icons.jsx";
import EvidenceItem from "./EvidenceItem.jsx";
import { Card } from "../../UI/Card.jsx";

const EvidencesMap = ({
  evidences,
  // onSourceModify,
  // onSourceDelete,
  // onAddSource,
}) => {
  return (
    <div>
      {evidences && evidences.length > 0 ? (
        <div className="evidences-list">
          {evidences.map((evidence) => (
            <Card key={evidence.EvidenceID}>
              <EvidenceItem evidence={evidence} />
              {/* {onSourceModify && onSourceDelete && (
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
              )} */}
            </Card>
          ))}
        </div>
      ) : (
        <p>No sources attached.</p>
      )}
      {/* {onAddSource && (
        <Button
          onClick={onAddSource}
          variant="secondary"
          style={{ marginTop: "15px" }}
        >
          Add a source
        </Button>
      )} */}
    </div>
  );
};

export default EvidencesMap;
