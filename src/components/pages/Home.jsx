import useLoad from "../api/useLoad.js";
import { CardContainer, Card } from "../UI/Card.jsx";
import ClaimItem from "../entities/claims/ClaimItem.jsx";
import { Link } from "react-router-dom";
import "./MyClaims.scss";

function Home() {
  // Inititalisation ---------------------------------------
  const claimsEndpoint = `/claims`;
  // State -------------------------------------------------
  const [claims, , , ] = useLoad(claimsEndpoint);
  // Context -----------------------------------------------
  // Methods -----------------------------------------------
  // View --------------------------------------------------
  return (
    <section>
      <h1>Browse Verified Claims</h1>
      {claims ? (
        <CardContainer>
          {claims
            .filter((claim) => claim.ClaimClaimstatusID === 3)
            .map((claim) => (
              <Link to={`/myclaims/${claim.ClaimID}`} key={claim.ClaimID}>
                <div className="fixed">
                  <Card>
                    <ClaimItem claim={claim} />
                  </Card>
                </div>
              </Link>
            ))}
        </CardContainer>
      ) : (
        <p>No verified claims available.</p>
      )}
    </section>
  );
}

export default Home;
