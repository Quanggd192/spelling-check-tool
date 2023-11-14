import ChatbotApp from "./pages/OpenAI";
import TextGears from "./pages/text-gears";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
const App = () => {
  // const configuration = new Configuration({
  //   apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  // });
  const router = createBrowserRouter([
    {
      path: "/text",
      element: <TextGears />,
      errorElement: <div>Error</div>,
    },
    {
      path: "/",
      element: <ChatbotApp />,
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