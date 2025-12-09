import useLoad from "../api/useLoad.js";
import { CardContainer, Card } from "../UI/Card.jsx";
import ClaimItem from "../entities/claims/ClaimItem.jsx";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/useAuth.jsx";
import { useState } from "react";
import ClaimForm from "../entities/claims/ClaimForm.jsx";
import API from "../api/API.js";
import "./MyClaims.scss";

function MyClaims() {
  // Inititalisation ---------------------------------------
  const { loggedInUserID } = useAuth();
  const claimsEndpoint = `/claims/users/${loggedInUserID}`;
  const allClaimsEndpoint = "/claims";

  // State -------------------------------------------------
  const [claims, , loadingClaimsMessage, loadClaims] = useLoad(claimsEndpoint);
  const [showForm, setShowForm] = useState(false);
  // Context -----------------------------------------------
  // Methods -----------------------------------------------
  const handleSubmit = async (claim) => {
    const claimResponse = await API.post(allClaimsEndpoint, claim);
    if (claimResponse.isSuccess) {
      setShowForm(false);
      await loadClaims(claimsEndpoint);
    }
    return claimResponse.isSuccess;
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  const handleClick = () => {
    setShowForm(true);
  };

  // View --------------------------------------------------
  return (
    <section>
      <h1>My Claims</h1>
      {!showForm ? (
        <button className="AddClaim" onClick={handleClick}>
          Add New Claim
        </button>
      ) : (
        <ClaimForm onSubmit={handleSubmit} onCancel={handleCancel} />
      )}

      {!claims ? (
        <p>You have not made any claims</p>
      ) : (
        <CardContainer>
          {claims.map((claim) => (
            <Link to={`/myclaims/${claim.ClaimID}`} key={claim.ClaimID}>
              <div className="fixed">
                <Card>
                  <ClaimItem claim={claim} />
                </Card>
              </div>
            </Link>
          ))}
        </CardContainer>
      )}
    </section>
  );
}

export default MyClaims;
