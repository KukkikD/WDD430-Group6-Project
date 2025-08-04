"use client";

import Accordion from "react-bootstrap/Accordion";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Dropdown({keyProp, question, answer}){
  return (
    <Accordion>
      <Accordion.Item eventKey={keyProp.toString()}>
        <Accordion.Header>
          {question}
        </Accordion.Header>
        <Accordion.Body>
          {answer}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
