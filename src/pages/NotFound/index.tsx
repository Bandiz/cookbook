import { Link } from "react-router-dom";
import { HOME } from "../../constants/routes";
import "./NotFound.scss";

const NotFound = () => {
  return (
    <section className="not-found-page">
      <div className="not-found-container">
        <h1>Woops, we're pretty sure something went horribly wrong!</h1>
        <Link to={HOME} className="btn btn-primary">
          back home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
