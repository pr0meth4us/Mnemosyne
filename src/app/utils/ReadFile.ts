

export default function ReadFile(file: File): Promise<Data> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (file.type === 'application/json') {
                const json = JSON.parse(reader.result as string);
                const chatHistories: Record<string, ChatMessage[]> = json['Direct Messages']?.['Chat History']?.['ChatHistory'] || {};
                const usernames = Object.keys(chatHistories);
                const me = json['Profile']?.['Profile Information']?.['ProfileMap']?.['userName'];
                resolve({ chatHistories, usernames, me });
            } else if (file.type === 'text/plain') {
                const txtString = reader.result as string;
                const chatBlocks = txtString.split(/>>> Chat History with .*::/);
                chatBlocks.shift();
                const regex = /with\s(.*?)::/g;
                const usernames = Array.from(txtString.matchAll(regex), m => m[1]);
                const chatHistories: Record<string, ChatMessage[]> = {};
                if (usernames.length === chatBlocks.length) {
                    usernames.forEach((username, index) => {
                        chatHistories[username] = chatBlocks[index]
                            .split('\n')
                            .filter(line => line.trim() !== '')
                            .map(line => {
                                const match = line.match(/(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}) (\w+): (.+)/);
                                if (match) {
                                    return {
                                        Date: match[1],
                                        From: match[2],
                                        Content: match[3],
                                    };
                                }
                                return null;
                            })
                            .filter(item => item !== null) as ChatMessage[];
                    });
                }
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                resolve({ chatHistories, usernames });
            }
        };

        reader.onerror = () => {
            reject(new Error("File reading has failed"));
        };

        reader.readAsText(file);
    });
}
