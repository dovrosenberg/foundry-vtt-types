import { DocumentMetadata } from '../abstract/document';
import { Document } from '../abstract/module';
import { BaseUser } from './baseUser';

/**
 * The Combatant embedded document model.
 */
export declare class BaseCombatant extends Document<any, any> {
  static get metadata(): Merge<
    DocumentMetadata,
    {
      name: 'Combatant';
      collection: 'combatants';
      label: 'DOCUMENT.Combatant';
      isEmbedded: true;
      permissions: {
        create: 'PLAYER';
        update: (user: BaseUser, doc: any, data: any) => boolean;
      };
    }
  >;
}
