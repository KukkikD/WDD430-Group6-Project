import FAQ from "./faqs"
import OurMission from "./OurMission"
import OurStory from "./ourStory"
import OurTeam from "./ourTeam"

export default function page(){
    return (       
            <div>
                <h1 className="text-5xl text-[#b8aa8d] mt-2 mb-2">About Us</h1>
                <OurStory />
                <OurTeam />
                <OurMission/>
                <FAQ />
            </div>
        )
}