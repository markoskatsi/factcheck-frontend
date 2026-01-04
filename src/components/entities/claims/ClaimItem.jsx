import { formatDateTime } from "../../utils/dateUtils.jsx";

export function ClaimItem({ claim }) {
  return (
    <div key={claim.ClaimID}>
      <h3>{claim.ClaimTitle}</h3>
      <p>{claim.ClaimDescription}</p>
      <p className="status">Status: {claim.ClaimstatusName}</p>
      <p style={{ marginBottom: 20 }}>
        Date Created: {formatDateTime(claim.ClaimCreated)}
      </p>
    </div>
  );
}
export default ClaimItem;
