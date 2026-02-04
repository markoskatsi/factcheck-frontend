import useLoad from "../api/useLoad.js";
import "./MyClaims.scss";
import ClaimsMap from "../entities/claims/ClaimsMap.jsx";

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
      <ClaimsMap claims={claims} basePath="/claims" />
    </section>
  );
}

export default Home;
