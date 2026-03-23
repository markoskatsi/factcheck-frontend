import { Card } from "../../UI/Card.jsx";
import VerdictItem from "./VerdictItem.jsx";
import EvidencesMap from "../evidence/EvidencesMap.jsx";

export default function VerdictAndEvidence({
  verdict,
  evidences,
  
}) {
  return (
    <Card className="claim-details-card">
      <VerdictItem verdict={verdict} />
      <h3>Evidence:</h3>
      <EvidencesMap
        evidences={evidences}
      />
    </Card>
  );
}
