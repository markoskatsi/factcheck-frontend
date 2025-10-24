import "./ClaimItem.scss";

export function ClaimItem({ claim }) {

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const dateStr = date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
    const timeStr = date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });
    return `${dateStr} at ${timeStr}`;
  };
  
  return (
    <div className="claimItem">
      <h3>{claim.ClaimTitle}</h3>
      <p>{claim.ClaimDescription}</p>
      <p className="status">Status: {claim.ClaimstatusName}</p>
      <p>Date Published: {formatDate(claim.ClaimPublished)}</p>
    </div>
  );
}
export default ClaimItem;