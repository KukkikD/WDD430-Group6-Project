import Link from "next/link";

export default function TeamCard({fullName, role, linkedIn, image}) {
    return (
        <div className="flex flex-col xl:size-[28%] lg:size-[30%] md:size-[30%] sm:size-[40%] border-black rounded-xl text-center shadow-xl gap-3 p-5">
            <img className="size-[100px]" src={image} alt="Place holder" />
            <h3 className="text-xl text-[#b8aa8d] font-extrabold">{fullName}</h3>
            <h4 className="text-lg">{role}</h4>
            <Link href={linkedIn}>My linkedin</Link>
        </div>
    )
}