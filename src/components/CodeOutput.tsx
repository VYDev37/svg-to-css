import { useState, useMemo } from 'react';
import { CheckCircle2, Code2, Copy } from 'lucide-react';
import { useClipboard, type SvgItem } from '../hooks';
import { convertToInline } from '../utils/svg';

interface CodeOutputProps {
    items: SvgItem[];
}

// Mode: CSS, JSX, HTML, Tailwind + JSX, Tailwind + HTML
type Mode = 'css' | 'jsx' | 'html' | 'tailwind + jsx' | 'tailwind + html';

export default function CodeOutput({ items }: CodeOutputProps) {
    const { copied, copyToClipboard } = useClipboard();
    const [mode, setMode] = useState<Mode>('css');
    const hasItems = items.length > 0;

    const getCopyText = useMemo(() => {
        if (!hasItems) return "";
        return items.map(item => {
            const isJsxMode = mode.includes('jsx');

            if (mode === 'css') {
                const cls = item.className.startsWith('.') ? item.className : `.${item.className}`;
                return `${cls} {\n  background-image: url("${item.dataUrl}");\n}`;
            }

            const isTailwind = mode.includes('tailwind');
            const defaultClass = isTailwind ? "w-6 h-6" : "";

            return convertToInline(item.originalSvg, isJsxMode, defaultClass);
        }).join(mode === 'css' ? '\n\n' : '\n');
    }, [items, mode, hasItems]);

    return (
        <div className="relative group w-full">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl blur opacity-10 group-hover:opacity-25 transition duration-500" />
            <div className="relative bg-[#0d0d0f] border border-zinc-800 rounded-xl overflow-hidden flex flex-col">
                {/* Header Section */}
                <div className="flex flex-col border-b border-zinc-800/80 bg-zinc-900/80 backdrop-blur-sm">
                    {/* Top Row: Label & Copy Button */}
                    <div className="flex items-center justify-between px-4 py-2.5">
                        <div className="flex items-center gap-2 text-zinc-400">
                            <Code2 className="w-4 h-4 text-indigo-400" />
                            <span className="text-[10px] font-bold tracking-widest uppercase">Output</span>
                        </div>
                        <button onClick={() => copyToClipboard(getCopyText)} disabled={!hasItems}
                            className="text-zinc-400 cursor-pointer hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 bg-zinc-800/50 hover:bg-zinc-700 px-2 py-1 rounded-md">
                            {copied ? (
                                <><CheckCircle2 className="w-4 h-4 text-emerald-400" /><span className="text-[10px] text-emerald-400 font-medium">Copied!</span></>
                            ) : (
                                <><Copy className="w-4 h-4" /><span className="text-[10px] font-medium">Copy</span></>
                            )}
                        </button>
                    </div>

                    {/* Bottom Row: Scrollable Tabs */}
                    <div className="px-2 pb-2">
                        <div className="flex bg-black/40 p-1 rounded-lg border border-zinc-800/50 overflow-x-auto no-scrollbar scroll-smooth shadow-inner">
                            {[
                                { id: 'css', label: 'CSS' },
                                { id: 'jsx', label: 'JSX' },
                                { id: 'html', label: 'HTML' },
                                { id: 'tailwind + jsx', label: 'TW + JSX' },
                                { id: 'tailwind + html', label: 'TW + HTML' }
                            ].map((tab) => (
                                <button key={tab.id} onClick={() => setMode(tab.id as Mode)}
                                    className={`px-3 py-1.5 text-[9px] sm:text-[10px] font-bold rounded-md transition-all whitespace-nowrap flex-shrink-0 ${mode === tab.id
                                        ? 'bg-indigo-500/20 text-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.1)]'
                                        : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/30'
                                        }`}>
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="p-4 overflow-x-auto min-h-[200px] max-h-[450px] overflow-y-auto space-y-4 custom-scrollbar">
                    {hasItems ? items.map(item => (
                        <div key={item.id} className="relative group/item">
                            {mode === 'css' ? (
                                <pre className="text-sm font-mono leading-relaxed text-zinc-300">
                                    <span className="text-indigo-400">
                                        {item.className.startsWith('.') ? item.className : `.${item.className}`}
                                    </span> {'{\n'}
                                    <span className="text-cyan-400">  background-image</span>: url(<span className="text-emerald-400/80 break-all whitespace-pre-wrap">"{item.dataUrl}"</span>);{'\n}'}
                                </pre>
                            ) : (
                                <pre className="text-sm font-mono leading-relaxed text-zinc-400 break-all whitespace-pre-wrap">
                                    {convertToInline(item.originalSvg, mode.includes('jsx'), mode.includes('tailwind') ? "w-6 h-6" : "")}
                                </pre>
                            )}
                        </div>
                    )) : (
                        <div className="h-full flex items-center justify-center text-zinc-600 text-sm font-mono pb-10">
                            Output will appear here
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}