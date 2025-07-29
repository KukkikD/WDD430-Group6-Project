import { Team } from "../data/team";
import TeamCard from "./teamCard";

export default function OurTeam() {
  return (
    <div className=" ">
      <h2 className="text-2xl text-center bg-[#C7C0C0] p-3 text-white mt-3">
        Discover <span className="text-4xl">Our</span> Team
      </h2>
      <div className="flex flex-wrap justify-between gap-2 size-[70%] mt-5 mb-5 m-auto">
        {Team.map((team, index) => (
          <TeamCard
            key={index}
            fullName={team.fullName}
            role={team.projectRole}
            linkedIn={team.linkedIn}
          />
        ))}
      </div>
    </div>
  );
}
