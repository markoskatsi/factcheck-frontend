import FuzzyText from "../UI/FuzzyText";
import "./404.scss";

function PageNotFound() {
  const hoverIntensity = 0.5;
  const enableHover = true;
  const color = "#222";
  return (
    <div className="errorMessage">
      <FuzzyText
        baseIntensity={0.2}
        hoverIntensity={hoverIntensity}
        enableHover={enableHover}
        color={color}
      >
        Page Not Found
      </FuzzyText>
    </div>
  );
}
export default PageNotFound;
