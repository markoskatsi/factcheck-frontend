import useLoad from "../../api/useLoad.js";
import ClaimsMap from "../../entities/claims/ClaimsMap.jsx";
import "../submitters/MyClaims.scss";

const Disputes = () => {
  // Inititalisation ---------------------------------------
  const claimsEndpoint = `/claims/claimstatus/8?orderby=ClaimCreated%20esc`;
  // State -------------------------------------------------
  const [claims, ,] = useLoad(claimsEndpoint);
  // Context -----------------------------------------------
  // Methods -----------------------------------------------
  // View --------------------------------------------------
  return (
    <section>
      <h1>Resolve Disputes</h1>
      <ClaimsMap claims={claims} basePath="/disputes" />
    </section>
  );
};

export default Disputes;
