import { cleanCss, cleanTag, removeTagButKeepContent } from './utils';

interface ContentFormatter {
    format(content: string): string;
}

export class FormatterFactory {
    static getFormatter(source: string): ContentFormatter | null {
        switch (source) {
            case 'google-docs':
                return new GoogleDocsFormatter();
            case 'google-sheets':
                return new GoogleSheetsFormatter();
            case 'ms-word':
                return new MsWordFormatter();
            case 'excel':
                return new ExcelFormatter();
            default:
                return null;
        }
    }
}

export class GoogleDocsFormatter implements ContentFormatter {
    format(content: string): string {
        let result = cleanTag(content);
        result = cleanCss(result);
        result = removeTagButKeepContent(result, 'b');
        return result;
    }
}

export class GoogleSheetsFormatter implements ContentFormatter {
    format(content: string): string {
        const result = cleanTag(content);
        return cleanCss(result);
    }
}

export class MsWordFormatter implements ContentFormatter {
    format(content: string): string {
        const result = cleanTag(content);
        return cleanCss(result);
    }
}

export class ExcelFormatter implements ContentFormatter {
    format(content: string): string {
        const result = cleanTag(content);
        return cleanCss(result);
    }
}
