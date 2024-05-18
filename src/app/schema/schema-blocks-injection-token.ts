import { InjectionToken, Provider } from '@angular/core';

import { ValidationConnector } from '@components/blocks/formero-validation/validation.connector';
import { AgreementConnector } from '@components/blocks/formero-agreement/agreement.connector';
import { CheckgroupConnector } from '@components/blocks/formero-checkgroup/checkgroup.connector';
import { DropdownConnector } from '@components/blocks/formero-dropdown/dropdown.connector';
import { RadiogroupConnector } from '@components/blocks/formero-radiogroup/radiogroup.connector';
import { TextareaConnector } from '@components/blocks/formero-textarea/textarea.connector';
import { TextboxConnector } from '@components/blocks/formero-textbox/textbox.connector';
import { BlocktextConnector } from '@components/blocks/formero-blocktext/blocktext.connector';
import { TitleConnector } from '@components/blocks/formero-title/title.connector';

export type Connectors =
  | AgreementConnector
  | CheckgroupConnector
  | DropdownConnector
  | RadiogroupConnector
  | TextareaConnector
  | TextboxConnector
  | BlocktextConnector
  | TitleConnector
  | ValidationConnector;

export const SCHEMA_BLOCKS: InjectionToken<Connectors> = new InjectionToken<Connectors>(
  'SchemaBlocks',
);

export const schemaBlocksProviders: Provider[] = [
  { provide: SCHEMA_BLOCKS, useExisting: AgreementConnector, multi: true },
  { provide: SCHEMA_BLOCKS, useExisting: CheckgroupConnector, multi: true },
  { provide: SCHEMA_BLOCKS, useExisting: DropdownConnector, multi: true },
  { provide: SCHEMA_BLOCKS, useExisting: RadiogroupConnector, multi: true },
  { provide: SCHEMA_BLOCKS, useExisting: TextareaConnector, multi: true },
  { provide: SCHEMA_BLOCKS, useExisting: TextboxConnector, multi: true },
  { provide: SCHEMA_BLOCKS, useExisting: BlocktextConnector, multi: true },
  { provide: SCHEMA_BLOCKS, useExisting: TitleConnector, multi: true },
  { provide: SCHEMA_BLOCKS, useExisting: ValidationConnector, multi: true },
];
