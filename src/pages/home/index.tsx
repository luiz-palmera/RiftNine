import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-purple p-20 text-white text-4xl">Rift9</div>{" "}
      <div className="mt-5 flex p-5 items-center justify-center gap-5">
        <Button
          title="Daily"
          variant="default"
          onClick={() => navigate("/daily")}
        />
        <Button
          title="Components"
          variant="destructive"
          onClick={() => navigate("/components")}
        />
      </div>
    </>
  );
};
