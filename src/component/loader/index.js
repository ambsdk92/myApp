import Spinner from "react-bootstrap/Spinner";
import "./styles.css";

function Loader() {
  return (
    <div className="loader-wrapper">
      <Spinner animation="border" variant="light" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export default Loader;
