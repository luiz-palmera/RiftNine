import { Button } from "../../components/ui/button";

export const Home = () => {
  return (
    <>
      <div className="bg-purple p-20 text-white text-4xl">Rift9</div>{" "}
      <div className="mt-5 flex items-center justify-center">
        <Button
          title="Daily"
          onClick={() => {
            console.log("Entrando...");
          }}
        />
      </div>
    </>
  );
};
