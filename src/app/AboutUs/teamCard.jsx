export default function TeamCard({fullName, role, linkedIn}) {
    return (
        <div className="flex flex-col xl:size-[28%] lg:size-[30%] md:size-[30%] sm:size-[40%] border-black rounded-xl text-center shadow-xl gap-3 p-5">
            <img className="size-[100px]" src="../../../public/images/sellers/anna.png" alt="Place holder" />
            <h3 className="text-xl text-[#b8aa8d]">{fullName}</h3>
            <h4 className="text-lg">{role}</h4>
            <a href={linkedIn}>My linkedin</a>
        </div>
    )
}