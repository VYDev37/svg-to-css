import { useState, useCallback } from 'react';
import { createSVGDataURL, convertImageToSvg } from '../utils/svg';

export interface SvgItem {
    id: string;
    fileName: string;
    className: string;
    dataUrl: string;
    originalSvg: string;
}

export function useSvgConverter() {
    const [items, setItems] = useState<SvgItem[]>([]);

    const handleSvgContent = (content: string, fileName: string) => {
        if (!content) {
            console.error("Content is empty for: ", fileName);
            return;
        }
        const cleanName = fileName.replace(/\.(svg|png|jpe?g)$/i, '');
        const defaultClass = `icon-${cleanName.replace(/\s+/g, '-').toLowerCase()}`;

        try {
            const dataUrl = createSVGDataURL(content);
            setItems(prev => [...prev, {
                id: crypto.randomUUID(),
                fileName: `${cleanName}.svg`,
                className: defaultClass,
                dataUrl,
                originalSvg: content
            }]);
        } catch (err) {
            console.error("Failed to parse SVG: ", err);
        }
    };
    const addFiles = useCallback((files: File[]) => {
        Array.from(files).forEach(async (file) => {
            const isSvg = file.type === "image/svg+xml" || file.name.endsWith('.svg');
            const isImage = file.type.match(/image\/(png|jpe?g)/);

            if (isSvg) {
                try {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        if (typeof event.target?.result === 'string') {
                            handleSvgContent(event.target.result, file.name);
                        }
                    };
                    reader.readAsText(file);
                } catch (err) {
                    console.error(err);
                }
            }
            else if (isImage) {
                try {
                    const svgContent = await convertImageToSvg(file);
                    handleSvgContent(svgContent, file.name);
                } catch (err) {
                    console.error("Tracing failed for image: ", err);
                }
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