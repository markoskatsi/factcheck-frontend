export function SourceItem({ source }) {
  return (
    <div key={source.SourceID}>
      <h3>{source.SourcetypeName}</h3>
      <p>{source.SourceDescription}</p>
      {source.SourceURL && <a href={source.SourceURL}> View Source Link</a>}
      {source.SourceFilename && (
        <a href={source.SourceFilepath} download>
          {" "}
          📄{source.SourceFilename}
        </a>
      )}
    </div>
  );
}

export default SourceItem;
