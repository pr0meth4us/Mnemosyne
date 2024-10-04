export default function ReadFile(file: File): Promise<{ json: string; people: string }> {
    return new Promise((resolve) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (file.type === 'application/json') {
                try {
                    const json = JSON.parse(reader.result as string);
                    const chatList = json['Direct Messages']?.['Chat History']?.['ChatHistory'];

                    const result = chatList
                        ? { chatList: Object.keys(chatList) }
                        : { chatList: [] };

                    resolve({ json, people: JSON.stringify(result) });
                } catch (error) {
                    console.error(`Error parsing JSON: ${error}`);
                    // resolve({ json: null, people: '' });
                }
            } else if (file.type === 'text/plain') {
                console.log('Plain text file detected');
                // resolve({ json: null, people: '' }); // Resolve with empty values for unsupported types
            }
        };

        reader.readAsText(file);
    });
}
