// remove all property from html tag but keep content
export const cleanTag = (content: string) => {
    const allowedProperties = ['style', 'href', 'src', 'alt'];

    const domParser = new DOMParser().parseFromString(content, 'text/html');

    domParser.body.querySelectorAll('*').forEach((element) => {
        const attributes = Array.from(element.attributes);

        attributes.forEach((attribute) => {
            if (!allowedProperties.includes(attribute.name)) {
                element.removeAttribute(attribute.name);
            }
        });
    });

    return domParser.body.innerHTML;
};

export const cleanCss = (content: string) => {
    const allowedProperties = [
        'color',
        'background-color',
        'font-size',
        'font-weight',
        'height',
        'width',
    ];

    const domParser = new DOMParser().parseFromString(content, 'text/html');

    domParser.body.querySelectorAll('*').forEach((element: HTMLElement) => {
        const style = element.getAttribute('style');

        if (style) {
            const properties = style
                .split(';')
                .map((property) => property.trim());

            properties.forEach((property) => {
                const [key] = property.split(':').map((item) => item.trim());

                if (!allowedProperties.includes(key)) {
                    element.style.removeProperty(key);
                }
            });
        }
    });

    return domParser.body.innerHTML;
};

export const removeTagButKeepContent = (htmlString, tagName) => {
    // Parse the HTML string
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

    // Find all elements with the specified tag name (in this case 'b')
    const elements = doc.getElementsByTagName(tagName);

    // Convert HTMLCollection to an array to safely remove elements
    const elementsArray = Array.from(elements);

    // Loop through each element
    elementsArray.forEach((element) => {
        // Replace the element with its inner HTML (children + content)
        while (element.firstChild) {
            element.parentNode.insertBefore(element.firstChild, element);
        }
        // Remove the original tag (b in this case)
        element.remove();
    });

    // Return the cleaned HTML string
    return doc.body.innerHTML;
};

export const detectSource = (content: string): string => {
    if (
        content.includes('NormalTextRun') ||
        content.includes('OutlineElement') ||
        content.includes('TextRun') ||
        content.includes('paraid') ||
        content.includes('paraeid')
    ) {
        return 'ms-word';
    } else if (content.includes('excel')) {
        return 'excel';
    } else if (content.includes('docs-internal-guid')) {
        return 'google-docs';
    } else if (content.includes('google-sheets-html-origin')) {
        return 'google-sheets';
    }
    return 'unknown';
};
