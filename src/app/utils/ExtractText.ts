export default function ExtractText(selectedList: string[], json: never) {
    const results: never[] = [];

    for (let i = 0; i < selectedList.length; i++) {
        const chatHistory = json?.['Direct Messages']?.['Chat History']?.['ChatHistory']?.[selectedList[i]];
        if (chatHistory) {
            results.push(chatHistory);
        }
    }

    // Return all the extracted chat histories as an array
    return results.length ? results : null;
}
