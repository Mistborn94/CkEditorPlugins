import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Image from '@ckeditor/ckeditor5-image/src/image';
import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote";
import CitePlugin from '@mistborn94/ck-cite-plugin'
import CKEditorInspector from '@ckeditor/ckeditor5-inspector';

ClassicEditor
    .create( document.querySelector( '#editor' ), {
        plugins: [ Essentials, Paragraph, Bold, Italic, Image, CitePlugin, BlockQuote],
        toolbar: [ 'bold', 'italic', 'citation', 'blockQuote' ]
    } )
    .then( editor => {
        CKEditorInspector.attach( editor );
        console.log( 'Editor was initialized', editor );
    } )
    .catch( error => {
        console.error( error.stack );
    } );




