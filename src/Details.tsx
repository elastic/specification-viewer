import Accordion from 'react-bootstrap/Accordion';

type Props = {
  header?: string;
  value?: string | React.ReactNode;
};

export default function Details({ header, value }: Props) {
  return (
    <Accordion flush className="Details">
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          {header && <b>{ header }</b>}
          {header && value && <>:&nbsp;</>}
          {value && <><span>{ value }</span></>}
        </Accordion.Header>
      </Accordion.Item>
    </Accordion>
  );
}
