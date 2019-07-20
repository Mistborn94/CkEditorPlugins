import Command from '@ckeditor/ckeditor5-core/src/command';

export default class CiteCommand extends Command {
    execute() {
        let model = this.editor.model;

        model.change(writer => {
            const selection = model.document.selection;


            for (const range of selection.getRanges()) {
                writer.wrap(selection.getFirstRange(), 'citation');
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
        const allowedIn = model.schema.findAllowedParent(selection.getFirstPosition(), 'citation');

        this.isEnabled = allowedIn !== null;
    }
}