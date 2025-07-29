import FAQ from "./faqs"
import OurMission from "./OurMission"
import OurStory from "./ourStory"
import OurTeam from "./ourTeam"

export default function page(){
    return (       
            <>
                <h1 className="text-5xl">About Us</h1>
                <OurStory />
                <OurTeam />
                <OurMission/>
                <FAQ />
            </>
        )
}