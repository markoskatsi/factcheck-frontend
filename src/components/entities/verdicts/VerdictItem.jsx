import { formatDateTime } from "../../utils/dateUtils.jsx";
import { Card } from "../../UI/Card.jsx";

export function VerdictItem({ verdict }) {
  if (!verdict) return null;
  return (
    <Card key={verdict.VerdictID}>
      <p>{verdict.VerdictDescription}</p>
      <p>Created By: {verdict.VerdictUsername}</p>
      <p>Date Created: {formatDateTime(verdict.VerdictCreated)}</p>
    </Card>
  );
}
export default VerdictItem;
