import { Button } from "@/components/ui/button";
import { Info } from "@/components/ui/info";
import { useNavigate } from "react-router";
import { Clock, Trophy } from "pixelarticons/react";
import { Card } from "@/components/ui/card";
import { SearchBar } from "@/components/ui/search-bar";

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
          title="Exit"
          variant="destructive"
          onClick={() => {
            console.log("Entrando...");
          }}
        />
        <Info icon={<Trophy />} title="Score" content={0} />
        <Card title="MATCH INFO">
          <Info icon={<Trophy />} title="Score" content={12} />
          <Info icon={<Clock />} title="Time" content={"2:35"} />
        </Card>
        <SearchBar />
      </div>
    </>
  );
};
