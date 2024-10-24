import ReactMarkdown from 'react-markdown';

import CollapsingDetails from './CollapsingDetails';

type Props = {
  header?: string;
  descr: string;
}

export default function Description({ header, descr }: Props) {
  return (
    <CollapsingDetails header={header ?? "Description"}>
      <ReactMarkdown>
        {descr}
      </ReactMarkdown>
    </CollapsingDetails>
  );
}
