import { useState, useCallback } from 'react';
<<<<<<< HEAD
import toast from 'react-hot-toast';

import { createSVGDataURL, convertImageToSvg } from '../utils/svg';
import { AppConfig } from '../../app.config';
import { getUniqueName } from '../utils/file';
=======
import { createSVGDataURL, convertImageToSvg } from '../utils/svg';
>>>>>>> 25392500a2f89240156875805a56068773145246

export interface SvgItem {
    id: string;
    fileName: string;
    className: string;
    dataUrl: string;
    originalSvg: string;
}

export function useSvgConverter() {
    const [items, setItems] = useState<SvgItem[]>([]);

<<<<<<< HEAD
    const handleSvgContent = (content: string, fileName: string, className: string) => {
=======
    const handleSvgContent = (content: string, fileName: string) => {
>>>>>>> 25392500a2f89240156875805a56068773145246
        if (!content) {
            console.error("Content is empty for: ", fileName);
            return;
        }
<<<<<<< HEAD
=======
        const cleanName = fileName.replace(/\.(svg|png|jpe?g)$/i, '');
        const defaultClass = `icon-${cleanName.replace(/\s+/g, '-').toLowerCase()}`;
>>>>>>> 25392500a2f89240156875805a56068773145246

        try {
            const dataUrl = createSVGDataURL(content);
            setItems(prev => [...prev, {
                id: crypto.randomUUID(),
<<<<<<< HEAD
                fileName,
                className,
=======
                fileName: `${cleanName}.svg`,
                className: defaultClass,
>>>>>>> 25392500a2f89240156875805a56068773145246
                dataUrl,
                originalSvg: content
            }]);
        } catch (err) {
            console.error("Failed to parse SVG: ", err);
        }
    };
    const addFiles = useCallback((files: File[]) => {
<<<<<<< HEAD
        const currentNames = items.map(item => item.fileName);
        Array.from(files).forEach(async (file) => {
            if (file.size > AppConfig.MAX_FILE_SIZE_MB * 1024 * 1024) {
                toast.error(`Failed to upload: ${file.name} exceeded ${AppConfig.MAX_FILE_SIZE_MB}MB!`, {
                    style: {
                        borderRadius: '10px', background: '#333', color: '#fff'
                    }
                });
                return;
            }

            if (file.size === 0) {
                toast.error(`File ${file.name} is empty!`, {
                    style: {
                        borderRadius: '10px', background: '#333', color: '#fff'
                    }
                });
                return;
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
                    handleSvgContent(content, uniqueFileName, uniqueClassName);
=======
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
>>>>>>> 25392500a2f89240156875805a56068773145246
                } catch (err) {
                    console.error(err);
                }
            }
            else if (isImage) {
                try {
                    const svgContent = await convertImageToSvg(file);
<<<<<<< HEAD
                    handleSvgContent(svgContent, uniqueFileName, uniqueClassName);
=======
                    handleSvgContent(svgContent, file.name);
>>>>>>> 25392500a2f89240156875805a56068773145246
                } catch (err) {
                    console.error("Tracing failed for image: ", err);
                }
            }
        });
    }, [items]);

    const updateClassName = (id: string, newClass: string) => {
        setItems(prev => prev.map(item => item.id === id ? { ...item, className: newClass } : item));
    };

    const removeItem = (id: string) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    return { items, addFiles, updateClassName, removeItem };
}