import useLoad from "../../api/useLoad.js";
import ClaimsMap from "../../entities/claims/ClaimsMap.jsx";
import "../submitters/MyClaims.scss";

const Review = () => {
  // Inititalisation ---------------------------------------
  const claimsEndpoint = `/claims/claimstatus/4?orderby=ClaimCreated%20esc`;
  // State -------------------------------------------------
  const [claims, ,] = useLoad(claimsEndpoint);
  // Context -----------------------------------------------
  // Methods -----------------------------------------------
  // View --------------------------------------------------
  return (
    <section>
      <h1>Review Claims</h1>
      <ClaimsMap claims={claims} basePath="/review" />
    </section>
  );
};

export default Review;
