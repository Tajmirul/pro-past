import { Editor } from 'tinymce';
import { Editor as ReactEditor } from '@tinymce/tinymce-react';
import { useRef } from 'react';

const TextEditor = () => {
    const editorRef = useRef<Editor>();

    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    return (
        <div
            style={{
                maxWidth: '800px',
                margin: '0 auto',
            }}
        >
            <ReactEditor
                tinymceScriptSrc="/tinymce/tinymce.min.js"
                licenseKey="gpl"
                onInit={(_evt, editor) => (editorRef.current = editor)}
                initialValue="<p>This is the initial content of the editor.</p>"
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist',
                        'autolink',
                        'lists',
                        'link',
                        'image',
                        'charmap',
                        'anchor',
                        'searchreplace',
                        'visualblocks',
                        'code',
                        'fullscreen',
                        'insertdatetime',
                        'media',
                        'table',
                        'preview',
                        'help',
                        'wordcount',
                        'pro-paste',
                    ],
                    toolbar:
                        'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat code',
                    content_style:
                        'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                }}
            />
            <button
                onClick={log}
                style={{
                    marginTop: '20px',
                    background: '#0078d4',
                    color: '#fff',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Log editor content
            </button>
        </div>
    );
};

export default TextEditor;
