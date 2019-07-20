import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import pencilIcon from '@ckeditor/ckeditor5-core/theme/icons/pencil.svg';
import Editor from '@ckeditor/ckeditor5-core/src/editor/editor'
import EditorUI from '@ckeditor/ckeditor5-core/src/editor/editorui'
import Schema from '@ckeditor/ckeditor5-engine/src/model/schema'

export default class CiteEditing extends Plugin {

    init() {
        /**
         * @type {Editor, {ui: EditorUI}}
         */
        const editor = this.editor;

        let ui = editor.ui;

        ui.componentFactory.add('insertCitation', locale => {
            const view = new ButtonView(locale);

            view.set({
                label: 'Insert citation',
                icon: pencilIcon,
                tooltip: true
            });


            view.on('execute', () => {

                editor.model.change(writer => {
                    console.log("Created Element");
                    const element = writer.createElement('citation', {});

                    editor.model.insertContent(element, editor.model.document.selection);
                });
            });

            return view;
        });


        this._defineSchema();
        this._defineConverters();
    }

    /**
     * Register the element
     *
     * See https://ckeditor.com/docs/ckeditor5/latest/framework/guides/deep-dive/schema.html
     */
    _defineSchema() {
        /**
         * @type Schema
         */
        const schema = this.editor.model.schema;

        schema.register('citation', {
            allowWhere: '$text'
        });

        schema.extend( '$text', {
            allowIn: 'citation'
        } );
    }

    _defineConverters() {
        const conversion = this.editor.conversion;

        conversion.elementToElement({
            model: 'citation',
            view: {
                name: 'cite'
            }
        });
    }
}