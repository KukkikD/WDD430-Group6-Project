"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from "react-bootstrap/Accordion";

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
