import "./ClaimInfoLayout.scss";

const ClaimInfoLayout = ({ actions, main, sidebar, mainTitle, sidebarTitle }) => {
  return (
    <div className="claimInfoWrapper">
      {actions}
      <div className="claimLayout">
        <div className="claimMain">
          {mainTitle && <h2>{mainTitle}</h2>}
          {main}
        </div>
        <div className="claimSidebar">
          {sidebarTitle && <h2>{sidebarTitle}</h2>}
          {sidebar}
        </div>
      </div>
    </div>
  );
};

export default ClaimInfoLayout;
