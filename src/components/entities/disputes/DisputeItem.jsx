import { Card } from "../../UI/Card.jsx";

export const DisputeItem = ({ dispute }) => {
  const outcome = dispute.DisputeOutcome === 0 ? "Unresolved" : "Resolved";
  return (
    <Card className="claim-details-card">
      <h3>Type</h3>
      <p>{dispute.DisputetypeName}</p>
      <h3>Reason</h3>
      <p className="description">{dispute.DisputeDescription}</p>
    </Card>
  );
};
