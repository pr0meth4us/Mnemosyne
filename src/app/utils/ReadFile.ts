interface JsonResult {
    json: string;
    people: string;
    me: string;
}

interface TextResult {
    txtString: string;
    usernames: string[];
}

type ReadFileResult = JsonResult | TextResult;

export default function ReadFile(file: File): Promise<ReadFileResult> {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (file.type === 'application/json') {
                    const json = JSON.parse(reader.result as string);
                    const chatList = json['Direct Messages']?.['Chat History']?.['ChatHistory'];
                    const me = json['Profile']['Profile Information']['ProfileMap']['userName'];
                    const result = chatList
                        ? { chatList: Object.keys(chatList) }
                        : { chatList: [] };
                    resolve({ json, people: JSON.stringify(result), me });
            } else if (file.type === 'text/plain') {
                const txtString = reader.result as string;
                const regex = /with\s(.*?)::/g;
                const usernames = Array.from(txtString.matchAll(regex), (m) => m[1]);
                resolve({ txtString, usernames });
            }
        };
        reader.readAsText(file);
    });
}
