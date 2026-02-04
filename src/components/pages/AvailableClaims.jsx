import useLoad from "../api/useLoad.js";
import "./MyClaims.scss";
import { useAuth } from "../auth/useAuth.jsx";
import PageNotFound from "./404.jsx";
import ClaimsMap from "../entities/claims/ClaimsMap.jsx";

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
      <ClaimsMap claims={claims} basePath="/availableclaims" />
    </section>
  );
}

export default AvailableClaims;
