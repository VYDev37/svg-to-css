import { useState } from 'react';
import { FileDown } from 'lucide-react';

interface DropZoneProps {
    onFilesLoad: (files: File[]) => void;
}

export default function DropZone({ onFilesLoad }: DropZoneProps) {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <div
            onDragOver={(e) => { e.preventDefault(); setIsHovering(true); }}
            onDragLeave={(e) => { e.preventDefault(); setIsHovering(false); }}
            onDrop={(e) => {
                e.preventDefault();
                setIsHovering(false);
                if (e.dataTransfer.files) {
                    onFilesLoad(Array.from(e.dataTransfer.files));
                }
            }}
            className={`relative border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 transition-all cursor-pointer ${isHovering ? "border-indigo-500 bg-indigo-500/10 scale-[1.02]" : "border-zinc-800 hover:border-zinc-700 bg-zinc-900/20 hover:bg-zinc-900/50"}`}>
            <div className={`p-4 rounded-full transition-colors ${isHovering ? "bg-indigo-500/20" : "bg-zinc-800"}`}>
                <FileDown className={`w-6 h-6 transition-colors ${isHovering ? "text-indigo-400" : "text-zinc-400"}`} />
            </div>
            <div className="text-center">
                <p className="text-zinc-300 font-medium">Drag & drop images or SVGs here</p>
                <p className="text-sm text-zinc-500 mt-1">Accepts multiple files</p>
            </div>

            <input type="file" multiple accept=".svg, .png, .jpg, .jpeg, image/svg+xml, image/png, image/jpeg" className="hidden" id="file-upload"
                onChange={(e) => {
                    if (e.target.files) {
                        onFilesLoad(Array.from(e.target.files));
                        e.target.value = "";
                    }
                }}
            />
            <label htmlFor="file-upload" className="absolute inset-0 cursor-pointer" />
        </div>
    );
}