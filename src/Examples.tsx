import CollapsingDetails from './CollapsingDetails';
import Details from './Details';
import { Example } from './metamodel';

type Props = {
  examples: Record<string, Example>;
};

export default function Examples({ examples }: Props) {
  return (
    <CollapsingDetails header="Examples">
      {Object.keys(examples).map(example => (
        <CollapsingDetails header={example}>
          {examples[example].summary && <Details header="Summary" value={examples[example].summary} />}
          {examples[example].description && <Details header="Description" value={examples[example].description} />}
          {examples[example].value && <Details header="Value" value={examples[example].value} />}
          {examples[example].external_value && <Details header="External Value" value={examples[example].external_value} />}
        </CollapsingDetails>
      ))}
    </CollapsingDetails>
  );
}
