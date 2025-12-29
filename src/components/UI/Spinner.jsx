import { ClipLoader } from "react-spinners";
import "./Spinner.scss";

export function Spinner() {
  return (
    <div className="spinner">
      <ClipLoader color="#3498db" size={50} />
    </div>
  );
}
