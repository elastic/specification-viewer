import { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';

type Props = {
  header?: string;
  value?: string | React.ReactNode;
  expanded?: boolean;
  cb?: () => React.ReactNode;
};

export default function CollapsingDetails({ header, value, expanded, cb, children }: React.PropsWithChildren<Props>) {
  const [body, setBody] = useState<React.ReactNode>(children);

  const onEnter = () => {
    if (cb) {
      setBody(cb());
    }
  };

  return (
    <Accordion flush defaultActiveKey={expanded ? "0" : ""} className="CollapsingDetails">
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          {header && <b>{ header }</b>}
          {header && value && <>:&nbsp;</>}
          {value && <><span>{ value }</span></>}
        </Accordion.Header>
        <Accordion.Body onEnter={cb ? onEnter : undefined}>{ body }</Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
