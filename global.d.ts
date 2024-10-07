declare global {
    interface ChatMessage {
        Date: string;
        From: string;
        Content: string;
    }
    interface Data{
        chatHistories: Record<string, ChatMessage[]>;
        usernames: string[];
        me: string;
    }
    interface Params {
        selectedUsers: string[],
        chatHistories: Record<string, ChatMessage[]>;
        me: string;
    }
}

export {};
