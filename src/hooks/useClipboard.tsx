import { useState } from 'react';

export default function useClipboard(timeout = 2000) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async (text: string) => {
        if (!text)
            return;
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), timeout);
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };

    return { copied, copyToClipboard };
}