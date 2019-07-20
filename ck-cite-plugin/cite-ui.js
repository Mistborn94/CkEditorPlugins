import { CiteConstants } from './cite-constants';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview"

import quoteIcon from '@ckeditor/ckeditor5-core/theme/icons/quote.svg';

export default class CiteUI extends Plugin {

    init() {
        console.log("Cite UI initialized");
        const editor = this.editor;
        const t = editor.t;

        // The "citation" button must be registered among the UI components of the editor
        // to be displayed in the toolbar.
        editor.ui.componentFactory.add(CiteConstants.componentFactory, locale => {

            const command = editor.commands.get(CiteConstants.command);

            // The button will be an instance of ButtonView.
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

            // Execute the command when the button is clicked (executed).
            this.listenTo(buttonView, 'execute', () => editor.execute(CiteConstants.command));

            return buttonView;
        });
    }
}