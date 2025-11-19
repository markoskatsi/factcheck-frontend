
export function SourceItem({ source }) {
  return (
    <div key={source.SourceID}>
      <h3>{source.SourcetypeName}</h3>
      <p>
        {source.SourceDescription}
        <a href={source.SourceURL}> Link</a>
      </p>
    </div>
  );
}

export default SourceItem;
