import Details from './Details';
import CollapsingDetails from './CollapsingDetails';
import CollapsingType from './CollapsingType';

import { InternalTag, ExternalTag, Container, Untagged } from './metamodel';

type Props = {
  variants: InternalTag | ExternalTag | Container | Untagged;
}

export default function Variants({ variants }: Props) {
  return (
    <CollapsingDetails header="Variants" value={variants.kind}>
      {variants.nonExhaustive !== undefined && <Details header="Non-exhaustive" value={variants.nonExhaustive ? 'Yes' : 'No'} />}
      {variants.kind === 'internal_tag' &&
        <>
          <Details header="Tag" value={(variants as InternalTag).tag} />
          {(variants as InternalTag).defaultTag && <Details header="Default tag" value={(variants as InternalTag).defaultTag} />}
        </>
      }
      {variants.kind === 'untagged' && <CollapsingType namespace={(variants as Untagged).untypedVariant.namespace} name={(variants as Untagged).untypedVariant.name} />}
    </CollapsingDetails>
  );
}
