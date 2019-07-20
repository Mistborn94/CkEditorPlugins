import Plugin from '@ckeditor/ckeditor5-core/src/plugin'

import CiteEditing from './cite-editing';
import CiteUI from './cite-ui';
import { CiteConstants } from "./cite-constants";

/**
 * The cite plugin adds the 'Citation' button and support for the `<cite>` tag.
 *
 * This plugin is a glue plugin that combines the {@link CiteEditing} and {@link CiteUI} plugins.
 *
 * @see CiteEditing
 * @see CiteUI
 *
 * @extends module:core/plugin~Plugin
 */
export default class CitePlugin extends Plugin {
    static get requires() {
        return [ CiteEditing, CiteUI ];
    }

    static get componentName() {
        return CiteConstants.componentFactory
    }
}

