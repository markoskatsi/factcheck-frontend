import { Card } from "../../UI/Card.jsx";
import AnnotationItem from "./AnnotationItem.jsx";
import EvidencesMap from "../evidence/EvidencesMap.jsx";

export default function AnnotationAndEvidence({
  annotation,
  evidences,
  onAnnotationModify,
  onAnnotationDelete,
  onEvidenceModify,
  onEvidenceDelete,
}) {
  return (
    <Card className="claim-details-card">
      <AnnotationItem
        annotation={annotation}
        onAnnotationModify={onAnnotationModify}
        onAnnotationDelete={onAnnotationDelete}
      />
      <h3>Attached evidence:</h3>
      <EvidencesMap
        evidences={evidences}
        onEvidenceModify={onEvidenceModify}
        onEvidenceDelete={onEvidenceDelete}
      />
    </Card>
  );
}
