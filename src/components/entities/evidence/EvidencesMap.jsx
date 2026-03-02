import { Button, ButtonTray } from "../../UI/Button.jsx";
import Icon from "../../UI/Icons.jsx";
import EvidenceItem from "./EvidenceItem.jsx";
import { Card } from "../../UI/Card.jsx";

const EvidencesMap = ({ evidences, onEvidenceModify, onEvidenceDelete }) => {
  return (
    <div>
      {evidences && evidences.length > 0 ? (
        <div className="evidences-list">
          {evidences.map((evidence) => (
            <Card key={evidence.EvidenceID}>
              <EvidenceItem evidence={evidence} />
              {onEvidenceModify && onEvidenceDelete && (
                <ButtonTray>
                  <Button
                    onClick={() => onEvidenceModify(evidence)}
                    variant="secondary"
                  >
                    <Icon.Pen />
                  </Button>
                  <Button
                    onClick={() => onEvidenceDelete(evidence.EvidenceID)}
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
        <p>No evidences attached.</p>
      )}
    </div>
  );
};

export default EvidencesMap;
