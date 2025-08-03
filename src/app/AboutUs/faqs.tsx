import { faqs } from "../data/faq";
// import Dropdown from "./accordion";


export default function FAQ(){
    return (
        <div className="p-8">
            <h2 className="text-4xl text-[#b8aa8d] shadow-xl">FAQ</h2>
            {/* <div className="shadow-xl">
                 {faqs.map((faq, index) => (
                    <Dropdown keyProp={index} key= {index} question={faq.question} answer={faq.answer}/>
                 ))}
            </div> */}
        </div>
    )
}