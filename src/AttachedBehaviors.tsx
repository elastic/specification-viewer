import CollapsingDetails from './CollapsingDetails';
import CollapsingType from './CollapsingType';

type Props = {
  behaviors: string[];
}

export default function AttachedBehaviors({ behaviors }: Props) {
  return (
    <CollapsingDetails header="Attached behaviors">
      {behaviors.map(b => (
        <CollapsingType key={b} header="Behavior" namespace="_spec_utils" name={b} />
      ))}
    </CollapsingDetails>
  );
}

