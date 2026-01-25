import useLoad from "../api/useLoad.js";
import { CardContainer, Card } from "../UI/Card.jsx";
import ClaimItem from "../entities/claims/ClaimItem.jsx";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/useAuth.jsx";
import { useState } from "react";
import ClaimForm from "../entities/claims/ClaimForm.jsx";
import API from "../api/API.js";
import { Modal, useModal } from "../UI/Modal.jsx";
import { Button } from "../UI/Button.jsx";
import "./MyClaims.scss";
import { Spinner } from "../UI/Spinner.jsx";

function MyTasks() {
  // Inititalisation ---------------------------------------
  const { loggedInUserID } = useAuth();
  const assignmentsEndpoint = `/assignments/users/${loggedInUserID}`;

  // State -------------------------------------------------
  const [claims, , ] =
    useLoad(assignmentsEndpoint);

  // Context -----------------------------------------------
  // Methods -----------------------------------------------

  // View --------------------------------------------------
  return (
    <section>
      <h1>My Tasks</h1>

      {claims && claims.length > 0 ? (
        <CardContainer>
          {claims.map((claim) => (
            <Link to={`/mytasks/${claim.ClaimID}`} key={claim.ClaimID}>
              <div className="fixed">
                <Card>
                  <ClaimItem claim={claim} />
                </Card>
              </div>
            </Link>
          ))}
        </CardContainer>
      ) : (
        <p>You have no tasks assigned</p>
      )}
    </section>
  );
}

export default MyTasks;
