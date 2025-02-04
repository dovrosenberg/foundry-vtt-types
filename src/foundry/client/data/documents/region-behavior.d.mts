import type { ConfiguredRegionBehavior } from "../../../../configuration/index.d.mts";
import type { DeepPartial, FixedInstanceType, InexactPartial } from "../../../../utils/index.d.mts";
import type Document from "../../../common/abstract/document.d.mts";
import type { fields } from "../../../common/data/module.d.mts";
import type BaseRegionBehavior from "../../../common/documents/region-behavior.d.mts";
import type { DataSchema } from "../../../common/data/fields.d.mts";

declare global {
  namespace RegionBehavior {
    /**
     * The implementation of the RegionBehavior document instance configured through `CONFIG.RegionBehavior.documentClass` in Foundry and
     * {@link DocumentClassConfig | `DocumentClassConfig`} or {@link ConfiguredRegionBehavior | `configuration/ConfiguredRegionBehavior`} in fvtt-types.
     */
    type Implementation = Document.ConfiguredInstanceForName<"RegionBehavior">;

    /**
     * The implementation of the RegionBehavior document configured through `CONFIG.RegionBehavior.documentClass` in Foundry and
     * {@link DocumentClassConfig | `DocumentClassConfig`} in fvtt-types.
     */
    type ImplementationClass = Document.ConfiguredClassForName<"RegionBehavior">;

    /**
     * A document's metadata is special information about the document ranging anywhere from its name,
     * whether it's indexed, or to the permissions a user has over it.
     */
    interface Metadata extends Document.MetadataFor<"RegionBehavior"> {}

    type SubType = Game.Model.TypeNames<"RegionBehavior">;
    type ConfiguredSubTypes = Document.ConfiguredSubTypesOf<"RegionBehavior">;
    type Known = RegionBehavior.OfType<RegionBehavior.ConfiguredSubTypes>;
    type OfType<Type extends SubType> = Document.Internal.OfType<
      ConfiguredRegionBehavior<Type>,
      RegionBehavior<SubType>
    >;

    /**
     * A document's parent is something that can contain it.
     * For example an `RegionBehavior` can be contained by an `Actor` which makes `Actor` one of its possible parents.
     */
    type Parent = RegionDocument.Implementation | null;

    /**
     * An instance of `RegionBehavior` that comes from the database.
     */
    interface Stored<out Subtype extends SubType = SubType> extends Document.Stored<OfType<Subtype>> {}

    /**
     * The data put in {@link Document._source | `Document._source`}. This data is what was
     * persisted to the database and therefore it must be valid JSON.
     *
     * For example a {@link fields.SetField | `SetField`} is persisted to the database as an array
     * but initialized as a {@link Set | `Set`}.
     *
     * Both `Source` and `PersistedData` are equivalent.
     */
    interface Source extends PersistedData {}

    /**
     * The data put in {@link RegionBehavior._source | `RegionBehavior._source`}. This data is what was
     * persisted to the database and therefore it must be valid JSON.
     *
     * Both `Source` and `PersistedData` are equivalent.
     */
    interface PersistedData extends fields.SchemaField.PersistedData<Schema> {}

    /**
     * The data necessary to create a document. Used in places like {@link RegionBehavior.create | `RegionBehavior.create`}
     * and {@link RegionBehavior | `new RegionBehavior(...)`}.
     *
     * For example a {@link fields.SetField | `SetField`} can accept any {@link Iterable | `Iterable`}
     * with the right values. This means you can pass a `Set` instance, an array of values,
     * a generator, or any other iterable.
     */
    interface CreateData extends fields.SchemaField.CreateData<Schema> {}

    /**
     * The data after a {@link Document | `Document`} has been initialized, for example
     * {@link RegionBehavior.name | `RegionBehavior#name`}.
     *
     * This is data transformed from {@link RegionBehavior.Source | `RegionBehavior.Source`} and turned into more
     * convenient runtime data structures. For example a {@link fields.SetField | `SetField`} is
     * persisted to the database as an array of values but at runtime it is a `Set` instance.
     */
    interface InitializedData extends fields.SchemaField.InitializedData<Schema> {}

    /**
     * The data used to update a document, for example {@link RegionBehavior.update | `RegionBehavior#update`}.
     * It is a distinct type from {@link RegionBehavior.CreateData | `DeepPartial<RegionBehavior.CreateData>`} because
     * it has different rules for `null` and `undefined`.
     */
    interface UpdateData extends fields.SchemaField.UpdateData<Schema> {}

    /**
     * The schema for {@link RegionBehavior | `RegionBehavior`}. This is the source of truth for how an RegionBehavior document
     * must be structured.
     *
     * Foundry uses this schema to validate the structure of the {@link RegionBehavior | `RegionBehavior`}. For example
     * a {@link fields.StringField | `StringField`} will enforce that the value is a string. More
     * complex fields like {@link fields.SetField | `SetField`} goes through various conversions
     * starting as an array in the database, initialized as a set, and allows updates with any
     * iterable.
     */
    interface Schema extends DataSchema {
      /**
       * The _id which uniquely identifies this RegionBehavior document
       * @defaultValue `null`
       */
      _id: fields.DocumentIdField;

      /**
       * The name used to describe the RegionBehavior
       * @defaultValue `""`
       */
      name: fields.StringField<{ required: true; blank: true; label: string; textSearch: true }>;

      /**
       * An RegionBehavior subtype which configures the system data model applied
       */
      type: fields.DocumentTypeField<typeof BaseRegionBehavior>;

      /**
       * The system data object which is defined by the system template.json model
       */
      system: fields.TypeDataField<typeof BaseRegionBehavior>;

      /**
       * Is the RegionBehavior currently disabled?
       * @defaultValue `false`
       */
      disabled: fields.BooleanField<{ label: string; hint: string }>;

      /**
       * An object of optional key/value flags
       */
      flags: fields.ObjectField.FlagsField<"RegionBehavior">;

      /**
       * An object of creation and access information
       * @defaultValue see {@link fields.DocumentStatsField}
       */
      _stats: fields.DocumentStatsField;
    }

    namespace DatabaseOperation {
      /** Options passed along in Get operations for RegionBehaviors */
      interface Get extends foundry.abstract.types.DatabaseGetOperation<RegionBehavior.Parent> {}
      /** Options passed along in Create operations for RegionBehaviors */
      interface Create<Temporary extends boolean | undefined = boolean | undefined>
        extends foundry.abstract.types.DatabaseCreateOperation<
          RegionBehavior.CreateData,
          RegionBehavior.Parent,
          Temporary
        > {}
      /** Options passed along in Delete operations for RegionBehaviors */
      interface Delete extends foundry.abstract.types.DatabaseDeleteOperation<RegionBehavior.Parent> {}
      /** Options passed along in Update operations for RegionBehaviors */
      interface Update
        extends foundry.abstract.types.DatabaseUpdateOperation<RegionBehavior.UpdateData, RegionBehavior.Parent> {}

      /** Options for {@link RegionBehavior.createDocuments | `RegionBehavior.createDocuments`} */
      type CreateOperation<Temporary extends boolean | undefined = boolean | undefined> =
        Document.Database.CreateOperation<Create<Temporary>>;
      /** Options for {@link RegionBehavior._preCreateOperation | `RegionBehavior._preCreateOperation`} */
      type PreCreateOperationStatic = Document.Database.PreCreateOperationStatic<Create>;
      /** Options for {@link RegionBehavior#_preCreate | `RegionBehavior#_preCreate`} */
      type PreCreateOperationInstance = Document.Database.PreCreateOperationInstance<Create>;
      /** Options for {@link RegionBehavior#_onCreate | `RegionBehavior#_onCreate`} */
      type OnCreateOperation = Document.Database.OnCreateOperation<Create>;

      /** Options for {@link RegionBehavior.updateDocuments | `RegionBehavior.updateDocuments`} */
      type UpdateOperation = Document.Database.UpdateOperation<Update>;
      /** Options for {@link RegionBehavior._preUpdateOperation | `RegionBehavior._preUpdateOperation`} */
      type PreUpdateOperationStatic = Document.Database.PreUpdateOperationStatic<Update>;
      /** Options for {@link RegionBehavior#_preUpdate | `RegionBehavior#_preUpdate`} */
      type PreUpdateOperationInstance = Document.Database.PreUpdateOperationInstance<Update>;
      /** Options for {@link RegionBehavior#_onUpdate | `RegionBehavior#_onUpdate`} */
      type OnUpdateOperation = Document.Database.OnUpdateOperation<Update>;

      /** Options for {@link RegionBehavior.deleteDocuments | `RegionBehavior.deleteDocuments`} */
      type DeleteOperation = Document.Database.DeleteOperation<Delete>;
      /** Options for {@link RegionBehavior._preDeleteOperation | `RegionBehavior._preDeleteOperation`} */
      type PreDeleteOperationStatic = Document.Database.PreDeleteOperationStatic<Delete>;
      /** Options for {@link RegionBehavior#_preDelete | `RegionBehavior#_preDelete`} */
      type PreDeleteOperationInstance = Document.Database.PreDeleteOperationInstance<Delete>;
      /** Options for {@link RegionBehavior#_onDelete | `RegionBehavior#_onDelete`} */
      type OnDeleteOperation = Document.Database.OnDeleteOperation<Delete>;
    }

    /**
     * @deprecated - {@link RegionBehavior.DatabaseOperation}
     */
    interface DatabaseOperations extends Document.Database.Operations<RegionBehavior> {}

    /**
     * @deprecated {@link RegionBehavior.Types | `RegionBehavior.SubType`}
     */
    type TypeNames = RegionBehavior.SubType;

    /**
     * @deprecated {@link RegionBehavior.CreateData | `RegionBehavior.CreateData`}
     */
    interface ConstructorData extends RegionBehavior.CreateData {}

    /**
     * @deprecated {@link RegionBehavior.implementation | `RegionBehavior.ImplementationClass`}
     */
    type ConfiguredClass = ImplementationClass;

    /**
     * @deprecated {@link RegionBehavior.Implementation | `RegionBehavior.Implementation`}
     */
    type ConfiguredInstance = Implementation;
  }

  /**
   * The client-side RegionBehavior document which extends the common BaseRegionBehavior model.
   */
  class RegionBehavior<out SubType extends RegionBehavior.SubType = RegionBehavior.SubType> extends ClientDocumentMixin(
    foundry.documents.BaseRegionBehavior,
  )<SubType> {
    /** A convenience reference to the RegionDocument which contains this RegionBehavior. */
    get region(): RegionDocument.Implementation | null;

    /** A convenience reference to the Scene which contains this RegionBehavior. */
    get scene(): Scene.Implementation | null;

    /** A RegionBehavior is active if and only if it was created, hasn't been deleted yet, and isn't disabled. */
    get active(): boolean;

    /** A RegionBehavior is viewed if and only if it is active and the Scene of its Region is viewed. */
    get viewed(): boolean;

    override prepareBaseData(): void;

    /**
     * Does this RegionBehavior handle the Region events with the given name?
     * @param eventName     - The Region event name
     */
    hasEvent(eventName: string): boolean;

    /**
     * Handle the Region Event.
     * @param event     - The Region event
     * @internal
     */
    protected _handleRegionEvent(event: RegionDocument.RegionEvent): void;

    static createDialog<T extends Document.AnyConstructor>(
      this: T,
      data?: DeepPartial<Document.ConstructorDataFor<NoInfer<T>> & Record<string, unknown>>,
      context?: Pick<foundry.abstract.types.DatabaseCreateOperation<FixedInstanceType<NoInfer<T>>>, "parent" | "pack"> &
        InexactPartial<
          DialogOptions & {
            /** A restriction the selectable sub-types of the Dialog. */
            types: string[];
          }
        >,
    ): Promise<Document.ToConfiguredInstance<T> | null | undefined>;

    /**
     * @privateRemarks _onCreate, _preUpdate, _onUpdate, _onDelete, preCreateOperation, _preUpdateOperation, _onCreateOperation,
     * _onUpdateOperation, _onDeleteOperation, _preCreateDescendantDocuments, _preUpdateDescendantDocuments, _preDeleteDescendantDocuments,
     * _onUpdateDescendantDocuments, and _onDeleteDescendantDocuments are all overridden but with no signature changes.
     * For type simplicity they are left off. These methods historically have been the source of a large amount of computation from tsc.
     */
  }
}
