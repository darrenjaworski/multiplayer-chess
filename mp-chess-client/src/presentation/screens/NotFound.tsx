import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <>
      <h1>Uh Oh! Let's get you back to a game of chess!</h1>
      <Link to="/">Click here to set up a new game.</Link>
    </>
  );
};
