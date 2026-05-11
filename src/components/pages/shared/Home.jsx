import useLoad from "../../api/useLoad.js";
import "../submitters/MyClaims.scss";
import ClaimsMap from "../../entities/claims/ClaimsMap.jsx";
import { useAuth } from "../../auth/useAuth.jsx";

function Home() {
  // Inititalisation ---------------------------------------
  const { loggedInUser } = useAuth();
  const claimsEndpoint = `/claims/claimstatus/5?orderby=ClaimCreated%20desc`;
  // State -------------------------------------------------
  const [claims, , ,] = useLoad(claimsEndpoint);
  // Context -----------------------------------------------
  // Methods -----------------------------------------------
  // View --------------------------------------------------
  if (!loggedInUser) {
    window.location.href = "/login";
    return null;
  }
  return (
    <section>
      <h1>Browse Verified Claims</h1>
      <ClaimsMap claims={claims} basePath="/claims" />
    </section>
  );
}

export default Home;
