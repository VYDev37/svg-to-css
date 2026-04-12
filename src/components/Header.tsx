import { Image as ImageIcon } from 'lucide-react';

export default function Header() {
    return (
        <div className="text-center space-y-3 mb-12">
            <div className="flex justify-center mb-4">
                <div className="p-4 bg-indigo-500/10 rounded-2xl ring-1 ring-indigo-500/20">
                    <ImageIcon className="w-12 h-12 text-indigo-400" />
                </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                SVG to CSS <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">DataURL</span>
            </h1>
            <p className="text-zinc-400 max-w-xl mx-auto text-lg my-5">
                Easily convert image / raw SVGs to optimal CSS background-image attributes. Drag and drop or paste your code.
            </p>
        </div>
    );
}