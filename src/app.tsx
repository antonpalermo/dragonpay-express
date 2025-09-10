import { useEffect, type FC } from "hono/jsx";

const App: FC<{ message: string }> = ({ message }) => {
  return <h1>{message}</h1>;
};

export default App;
