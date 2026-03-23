import useLoad from "../../api/useLoad.js";
import ClaimsMap from "../../entities/claims/ClaimsMap.jsx";
import { useAuth } from "../../auth/useAuth.jsx";
import "../submitters/MyClaims.scss";
import { useState, useEffect } from "react";

function EditorTasks() {
  // Inititalisation ---------------------------------------
  const { loggedInUserID } = useAuth();
  const assignedClaimsEndpoint = `/assignments/users/${loggedInUserID}?orderby=AssignmentCreated%20desc`;
  const list = [{ name: "Awaiting Verdict Approval" }, { name: "Published" }];

  // State -------------------------------------------------
  const [claims, ,] = useLoad(assignedClaimsEndpoint);
  const [filteredClaims, setFilteredClaims] = useState([]);

  useEffect(() => {
    setFilteredClaims(claims);
  }, [claims]);

  // Context -----------------------------------------------
  // Methods -----------------------------------------------
  const handleStatusFilterChange = (e) => {
    const statusName = e.target.value;
    if (!statusName) {
      setFilteredClaims(claims);
    } else {
      setFilteredClaims(
        claims.filter((claim) => claim.ClaimstatusName === statusName),
      );
    }
  };
  // View --------------------------------------------------
  return (
    <section>
      <h1>My Tasks</h1>
      <select className="statusFilter" onChange={handleStatusFilterChange}>
        <option value="">All</option>
        {list.map((item) => (
          <option key={item.name} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
      <ClaimsMap claims={filteredClaims} basePath="/verdict" />
    </section>
  );
}

export default EditorTasks;
