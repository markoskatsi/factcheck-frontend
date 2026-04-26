import "./StatusMessage.scss";

const statusMessages = {
  1: "This claim is pending editor review and has not yet been assigned a fact checker.",
  2: "This claim has been accepted and is awaiting assignment to a fact checker.",
  3: "This claim is currently under review by a fact checker.",
  4: "This claim has been reviewed by a fact checker and is awaiting final editor approval.",
  5: "This claim has been verified by a fact checker and editor. It is now read-only.",
  6: "This claim has been rejected by an editor. It is now read-only. You may submit a new claim with the necessary revisions.",
  8: "This claim is currently under dispute and is read-only while the matter is being resolved.",
};

export const StatusMessage = ({ claim }) => {
  const message = statusMessages[claim.ClaimClaimstatusID];
  if (!message) return null;

  return (
    <div className="status-message">
      <p>{message}</p>
    </div>
  );
};
