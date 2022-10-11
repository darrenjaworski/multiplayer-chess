import { Link } from "react-router-dom";

// TODO give me a better 404 screen!
export const NotFound = () => {
  return (
    <>
      <h1>Uh Oh! You're lost!</h1>
      <Link to="/">Go home!</Link>
    </>
  );
};
