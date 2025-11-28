import useLoad from "../api/useLoad.js";
import { CardContainer, Card } from "../UI/Card.jsx";
import ClaimItem from "../entities/claims/ClaimItem.jsx";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/useAuth.jsx";
import "./MyClaims.scss";

function MyClaims() {
  // Inititalisation ---------------------------------------
  const {loggedInUserID} = useAuth();
  const claimsEndpoint = `/claims/users/${loggedInUserID}`;
  // State -------------------------------------------------
  const [claims, , loadingClaimsMessage] = useLoad(claimsEndpoint);
  // Context -----------------------------------------------
  // Methods -----------------------------------------------
  // View --------------------------------------------------
  return (
    <section>
      <h1>My Claims</h1>
      <Link to="/createclaim">
        <button>Add New Claim</button>
      </Link>

      {!claims ? (
        <p>{loadingClaimsMessage}</p>
      ) : claims.length === 0 ? (
        <p>You have not made any claims yet!</p>
      ) : (
        <CardContainer>
          {claims.map((claim) => (
            <Link to={`/myclaims/${claim.ClaimID}`} key={claim.ClaimID}>
              <div className="fixed">
                <Card>
                  <ClaimItem claim={claim} />
                </Card>
              </div>
            </Link>
          ))}
        </CardContainer>
      )}
    </section>
  );
}

export default MyClaims;
