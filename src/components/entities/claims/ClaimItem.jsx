import { formatDateTime } from "../../utils/dateUtils.jsx";
import { Button, ButtonTray } from "../../UI/Button.jsx";
import Icon from "../../UI/Icons.jsx";
import { Card } from "../../UI/Card.jsx";

export function ClaimItem({ claim, onClaimModify, onClaimDelete }) {
  return (
    <Card key={claim.ClaimID}>
      <h3>{claim.ClaimTitle}</h3>
      <p>{claim.ClaimDescription}</p>
      <p className="status">Status: {claim.ClaimstatusName}</p>
      <p>
        Date Created: {formatDateTime(claim.ClaimCreated)}
      </p>
      {onClaimModify && onClaimDelete && (
        <ButtonTray>
          <Button onClick={onClaimModify} variant="secondary">
            <Icon.Pen />
          </Button>
          <Button onClick={onClaimDelete} variant="danger">
            <Icon.Trash />
          </Button>
        </ButtonTray>
      )}
    </Card>
  );
}
export default ClaimItem;
