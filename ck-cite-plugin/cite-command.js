import { CiteConstants } from './cite-constants';
import Command from '@ckeditor/ckeditor5-core/src/command';

/**
 * Command to create or remove a citation
 */
export default class CiteCommand extends Command {


    constructor(editor) {
        super(editor);

        /**
         * Whether the selection is already a citation
         * @name CiteCommand#value
         * @type {boolean}
         */
        this.value = undefined;

        /**
         * The command is enabled if:
         * - A citation element is allowed at the selection
         * - The selection is inside a citation
         *
         * @name CiteCommand#isEnabled
         * @type {boolean}
         */
        this.isEnabled = undefined
    }

    /**
     * Insert or remove a citation
     * - If value is true (the selection is inside a citation): Remove the surrounding citation
     * - If value is false (the selection is not inside a citation): Wrap the selection in a citation
     */
    execute() {
        let model = this.editor.model;

        model.change(writer => {
            const selection = model.document.selection;

            if (!this.value) {
                writer.wrap(selection.getFirstRange(), CiteConstants.model);
            } else {
                writer.unwrap(selection.getFirstPosition().parent);
            }
        });
    }

    /**
     * Refreshes the command. The command should update its {@link #isEnabled} and {@link #value} properties
     * in this method.
     *
     * This method is automatically called when
     * {@link module:engine/model/document~Document#event:change any changes are applied to the document}.
     *
     * The command is enabled when:
     * - The selection is inside a citation
     * - The schema rules allow a citation to be inserted
     */
    refresh() {
        let isCitation = this._isCitation();

        this.isEnabled = isCitation || this._isAllowed();
        this.value = isCitation;
    }

    /**
     * Checks if a citation element is allowed at the selected position.
     *
     * Uses {@link Schema.findAllowedParent} to find any allowed ancestor
     * @see Schema.findAllowedParent
     * @return {boolean}
     */
    _isAllowed() {
        const model = this.editor.model;
        const selection = model.document.selection;

        const allowedParent = model.schema.findAllowedParent(selection.getFirstPosition(), CiteConstants.model);
        return allowedParent !== null;
    }

    /**
     * Checks if the selected element is already in a citation
     * @return {boolean}
     */
    _isCitation() {
        const selection = this.editor.model.document.selection;

        return selection.getFirstPosition().parent.name === CiteConstants.model;
    }
}