import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import Schema from '@ckeditor/ckeditor5-engine/src/model/schema'
import CiteCommand from "./cite-command";

import './cite-editor.css';

export default class CiteEditing extends Plugin {

    init() {
        const editor = this.editor;

        this._defineSchema();
        this._defineConverters();

        editor.commands.add('citationCommand', new CiteCommand(editor));
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

        //Citation objects are allowed anywhere text is
        schema.register('citation', {
            allowWhere: '$text',
            isObject: true,
            isInline: true
        });

        //Text is allowed inside citations
        schema.extend('$text', {
            allowIn: 'citation'
        });

        //We need to prevent citations inside citations
        schema.addChildCheck( ( context, childDefinition  ) => {
            if ( context.endsWith( 'citation' ) && childDefinition .name === 'citation' ) {
                return false;
            }
        });

    }

    _defineConverters() {
        const conversion = this.editor.conversion;

        //Original simple conversion
        conversion.elementToElement( { model: 'citation', view: 'cite' } );

        // Alternative widget-based implementation:
        //Upcast: Html -> Model (Loading the content into the editor)
        // conversion.for('upcast').elementToElement({
        //     model: 'citation',
        //     view: {
        //         name: 'cite'
        //     }
        // });
        //
        // //Data Downcast: Model -> Html (Retrieving the data from the editor)
        // conversion.for('dataDowncast').elementToElement({
        //     model: 'citation',
        //     view: {
        //         name: 'cite'
        //     }
        // });
        //
        // //Editing Downcast : Model -> Html (Creating the Html during editing)
        // conversion.for( 'editingDowncast' ).elementToElement( {
        //     model: 'citation',
        //     view: ( modelElement, viewWriter ) => {
        //         // Note: You use a more specialized createEditableElement() method here.
        //         const element = viewWriter.createEditableElement( 'cite' );
        //
        //         return toWidgetEditable( element, viewWriter );
        //     }
        // } );
    }
}