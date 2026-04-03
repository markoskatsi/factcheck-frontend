import useLoad from "../../api/useLoad.js";
import "../submitters/MyClaims.scss";
import { useAuth } from "../../auth/useAuth.jsx";
import PageNotFound from "../shared/404.jsx";
import ClaimsMap from "../../entities/claims/ClaimsMap.jsx";

function AvailableClaims() {
  // Inititalisation ---------------------------------------
  const availableClaimsEndpoint = `/claims/claimstatus/2?orderby=ClaimCreated%20desc`;

  // State -------------------------------------------------
  const [claims, ,] = useLoad(availableClaimsEndpoint);
  // Context -----------------------------------------------
  // Methods -----------------------------------------------
  // View --------------------------------------------------
  return (
    <section>
      <h1>Available Claims</h1>
      <ClaimsMap claims={claims} basePath="/assign" />
    </section>
  );
}

export default AvailableClaims;
