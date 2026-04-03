import { Card } from "../../UI/Card.jsx";
import AnnotationItem from "./AnnotationItem.jsx";
import EvidencesMap from "../evidence/EvidencesMap.jsx";
import Accordion from "../../UI/Accordion.jsx";

export default function AnnotationAndEvidence({
  annotation,
  evidences,
  onAnnotationModify,
  onAnnotationDelete,
  onEvidenceModify,
  onEvidenceDelete,
  open = false,
}) {
  const evidenceCount = evidences?.length ?? 0;

  return (
    <Card className="claim-details-card">
      <AnnotationItem
        annotation={annotation}
        onAnnotationModify={onAnnotationModify}
        onAnnotationDelete={onAnnotationDelete}
      />
      <Accordion
        title={`Attached Evidence (${evidenceCount})`}
        defaultOpen={open}
      >
        <EvidencesMap
          evidences={evidences}
          onEvidenceModify={onEvidenceModify}
          onEvidenceDelete={onEvidenceDelete}
        />
      </Accordion>
    </Card>
  );
}
