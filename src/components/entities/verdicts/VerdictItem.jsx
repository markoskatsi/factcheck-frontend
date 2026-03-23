import { formatDateTime } from "../../utils/dateUtils.jsx";
import { Card } from "../../UI/Card.jsx";
import { Button, ButtonTray } from "../../UI/Button.jsx";
import Icon from "../../UI/Icons.jsx";

export function VerdictItem({ verdict, onModify, onDelete }) {
  if (!verdict) return null;
  return (
    <Card key={verdict.VerdictID}>
      <p>{verdict.VerdictDescription}</p>
      <p>Created By: {verdict.VerdictUsername}</p>
      <p>Date Created: {formatDateTime(verdict.VerdictCreated)}</p>
      {onModify && onDelete && (
        <ButtonTray>
          <Button onClick={onModify} variant="secondary">
            <Icon.Pen />
          </Button>
          <Button onClick={onDelete} variant="danger">
            <Icon.Trash />
          </Button>
        </ButtonTray>
      )}
    </Card>
  );
}
export default VerdictItem;
