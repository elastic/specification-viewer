import Details from './Details';
import CollapsingDetails from './CollapsingDetails';
import CollapsingType from './CollapsingType';

import { ValueOf as ValueOfType } from './metamodel';
import { InstanceOf, ArrayOf, UnionOf, DictionaryOf, LiteralValue } from './metamodel';

type Props = {
  header?: string;
  value: ValueOfType;
}

export default function ValueOf({ header, value }: Props) {
  if (value.kind === 'instance_of') {
    const v = value as InstanceOf;
    return (
      <CollapsingDetails expanded header={header ?? "Value"} value="Instance of">
        <CollapsingType header="Type" namespace={v.type.namespace} name={v.type.name} />
        {v.generics &&
          <CollapsingDetails header="Generics">
            {v.generics.map((g, i) => (
              <ValueOf key={i} value={g} />
            ))}
          </CollapsingDetails>
        }
      </CollapsingDetails>
    );
  }
  else if (value.kind === 'array_of') {
    const v = value as ArrayOf;
    return (
      <CollapsingDetails expanded header={header ?? "Value"} value="Array of">
        <ValueOf value={v.value} />
      </CollapsingDetails>
    );
  }
  else if (value.kind === 'union_of') {   
    const v = value as UnionOf;
    return (
      <CollapsingDetails expanded header={header ?? "Value"} value="Union of">
        {v.items.map((t, i) => (
          <ValueOf key={i} value={t} />
        ))}
      </CollapsingDetails>
    );
  }
  else if (value.kind === 'dictionary_of') {
    const v = value as DictionaryOf;
    return (
      <CollapsingDetails expanded header={header ?? "Value"} value="Dictionary of">
        <ValueOf header="Keys" value={v.key} />
        <ValueOf header="Values" value={v.value} />
        <Details header="Single key" value={v.singleKey ? 'Yes' : 'No'} />
      </CollapsingDetails>
    );
  }
  else if (value.kind === 'user_defined_value') {
    return (
      <Details header={header ?? "Value"} value="User defined value" />
    );
  }
  else if (value.kind === 'literal_value') {
    const v = value as LiteralValue;
    return (
      <CollapsingDetails expanded header={header ?? "Value"} value="Literal value">
        <Details header="Value" value={v.value.toString()} />
      </CollapsingDetails>
    );
  }
  else {
    return null;
  }
}
