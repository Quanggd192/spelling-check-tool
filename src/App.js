import EssayTextFixing from "./pages/openai/EssayTextFixing";
import EssayImageFixing from "./pages/openai/EssayImageFixing";
import TextGears from "./pages/text-gears";
import OpenAI from "openai";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "./pages/page.css";

const App = () => {
  // const configuration = new Configuration({
  //   apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  // });
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });
  const router = createBrowserRouter([
    {
      path: "/text",
      element: <TextGears />,
      errorElement: <div>Error</div>,
    },
    {
      path: "/image",
      element: <EssayImageFixing openai={openai} />,
      errorElement: <div>Error</div>,
    },
    {
      path: "/",
      element: <EssayTextFixing openai={openai} />,
      errorElement: <div>Error</div>,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
