import Details from './Details';
import CollapsingDetails from './CollapsingDetails';
import Description from './Description';
import Deprecation from './Deprecation';
import Interface from './Interface';
import Request from './Request';
import Response from './Response';
import Enum from './Enum';
import TypeAlias from './TypeAlias';
import References from './References';

import { useSchemaContext } from './SchemaContext';

import { BaseType, Interface as InterfaceType, Request as RequestType, Response as ResponseType, Enum as EnumType, TypeAlias as TypeAliasType } from './metamodel';

type Props = {
  type: BaseType;
}

export default function Type({ type }: Props) {
  const { references } = useSchemaContext();
  const typeName = `${type.name.namespace}::${type.name.name}`;

  return (
    <>
      <Details header="Kind" value={type.kind} />
      {type.description && <Description descr={type.description} />}
      {type.variantName && <Details header="Variant name" value=<code>{type.variantName}</code> />}
      {type.codegenNames &&
        <CollapsingDetails header="Code generation names">
          {type.codegenNames.map(n => <Details key={n} value=<code>{n}</code> />)}
        </CollapsingDetails>
      }
      {type.docUrl && <Details header="Documentation" value=
        <a href={type.docUrl} target="_blank" rel="noreferrer">         
          Open&nbsp;
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"/>
            <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"/>
          </svg>
        </a>
      />}
      {type.deprecation && <Deprecation deprecation={type.deprecation} />}
      {type.esQuirk && <Description header="Notes" descr={type.esQuirk} />}
      {type.kind === 'interface' && <Interface type={type as InterfaceType} />}
      {type.kind === 'request' && <Request type={type as RequestType} />}
      {type.kind === 'response' && <Response type={type as ResponseType} />}
      {type.kind === 'enum' && <Enum type={type as EnumType} />}
      {type.kind === 'type_alias' && <TypeAlias type={type as TypeAliasType} />}
      {type.variantName && <Details header="Variant name" value={type.variantName} />}
      <Details header="Specification" value=
        <a href={'https://github.com/elastic/elasticsearch-specification/blob/main/specification/' + type.specLocation} target="_blank" rel="noreferrer">
          Open&nbsp;
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"/>
            <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"/>
          </svg>
        </a> />
      {references[typeName] && <References typeName={typeName} />}
    </>
  );
}

