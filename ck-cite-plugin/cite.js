import Plugin from '@ckeditor/ckeditor5-core/src/plugin'

import CiteEditing from './cite-editing';
import CiteUI from './cite-ui';
import { CiteConstants } from "./cite-constants";

export default class CitePlugin extends Plugin {
    static get requires() {
        return [ CiteEditing, CiteUI ];
    }

    static get componentName() {
        return CiteConstants.componentFactory
    }
}

