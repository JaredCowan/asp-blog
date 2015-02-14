CKEDITOR.editorConfig = function (config) {
    config.language = 'en';
    config.skin = 'moono-dark';
    config.extraPlugins = 'pbckcode';

    config.toolbar = [
        { name: 'document', groups: ['mode', 'document', 'doctools'], items: ['Source', '-', 'Preview', 'Print', '-'] },
        { name: 'clipboard', groups: ['clipboard', 'undo'], items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo'] },
        { name: 'editing', groups: ['find', 'selection', 'spellchecker'], items: ['Find', 'Replace', '-', 'SelectAll', '-', 'Scayt'] },
        { name: 'forms', items: ['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField'] },
        '/',
        { name: 'basicstyles', groups: ['basicstyles', 'cleanup'], items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat'] },
        { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi'], items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-'] },
        { name: 'links', items: ['Link', 'Unlink', 'Anchor'] },
        { name: 'insert', items: ['Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe'] },
        '/',
        { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
        { name: 'colors', items: ['TextColor', 'BGColor'] },
        { name: 'tools', items: ['Maximize', 'ShowBlocks'] },
        { name: 'others', items: ['-', 'pbckcode'] }
    ];

    config.pbckcode = {

        highlighter: 'PRETTIFY',

        modes: [['HTML', 'html'], ['CSS', 'css'], ['C#', 'csharp'], ['SCSS/Sass', 'scss'], ['JavaScript', 'javascript'], ['JSON', 'json'], ['Markdown', 'markdown'], ['LESS', 'less'], ['C/C++', 'c_pp'], ['C9Search', 'c9search'], ['Clojure', 'clojure'], ['CoffeeScript', 'coffee'], ['ColdFusion', 'coldfusion'], ['Diff', 'diff'], ['Glsl', 'glsl'], ['Go', 'golang'], ['Groovy', 'groovy'], ['haXe', 'haxe'], ['Jade', 'jade'], ['Java', 'java'], ['JSP', 'jsp'], ['JSX', 'jsx'], ['LaTeX', 'latex'], ['Liquid', 'liquid'], ['Lua', 'lua'], ['LuaPage', 'luapage'], ['OCaml', 'ocaml'], ['Perl', 'perl'], ['pgSQL', 'pgsql'], ['PHP', 'php'], ['Powershell', 'powershel1'], ['Python', 'python'], ['R', 'ruby'], ['OpenSCAD', 'scad'], ['Scala', 'scala'], ['SH', 'sh'], ['SQL', 'sql']['SVG', 'svg'], ['Tcl', 'tcl'], ['Text', 'text'], ['Textile', 'textile'], ['XML', 'xml'], ['XQuery', 'xq'], ['YAML', 'yaml']
        ],

        // The theme of the ACE Editor of the plugin.
        theme: 'tomorrow_night',

        // Tab indentation (in spaces)
        tab_size: "2"
    };

    config.toolbarGroups = [
        { name: 'document', groups: ['mode', 'document', 'doctools'] },
        { name: 'clipboard', groups: ['clipboard', 'undo'] },
        { name: 'editing', groups: ['find', 'selection', 'spellchecker'] },
        { name: 'forms' },
        '/',
        { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
        { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi'] },
        { name: 'links' },
        { name: 'insert' },
        '/',
        { name: 'styles' },
        { name: 'colors' },
        { name: 'tools' },
        { name: 'others' },
	    { name: 'pbckcode' }
    ];
};
