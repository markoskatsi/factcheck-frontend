import { Link } from "react-router-dom";
import ClaimItem from "./ClaimItem.jsx";
import { act, useEffect, useState } from "react";
import { CardContainer } from "../../UI/Card.jsx";
import { useAuth } from "../../auth/useAuth.jsx";
import "./ClaimsMap.scss";

const ClaimsMap = ({ claims, basePath = "", actions }) => {
  const { loggedInUserID } = useAuth();

  const [filteredClaims, setFilteredClaims] = useState([]);

  const availableStatuses = claims
    ? [...new Set(claims.map((c) => c.ClaimstatusName))]
    : [];

  useEffect(() => {
    setFilteredClaims(claims);
  }, [claims]);

  const handleStatusFilterChange = (e) => {
    const statusName = e.target.value;
    if (!statusName) {
      setFilteredClaims(claims);
    } else {
      setFilteredClaims(
        claims.filter((claim) => claim.ClaimstatusName === statusName),
      );
    }
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
        <select className="status-filter" onChange={handleStatusFilterChange}>
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
            const id = claim.AssignmentClaimID || claim.ClaimID;
            return (
              <Link to={`${correctPath(claim)}/${id}`} key={id}>
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
