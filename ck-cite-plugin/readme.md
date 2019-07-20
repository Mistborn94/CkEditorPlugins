# Cite Plugin

This plugin adds support for the `<cite>` tag to CkEditor 5.

## Usage

See https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/installing-plugins.html

* Download the plugin source
* Import the plugin into your CK Editor build
    * Add the `CitePlugin` plugin to the plugins array
    * Add the `CitePlugin.componentName` to the toolbar

```$javascript
ClassicEditor
    .create( document.querySelector( '#editor' ), {
        plugins: [ ..., CitePlugin, ...],
        toolbar: [ ..., CitePlugin.componentName, ... ]
    } )
```


