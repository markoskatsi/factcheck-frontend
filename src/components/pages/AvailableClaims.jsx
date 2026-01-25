import useLoad from "../api/useLoad.js";
import { CardContainer, Card } from "../UI/Card.jsx";
import ClaimItem from "../entities/claims/ClaimItem.jsx";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./MyClaims.scss";
import { Spinner } from "../UI/Spinner.jsx";

function AvailableClaims() {
  // Inititalisation ---------------------------------------
  const claimsEndpoint = `/claims/claimstatus/1`;

  // State -------------------------------------------------
  const [claims, , loadingClaimsMessage, loadClaims] = useLoad(claimsEndpoint);
  const [isLoading, setIsLoading] = useState(false);
  // Context -----------------------------------------------
  // Methods -----------------------------------------------
  // View --------------------------------------------------
  return (
    <section>
      {isLoading && <Spinner />}
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
