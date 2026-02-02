import useLoad from "../api/useLoad.js";
import { CardContainer, Card } from "../UI/Card.jsx";
import ClaimItem from "../entities/claims/ClaimItem.jsx";
import { Link } from "react-router-dom";
import "./MyClaims.scss";
import { Spinner } from "../UI/Spinner.jsx";
import { useAuth } from "../auth/useAuth.jsx";
import PageNotFound from "./404.jsx";
import ClaimsItem from "../entities/claims/ClaimsItem.jsx";

function AvailableClaims() {
  // Inititalisation ---------------------------------------
  const availableClaimsEndpoint = `/claims/claimstatus/2`;
  const { loggedInUser } = useAuth();

  // State -------------------------------------------------
  const [claims, ,] = useLoad(availableClaimsEndpoint);
  // Context -----------------------------------------------
  // Methods -----------------------------------------------
  // View --------------------------------------------------
  if (loggedInUser?.UserUsertypeID !== 2) return <PageNotFound />;
  return (
    <section>
      <h1>Available Claims</h1>
      <ClaimsItem claims={claims} basePath="/availableclaims" />
    </section>
  );
}

export default AvailableClaims;
