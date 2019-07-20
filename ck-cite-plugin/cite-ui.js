import { CiteConstants } from './cite-constants';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview"

import quoteIcon from '@ckeditor/ckeditor5-core/theme/icons/quote.svg';

/**
 * The cite ui plugin
 * @extends Plugin
 */
export default class CiteUI extends Plugin {

    /**
     * Register a button to execute an CitationCommand
     */
    init() {
        const editor = this.editor;
        const t = editor.t;

        // Register the "citation" button
        editor.ui.componentFactory.add(CiteConstants.componentFactory, locale => {

            const command = editor.commands.get(CiteConstants.command);

            const buttonView = new ButtonView(locale);

            buttonView.set({
                // The t() function helps localize the editor. All strings enclosed in t() can be
                // translated and change when the language of the editor changes.
                label: t('Citation'),
                icon: quoteIcon,
                withText: true,
                tooltip: true
            });

            // Bind the state of the button to the state of the command.
            buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

            // Execute the command when the button is clicked.
            this.listenTo(buttonView, 'execute', () => editor.execute(CiteConstants.command));

            return buttonView;
        });
    }
}