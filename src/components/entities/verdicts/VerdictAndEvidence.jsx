import { Card } from "../../UI/Card.jsx";
import VerdictItem from "./VerdictItem.jsx";
import EvidencesMap from "../evidence/EvidencesMap.jsx";
import Accordion from "../../UI/Accordion.jsx";

export default function VerdictAndEvidence({ verdict, evidences }) {
  const evidenceCount = evidences?.length ?? 0;

  return (
    <Card className="claim-details-card">
      <VerdictItem verdict={verdict} />
      <Accordion title={`Attached Evidence (${evidenceCount})`}>
        <EvidencesMap evidences={evidences} />
      </Accordion>
    </Card>
  );
}
