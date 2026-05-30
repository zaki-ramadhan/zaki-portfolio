import { useState, useCallback } from 'react';
import { db } from '../../utils/firebase';
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export const useAdminMessages = (showNotify) => {
    const [messages, setMessages] = useState([]);
    const [fetching, setFetching] = useState(false);

    const fetchMessages = useCallback(async () => {
        setFetching(true);
        try {
            const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const messagesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setMessages(messagesData);
        } catch (error) {
            console.error("Error fetching messages:", error);
            showNotify("Failed to fetch messages database", "error");
        } finally {
            setFetching(false);
        }
    }, [showNotify]);

    return {
        messages,
        fetching,
        fetchMessages
    };
};
