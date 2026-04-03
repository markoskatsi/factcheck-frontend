import useLoad from "../../api/useLoad.js";
import ClaimsMap from "../../entities/claims/ClaimsMap.jsx";
import { useAuth } from "../../auth/useAuth.jsx";
import "../submitters/MyClaims.scss";
import { useState, useEffect } from "react";

function EditorTasks() {
  // Inititalisation ---------------------------------------
  const { loggedInUserID } = useAuth();
  const assignedClaimsEndpoint = `/assignments/users/${loggedInUserID}?orderby=AssignmentCreated%20desc`;

  // State -------------------------------------------------
  const [claims, ,] = useLoad(assignedClaimsEndpoint);
  // Context -----------------------------------------------
  // Methods -----------------------------------------------
  // View --------------------------------------------------
  return (
    <section>
      <h1>My Tasks</h1>
      <ClaimsMap claims={claims} basePath="/verdict" />
    </section>
  );
}

export default EditorTasks;
