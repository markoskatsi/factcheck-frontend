import { useState, useEffect } from "react";
import API from "../api/API.js";
import { CardContainer, Card } from "../UI/Card.js";
import ClaimItem from "../entity/ClaimItem.js";

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
        <CardContainer>
          {claims.map((claim) => (
            <Card key={claim.ClaimID}>
              <ClaimItem claim={claim} key={claim.ClaimID} />
            </Card>
          ))}
        </CardContainer>
      )}
      <button
        style={{
          padding: "12px 24px",
          marginTop: "50px",
          cursor: "pointer",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Add New Claim
      </button>
    </section>
  );
}

export default MyClaims;
