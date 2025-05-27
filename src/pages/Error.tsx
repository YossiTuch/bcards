import { Button } from "flowbite-react";
import { BsQuestion } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-18 text-center">
      <h1 className="text-5xl text-red-700">404: Page not found</h1>
      <BsQuestion size={100} className="text-red-600" />
      <p className="text-3xl">The page you are looking for is unavailable.</p>
      <Button onClick={() => navigate("/")}>Go Home</Button>
    </div>
  );
};
export default Error;
