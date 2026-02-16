import { Link } from "react-router-dom";
import ClaimItem from "./ClaimItem.jsx";
import { CardContainer } from "../../UI/Card.jsx";

const ClaimsMap = ({ claims, basePath = "" }) => {
  return (
    <div>
      {claims && claims.length > 0 ? (
        <CardContainer>
          {claims.map((claim) => {
            const id = claim.AssignmentClaimID || claim.ClaimID;
            return (
              <Link to={`${basePath}/${id}`} key={id}>
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
