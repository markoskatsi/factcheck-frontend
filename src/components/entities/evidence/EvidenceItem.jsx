export function EvidenceItem({ evidence }) {
  return (
    <div key={evidence.EvidenceID}>
      <h3>{evidence.EvidencetypeName}</h3>
      <p>{evidence.EvidenceDescription}</p>
      {evidence.EvidenceURL && (
        <a href={evidence.EvidenceURL}> View Evidence Link</a>
      )}
      {evidence.EvidenceFilename && (
        <a href={evidence.EvidenceFilepath} download>
          {" "}
          📄{evidence.EvidenceFilename}
        </a>
      )}
    </div>
  );
}

export default EvidenceItem;
