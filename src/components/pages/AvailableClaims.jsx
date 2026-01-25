import useLoad from "../api/useLoad.js";
import { CardContainer, Card } from "../UI/Card.jsx";
import ClaimItem from "../entities/claims/ClaimItem.jsx";
import { Link } from "react-router-dom";
import "./MyClaims.scss";
import { Spinner } from "../UI/Spinner.jsx";
import { useAuth } from "../auth/useAuth.jsx";
import PageNotFound from "./404.jsx";

function AvailableClaims() {
  // Inititalisation ---------------------------------------
  const claimsEndpoint = `/claims/claimstatus/1`;
  const { loggedInUser } = useAuth();

  // State -------------------------------------------------
  const [claims, ,] = useLoad(claimsEndpoint);

  // Context -----------------------------------------------
  // Methods -----------------------------------------------
  // View --------------------------------------------------
  if (loggedInUser?.UserUsertypeID !== 2) return <PageNotFound />;
  return (
    <section>
      <h1>Available Claims</h1>
      {claims && claims.length > 0 ? (
        <CardContainer>
          {claims.map((claim) => (
            <Link to={`/availableclaims/${claim.ClaimID}`} key={claim.ClaimID}>
              <div className="fixed">
                <Card>
                  <ClaimItem claim={claim} />
                </Card>
              </div>
            </Link>
          ))}
        </CardContainer>
      ) : (
        <p>No available claims found</p>
      )}
    </section>
  );
}

export default AvailableClaims;
