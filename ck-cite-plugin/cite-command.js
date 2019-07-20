import { CiteConstants } from './cite-constants';
import Command from '@ckeditor/ckeditor5-core/src/command';

export default class CiteCommand extends Command {
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
     */
    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent(selection.getFirstPosition(), CiteConstants.model);
        const isInCitation = selection.getFirstPosition().parent.name === CiteConstants.model;

        this.isEnabled = allowedIn !== null || isInCitation;
        this.value = isInCitation;
    }
}