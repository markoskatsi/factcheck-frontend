import { Link } from "react-router-dom";
import ClaimItem from "./ClaimItem.jsx";
import { useState } from "react";
import { CardContainer } from "../../UI/Card.jsx";
import { useAuth } from "../../auth/useAuth.jsx";
import "./ClaimsMap.scss";

const ClaimsMap = ({ claims, basePath = "", actions }) => {
  const { loggedInUserID } = useAuth();

  const [selectedStatus, setSelectedStatus] = useState("");

  const availableStatuses = claims
    ? [...new Set(claims.map((c) => c.ClaimstatusName))]
    : [];

  const filteredClaims = selectedStatus
    ? claims?.filter((claim) => claim.ClaimstatusName === selectedStatus)
    : claims;

  const handleStatusFilterChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const correctPath = (claim) => {
    if (
      claim.ClaimstatusName === "Under Dispute" &&
      claim.AssignmentRoleID === 2 &&
      claim.AssignmentUserID === loggedInUserID
    ) {
      return `/ref/disputes`;
    }

    if (claim.ClaimstatusName === "Published") {
      return `/claims`;
    }
    return basePath;
  };

  return (
    <div className="claims-view">
      {actions && <div className="actions">{actions}</div>}
      {availableStatuses.length > 1 && (
        <select
          className="status-filter"
          value={selectedStatus}
          onChange={handleStatusFilterChange}
        >
          <option value="">All</option>
          {availableStatuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      )}

      {filteredClaims && filteredClaims.length > 0 ? (
        <CardContainer>
          {filteredClaims.map((claim) => {
            const claimId = claim.AssignmentClaimID || claim.ClaimID;
            const rowKey = claim.AssignmentID ?? claim.ClaimID;
            return (
              <Link to={`${correctPath(claim)}/${claimId}`} key={rowKey}>
                <div className="fixed">
                  <ClaimItem claim={claim} />
                </div>
              </Link>
            );
          })}
        </CardContainer>
      ) : (
        <p>No claims found</p>
      )}
    </div>
  );
};

export default ClaimsMap;
