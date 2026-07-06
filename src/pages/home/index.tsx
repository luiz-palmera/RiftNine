import { Button } from "@/components/ui/button";

export const Home = () => {
  return (
    <>
      <div className="bg-purple p-20 text-white text-4xl">Rift9</div>{" "}
      <div className="mt-5 flex p-5 items-center justify-center gap-5">
        <Button
          title="Daily"
          variant="default"
          onClick={() => {
            console.log("Entrando...");
          }}
        />
        <Button
          title="Exit"
          variant="destructive"
          onClick={() => {
            console.log("Entrando...");
          }}
        />
      </div>
    </>
  );
};
