import useLoad from "../api/useLoad.js";
import { CardContainer, Card } from "../UI/Card.jsx";
import ClaimItem from "../entities/claims/ClaimItem.jsx";
import { Link } from "react-router-dom";
import "./MyClaims.scss";
import ClaimsItem from "../entities/claims/ClaimsItem.jsx";

function Home() {
  // Inititalisation ---------------------------------------
  const claimsEndpoint = `/claims/claimstatus/5`;
  // State -------------------------------------------------
  const [claims, , ,] = useLoad(claimsEndpoint);
  // Context -----------------------------------------------
  // Methods -----------------------------------------------
  // View --------------------------------------------------
  return (
    <section>
      <h1>Browse Verified Claims</h1>
      <ClaimsItem claims={claims} basePath="/claims" />
    </section>
  );
}

export default Home;
