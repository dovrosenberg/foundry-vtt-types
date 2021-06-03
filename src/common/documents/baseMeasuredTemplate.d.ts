import { DocumentMetadata } from '../abstract/document';
import { Document } from '../abstract/module';
import { BaseUser } from './baseUser';

/**
 * The MeasuredTemplate embedded document model.
 */
export declare class BaseMeasuredTemplate extends Document<any, any> {
  static get metadata(): Merge<
    DocumentMetadata,
    {
      name: 'MeasuredTemplate';
      collection: 'templates';
      label: 'DOCUMENT.MeasuredTemplate';
      isEmbedded: true;
      permissions: {
        create: 'TEMPLATE_CREATE';
        update: (user: BaseUser, doc: any, data: any) => boolean;
        delete: (user: BaseUser, doc: any, data: any) => boolean;
      };
    }
  >;
}
