import { formatDateTime } from "../../utils/dateUtils.jsx";
import "./ClaimItem.scss";

export function ClaimItem({ claim }) {
  return (
    <div className="claimItem">
      <h3>{claim.ClaimTitle}</h3>
      <p>{claim.ClaimDescription}</p>
      <p className="status">Status: {claim.ClaimstatusName}</p>
      <p>Date Published: {formatDateTime(claim.ClaimPublished)}</p>
    </div>
  );
}
export default ClaimItem;
