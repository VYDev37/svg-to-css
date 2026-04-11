import { useState, useCallback } from 'react';
import { createSVGDataURL } from '../utils/svg';

export interface SvgItem {
    id: string;
    fileName: string;
    className: string;
    dataUrl: string;
    originalSvg: string;
}

export function useSvgConverter() {
    const [items, setItems] = useState<SvgItem[]>([]);

    const addFiles = useCallback((files: File[]) => {
        Array.from(files).forEach(file => {
            if (file.type === "image/svg+xml" || file.name.endsWith('.svg')) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    if (typeof event.target?.result === 'string') {
                        const content = event.target.result;
                        const defaultClass = `icon-${file.name.replace(/\.svg$/i, '').replace(/\s+/g, '-').toLowerCase()}`;

                        try {
                            const dataUrl = createSVGDataURL(content);
                            setItems(prev => [...prev, {
                                id: crypto.randomUUID(),
                                fileName: file.name,
                                className: defaultClass,
                                dataUrl,
                                originalSvg: content
                            }]);
                        } catch (err) {
                            console.error("Failed to parse SVG: ", err);
                        }
                    }
                };
                reader.readAsText(file);
            }
        });
    }, []);

    const updateClassName = (id: string, newClass: string) => {
        setItems(prev => prev.map(item => item.id === id ? { ...item, className: newClass } : item));
    };

    const removeItem = (id: string) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    return { items, addFiles, updateClassName, removeItem };
}