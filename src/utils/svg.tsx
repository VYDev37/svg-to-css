import ImageTracer from 'imagetracerjs';

export function createSVGDataURL(svgContent: string): string {
    const cleanedSvg = svgContent
        .replace(/(\r\n|\n|\r)/gm, "")
        .replace(/\t/g, " ")
        .replace(/>\s+</g, "><")
        .trim();

    const encodedSvg = encodeURIComponent(cleanedSvg)
        .replace(/'/g, "%27")
        .replace(/"/g, "%22");

    return 'data:image/svg+xml;charset=UTF-8,' + encodedSvg;
}

export function convertToInline(svgContent: string, isJsx: boolean = false, defaultClass = "w-6 h-6", defaultStyle = "width:1.5rem; height:1.5rem;"): string {
    let cleaned = svgContent
        .replace(/<\?xml.*\?>/gi, "")
        .replace(/(\r\n|\n|\r)/gm, "")
        .replace(/\t/g, " ")
        .replace(/>\s+</g, "><")
        .trim();

    const wMatch = cleaned.match(/width="([\d.]+)"/);
    const hMatch = cleaned.match(/height="([\d.]+)"/);
    const hasViewBox = cleaned.includes("viewBox");

    if (!hasViewBox && wMatch && hMatch) {
        cleaned = cleaned.replace(/<svg/, `<svg viewBox="0 0 ${wMatch[1]} ${hMatch[1]}"`);
    }

    cleaned = cleaned
        .replace(/\s+(width|height)="[^"]*"/g, "")
        .replace(/fill="((?!none|url\(#)[^"]+)"/g, 'fill="currentColor"');

    if (isJsx) {
        return cleaned
            .replace(/<svg/, `<svg ${defaultClass ? `className="${defaultClass}"` : `style="${defaultStyle}"`}`)
            .replace(/fill-rule/g, 'fillRule')
            .replace(/clip-rule/g, 'clipRule')
            .replace(/stroke-width/g, 'strokeWidth')
            .replace(/stroke-linecap/g, 'strokeLinecap')
            .replace(/stroke-linejoin/g, 'strokeLinejoin')
            .replace(/xlink:href/g, 'xlinkHref')
            .replace(/xml:space/g, 'xmlSpace')
            .replace(/xmlns:xlink/g, 'xmlnsXlink');
    }

    return cleaned.replace(/<svg/, `<svg ${defaultClass ? `class="${defaultClass}"` : `style="${defaultStyle}"`}`);
}

export const convertImageToSvg = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const dataUrl = e.target?.result as string;
            try {
                ImageTracer.imageToSVG(
                    dataUrl,
                    (svgString: string) => {
                        if (!svgString) {
                            reject(new Error("SVG generation returned empty string"));
                            return;
                        }
                        resolve(svgString);
                    },
                    { ltres: 0.1, qtres: 1, scale: 10, strokewidth: 5 }
                );
            } catch (err) {
                console.error(err);
                reject(err);
            }
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};