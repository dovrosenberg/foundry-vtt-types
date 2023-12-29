// FOUNDRY_VERSION: 10.291

import type { ConfiguredDocumentClass, ToObjectFalseType } from "../../../../types/helperTypes.mts";
import type { StoredDocument } from "../../../../types/utils.mts";
import type { DocumentModificationOptions } from "../../../common/abstract/document.mts";
import type BaseChatMessage from "../../../common/documents/chat-message.mts";
import type BaseUser from "../../../common/documents/user.mts";

declare global {
  /**
   * The client-side ChatMessage document which extends the common BaseChatMessage model.
   *
   * @see {@link documents.Messages}                The world-level collection of ChatMessage documents
   *
   * @param data - Initial data provided to construct the ChatMessage document
   */
  class ChatMessage extends ClientDocumentMixin(BaseChatMessage) {
    /**
     * Is the display of dice rolls in this message collapsed (false) or expanded (true)
     * @internal
     * @defaultValue `false`
     */
    protected _rollExpanded: boolean;

    /**
     * Is this ChatMessage currently displayed in the sidebar ChatLog?
     * @defaultValue `false`
     */
    logged: boolean;

    /**
     * Return the recommended String alias for this message.
     * The alias could be a Token name in the case of in-character messages or dice rolls.
     * Alternatively it could be the name of a User in the case of OOC chat or whispers.
     */
    get alias(): string;

    /**
     * Is the current User the author of this message?
     */
    get isAuthor(): boolean;

    /**
     * Return whether the content of the message is visible to the current user.
     * For certain dice rolls, for example, the message itself may be visible while the content of that message is not.
     */
    get isContentVisible(): boolean;

    /**
     * Test whether the chat message contains a dice roll
     */
    get isRoll(): boolean;

    /**
     * Return whether the ChatMessage is visible to the current User.
     * Messages may not be visible if they are private whispers.
     */
    get visible(): boolean;

    prepareDerivedData(): void;

    /**
     * Transform a provided object of ChatMessage data by applying a certain rollMode to the data object.
     * @param chatData     - The object of ChatMessage data prior to applying a rollMode preference
     * @param rollMode     - The rollMode preference to apply to this message data
     * @returns The modified ChatMessage data with rollMode preferences applied
     */
    static applyRollMode(chatData: BaseChatMessage.ConstructorData, rollMode: string): BaseChatMessage.ConstructorData;

    /**
     * Update the data of a ChatMessage instance to apply a requested rollMode
     * @param rollMode    - The rollMode preference to apply to this message data
     */
    applyRollMode(rollMode: keyof typeof CONFIG.Dice.rollModes | "roll"): void;

    /**
     * Attempt to determine who is the speaking character (and token) for a certain Chat Message
     * First assume that the currently controlled Token is the speaker
     *
     * @param options    - Options which affect speaker identification
     *                   (default: `{}`)
     * @returns The identified speaker data
     */
    static getSpeaker(options?: ChatMessage.GetSpeakerOptions | undefined): ChatMessage.SpeakerData;

    /**
     * A helper to prepare the speaker object based on a target TokenDocument
     * @param options   - Options which affect speaker identification
     *                  (default: `{}`)
     * @returns The identified speaker data
     * @internal
     */
    protected static _getSpeakerFromToken(
      options?:
        | {
            /**
             * The TokenDocument of the speaker
             */
            token: TokenDocument;

            /**
             * The name of the speaker to display
             */
            alias?: string | undefined;
          }
        | undefined,
    ): ChatMessage.GetSpeakerOptions;

    /* -------------------------------------------- */

    /**
     * A helper to prepare the speaker object based on a target Actor
     * @param options   - Options which affect speaker identification
     * @returns The identified speaker data
     * @internal
     */
    protected static _getSpeakerFromActor(options?: {
      /**
       * The Scene is which the speaker resides
       */
      scene?: Scene;

      /**
       * The Actor that is speaking
       */
      actor?: Actor;

      /**
       * The name of the speaker to display
       */
      alias?: string;
    }): ChatMessage.SpeakerData;

    /**
     * A helper to prepare the speaker object based on a target User
     * @param options   - Options which affect speaker identification
     *                  (default: `{}`)
     * @returns The identified speaker data
     * @internal
     */
    protected static _getSpeakerFromUser(options?: {
      /**
       * The Scene is which the speaker resides
       */
      scene?: Scene;

      /**
       * The User who is speaking
       */
      user?: User;

      /**
       * The name of the speaker to display
       */
      alias?: string;
    }): ChatMessage.SpeakerData;

    /**
     * Obtain an Actor instance which represents the speaker of this message (if any)
     * @param speaker    - The speaker data object
     */
    static getSpeakerActor(speaker: ChatMessage.SpeakerData): Actor | null;

    /**
     * Obtain a data object used to evaluate any dice rolls associated with this particular chat message
     */
    getRollData(): object;

    /**
     * Given a string whisper target, return an Array of the user IDs which should be targeted for the whisper
     *
     * @param name    - The target name of the whisper target
     * @returns An array of User instances
     */
    static getWhisperRecipients(name: string): User[];

    /**
     * Render the HTML for the ChatMessage which should be added to the log
     */
    getHTML(): Promise<JQuery>;

    /**
     * Render the inner HTML content for ROLL type messages.
     * @param messageData     - The chat message data used to render the message HTML
     * @internal
     */
    protected _renderRollContent(messageData: ChatMessage.MessageData): Promise<void>;

    /** @internal */
    protected override _preCreate(
      data: BaseChatMessage.ConstructorData,
      options: DocumentModificationOptions,
      user: BaseUser,
    ): Promise<void>;

    /** @internal */
    protected override _onCreate(
      data: BaseChatMessage.Source,
      options: DocumentModificationOptions,
      userId: string,
    ): Promise<void>;

    /** @internal */
    protected override _onUpdate(
      data: BaseChatMessage.UpdateData,
      options: DocumentModificationOptions,
      userId: string,
    ): void;

    /** @internal */
    protected override _onDelete(options: DocumentModificationOptions, userId: string): void;

    /**
     * Export the content of the chat message into a standardized log format
     */
    export(): string;

    /**
     * Return the first Roll instance contained in this chat message, if one is present
     * @deprecated since v10
     */
    get roll(): Roll | null;
  }

  namespace ChatMessage {
    interface GetSpeakerOptions {
      /** The Scene in which the speaker resides */
      scene?: Scene | undefined;

      /** The Actor whom is speaking */
      actor?: Actor | undefined;

      /** The Token whom is speaking */
      token?: TokenDocument | undefined;

      /** The name of the speaker to display */
      alias?: string | undefined;
    }

    interface SpeakerData {
      /** The Scene in which the speaker resides */
      scene: Scene | null;

      /** The Actor whom is speaking */
      actor: Actor | null;

      /** The Token whom is speaking */
      token: TokenDocument | null;

      /** The name of the speaker to display */
      alias: string | null;
    }

    interface MessageData {
      message: ToObjectFalseType<ChatMessage>;
      user: StoredDocument<InstanceType<ConfiguredDocumentClass<typeof User>>>;
      author: InstanceType<ConfiguredDocumentClass<typeof User>> | undefined;
      alias: string;
      cssClass: string;
      isWhisper: boolean;
      canDelete: boolean;
      whisperTo: string;
    }
  }
}