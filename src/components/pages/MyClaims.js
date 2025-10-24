import { useState, useEffect } from "react";
import API from "../api/API.js";

function MyClaims() {
  // Inititalisation ---------------------------------------
  const loggedinUserID = 1;
  const endpoint = `/claims/users/${loggedinUserID}`;
  // State -------------------------------------------------
  const [claims, setClaims] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState("Loading records...");
  // Context -----------------------------------------------
  // Methods -----------------------------------------------
  const apiCall = async (endpoint) => {
    const response = await API.get(endpoint);
    response.isSuccess
      ? setClaims(response.result)
      : setLoadingMessage(response.message);
  };

  useEffect(() => {
    apiCall(endpoint);
  }, [endpoint]);

  // View --------------------------------------------------
  return (
    <section>
      <h1>My Claims</h1>
      {!claims ? (
        <p>{loadingMessage}</p>
      ) : claims.length === 0 ? (
        <p>You have not made any claims yet!</p>
      ) : (
        claims.map((claim) => <p key={claim.ClaimID}>{claim.ClaimTitle}</p>)
      )}
    </section>
  );
}

export default MyClaims;
