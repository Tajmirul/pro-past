import { Editor, TinyMCE } from 'tinymce';
import { detectSource } from './utils';
import { FormatterFactory } from './Formatter';

declare const tinymce: TinyMCE;

class PasteHandler {
    constructor(private editor: Editor) {}

    handlePaste(content, preventDefault, stopPropagation): void {
        const source = detectSource(content);

        if (source === 'unknown') {
            return;
        }

        const pasteWithFormatting = confirm(
            `Detected source: ${source}. Paste with formatting?`,
        );
        if (pasteWithFormatting) {
            preventDefault();
            stopPropagation();

            const formatter = FormatterFactory.getFormatter(source);
            if (formatter) {
                const formattedContent = formatter.format(content);
                this.editor.insertContent(formattedContent);
            }
        }
    }
}

const setup = (editor: Editor): void => {
    const pasteHandler = new PasteHandler(editor);

    editor.on('PastePreProcess', (e) => {
        pasteHandler.handlePaste(
            e.content,
            e.preventDefault,
            e.stopPropagation,
        );
    });
};

export default (): void => {
    tinymce.PluginManager.add('pro-paste', setup);
};
