import useLoad from "../api/useLoad.js";
import { CardContainer, Card } from "../UI/Card.js";
import ClaimItem from "../entities/claims/ClaimItem.js";
import { Link } from "react-router-dom";
import "./MyClaims.scss";

function MyClaims() {
  // Inititalisation ---------------------------------------
  const loggedinUserID = 1;
  const claimsEndpoint = `/claims/users/${loggedinUserID}`;
  // State -------------------------------------------------
  const [claims, setClaims, loadingClaimsMessage, setLoadingClaimsMessage] = useLoad(claimsEndpoint);
  // Context -----------------------------------------------
  // Methods -----------------------------------------------
  // View --------------------------------------------------
  return (
    <section>
      <h1>My Claims</h1>
      {!claims ? (
        <p>{loadingClaimsMessage}</p>
      ) : claims.length === 0 ? (
        <p>You have not made any claims yet!</p>
      ) : (
        <CardContainer>
          {claims.map((claim) => (
            <Link to={`/myclaims/${claim.ClaimID}`} key={claim.ClaimID}>
              <Card>
                <ClaimItem claim={claim} />
              </Card>
            </Link>
          ))}
        </CardContainer>
      )}
      <button
        style={{
          padding: "12px 24px",
          marginTop: "50px",
          cursor: "pointer",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Link to="/createclaim">Add New Claim</Link>
      </button>
    </section>
  );
}

export default MyClaims;
