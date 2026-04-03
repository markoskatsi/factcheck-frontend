import { formatDateTime } from "../../utils/dateUtils.jsx";
import { Button, ButtonTray } from "../../UI/Button.jsx";
import Icon from "../../UI/Icons.jsx";
import { Card } from "../../UI/Card.jsx";

export function ClaimItem({ claim, onClaimModify, onClaimDelete }) {
  return (
    <Card key={claim.ClaimID}>
      <p className="status" status={claim.ClaimstatusName}>
        {claim.ClaimstatusName}
      </p>
      <h3>{claim.ClaimTitle}</h3>
      <p className="description">{claim.ClaimDescription}</p>
      <p>Date Created: {formatDateTime(claim.ClaimCreated)}</p>
      {onClaimModify && onClaimDelete && claim.ClaimClaimstatusID === 1 && (
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
