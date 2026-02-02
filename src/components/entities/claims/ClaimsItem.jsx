import { Link } from "react-router-dom";
import ClaimItem from "./ClaimItem.jsx";
import { CardContainer } from "../../UI/Card.jsx";

const ClaimsItem = ({ claims, basePath = "" }) => {
  return (
    <div>
      {claims && claims.length > 0 ? (
        <CardContainer>
          {claims.map((claim) => (
            <Link to={`${basePath}/${claim.ClaimID}`} key={claim.ClaimID}>
              <div className="fixed">
                <ClaimItem claim={claim} />
              </div>
            </Link>
          ))}
        </CardContainer>
      ) : (
        <p>No claims found</p>
      )}
    </div>
  );
};

export default ClaimsItem;
