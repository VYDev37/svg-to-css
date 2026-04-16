import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';

import { createSVGDataURL, convertImageToSvg } from '../utils/svg';
import { AppConfig } from '../../app.config';
import { getUniqueName } from '../utils/file';

export interface SvgItem {
    id: string;
    fileName: string;
    className: string;
    dataUrl: string;
    originalSvg: string;
}

interface AddFilesCallbackResult {
    content: string;
    uniqueFileName: string;
    uniqueClassName: string;
}

export function useSvgConverter() {
    const [items, setItems] = useState<SvgItem[]>([]);

    const addFiles = useCallback(async (files: File[]) => {
        const currentNames = items.map(item => item.fileName);
        const promises = Array.from(files).map(async (file): Promise<AddFilesCallbackResult | null> => {
            if (file.size > AppConfig.MAX_FILE_SIZE_MB * 1024 * 1024) {
                toast.error(`Failed to upload: ${file.name} exceeded ${AppConfig.MAX_FILE_SIZE_MB}MB!`, {
                    style: {
                        borderRadius: '10px', background: '#333', color: '#fff'
                    }
                });
                return null;
            }

            if (file.size === 0) {
                toast.error(`File ${file.name} is empty!`, {
                    style: {
                        borderRadius: '10px', background: '#333', color: '#fff'
                    }
                });
                return null;
            }

            const isSvg = file.type === "image/svg+xml" || file.name.endsWith('.svg');
            const isImage = file.type.match(/image\/(png|jpe?g)/);

            const baseNameOriginal = file.name.replace(/\.[^/.]+$/, "");
            const intendedName = `${baseNameOriginal}.svg`;

            const uniqueFileName = getUniqueName(intendedName, currentNames);
            currentNames.push(uniqueFileName);

            const cleanNameForClass = uniqueFileName.replace(/\.svg$/i, '');
            const uniqueClassName = `icon-${cleanNameForClass.replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '')}`;
            if (isSvg) {
                try {
                    const content = await new Promise<string>((resolve, reject) => {
                        const reader = new FileReader();

                        reader.onload = (event) => resolve(event.target?.result as string);
                        reader.onerror = reject;
                        reader.readAsText(file);
                    });
                    return { content, uniqueFileName, uniqueClassName };
                } catch (err) {
                    console.error(err);
                }
            }
            else if (isImage) {
                try {
                    const content = await convertImageToSvg(file);
                    return { content, uniqueFileName, uniqueClassName };
                } catch (err) {
                    console.error("Tracing failed for image: ", err);
                }
            }

            return null;
        });

        const results = await Promise.all(promises);
        const newItems: SvgItem[] = results
            .filter((result): result is AddFilesCallbackResult => result !== null && result.content !== undefined)
            .map(({ content, uniqueFileName, uniqueClassName }) => {
                const dataUrl = createSVGDataURL(content);
                return {
                    id: crypto.randomUUID(),
                    fileName: uniqueFileName,
                    className: uniqueClassName,
                    dataUrl,
                    originalSvg: content
                };
            });

        if (newItems.length > 0) {
            setItems(prev => [...prev, ...newItems]);
        }
    }, [items]);

    const updateClassName = (id: string, newClass: string) => {
        setItems(prev => prev.map(item => item.id === id ? { ...item, className: newClass } : item));
    };

    const removeItem = (id: string) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    return { items, addFiles, updateClassName, removeItem };
}