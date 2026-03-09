import useLoad from "../../api/useLoad.js";
import ClaimsMap from "../../entities/claims/ClaimsMap.jsx";
import { useAuth } from "../../auth/useAuth.jsx";
import "../submitters/MyClaims.scss";

const Triage = () => {
  // Inititalisation ---------------------------------------
  const claimsEndpoint = `/claims/claimstatus/1?orderby=ClaimCreated%20esc`;
  // State -------------------------------------------------
  const [claims, ,] = useLoad(claimsEndpoint);
  // Context -----------------------------------------------
  // Methods -----------------------------------------------
  // View --------------------------------------------------
  return (
    <section>
      <h1>Triage Incoming Claims</h1>
      <ClaimsMap claims={claims} basePath="/triage" />
    </section>
  );
};

export default Triage;
