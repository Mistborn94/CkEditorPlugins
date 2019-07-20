import { CiteConstants as CiteConstants} from './cite-constants';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import Schema from '@ckeditor/ckeditor5-engine/src/model/schema'
import CiteCommand from "./cite-command";

import './cite-editor.css';

export default class CiteEditing extends Plugin {

    init() {
        const editor = this.editor;

        this._defineSchema();
        this._defineConverters();

        editor.commands.add(CiteConstants.command, new CiteCommand(editor));
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
        let modelName = CiteConstants.model;

        //Citation objects are allowed anywhere text is
        schema.register(modelName, {
            allowWhere: '$text',
            isObject: true,
            isInline: true
        });

        //Text is allowed inside citations
        schema.extend('$text', {
            allowIn: modelName
        });

        //We need to prevent citations inside citations
        schema.addChildCheck( ( context, childDefinition  ) => {
            if ( context.endsWith( modelName) && childDefinition.name === modelName ) {
                return false;
            }
        });

    }

    _defineConverters() {
        const conversion = this.editor.conversion;

        //Original simple conversion
        conversion.elementToElement( { model: CiteConstants.model, view: CiteConstants.element } );

    }
}