import { formatDateTime } from "../../utils/dateUtils.jsx";
import { Card } from "../../UI/Card.jsx";
import { Button, ButtonTray } from "../../UI/Button.jsx";
import Icon from "../../UI/Icons.jsx";

export function VerdictItem({ verdict, onModify, onDelete }) {
  if (!verdict) return null;
  return (
    <Card key={verdict.VerdictID}>
      <p className="user">Last modified by: {verdict.VerdictUsername}</p>
      <p className="description">{verdict.VerdictDescription}</p>
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
