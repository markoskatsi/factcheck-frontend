import { useState, useEffect } from "react";
import API from "../api/API.js";
import { CardContainer, Card } from "../UI/Card.js";
import ClaimItem from "../entities/claims/ClaimItem.js";
import { Link } from "react-router-dom";
import ClaimForm from "../entities/claims/ClaimForm.js";

function MyClaims() {
  // Inititalisation ---------------------------------------
  const loggedinUserID = 1;
  const endpoint = `/claims/users/${loggedinUserID}`;
  // State -------------------------------------------------
  const [claims, setClaims] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState("Loading records...");
  const [showForm, setShowForm] = useState(false);
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
            <Link
              to={`/myclaims/${claim.ClaimID}`}
              className="claimCardLink"
              key={claim.ClaimID}
            >
              <Card key={claim.ClaimID}>
                <ClaimItem claim={claim} key={claim.ClaimID} />
              </Card>
            </Link>
          ))}
        </CardContainer>
      )}
      <button
        onClick={() => setShowForm(!showForm)}
        style={{
          padding: "12px 24px",
          marginTop: "50px",
          cursor: "pointer",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {showForm ? "Cancel" : "Add New Claim"}
      </button>
      {showForm && (
        <div style={{ marginTop: "20px" }}>
          <ClaimForm />
        </div>
      )}
    </section>
  );
}

export default MyClaims;
