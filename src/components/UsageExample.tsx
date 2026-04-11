import { useState, useMemo } from 'react';
import { CheckCircle2, Terminal, Copy } from 'lucide-react';
import { useClipboard, type SvgItem } from '../hooks';

interface UsageExampleProps {
    items: SvgItem[];
}

type UsageMode = 'html' | 'tailwind' | 'bootstrap';

export default function UsageExample({ items }: UsageExampleProps) {
    const { copied, copyToClipboard } = useClipboard();
    const [mode, setMode] = useState<UsageMode>('tailwind');
    const hasItems = items.length > 0;

    const copyText = useMemo(() => {
        if (!hasItems)
            return '';

        return items.map(item => {
            const cls = item.className.startsWith('.') ? item.className.substring(1) : item.className;
            switch (mode) {
                case 'tailwind':
                    return `<i class="${cls} w-6 h-6 inline-block bg-contain bg-no-repeat bg-center"></i>`;
                case 'bootstrap':
                    return `<i class="${cls} d-inline-block" style="width: 1.5rem; height: 1.5rem; background-size: contain; background-repeat: no-repeat;"></i>`;
                default:
                    return `<i class="${cls}" style="display: inline-block; width: 24px; height: 24px; background-size: contain; background-repeat: no-repeat; background-position: center;"></i>`;
            }
        }).join('\n');
    }, [items, mode, hasItems]);

    return (
        <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-10 group-hover:opacity-20 transition duration-500" />
            <div className="relative bg-[#0d0d0f] border border-zinc-800 rounded-xl overflow-hidden flex flex-col">

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-2.5 border-b border-zinc-800/80 bg-zinc-900/80 backdrop-blur-sm gap-3">
                    <div className="flex items-center gap-2 text-zinc-400">
                        <Terminal className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-semibold tracking-wider uppercase text-zinc-300">Usage Snippet</span>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between">
                        <div className="flex items-center p-1 bg-zinc-950 border border-zinc-800 rounded-lg">
                            {(['html', 'tailwind', 'bootstrap'] as UsageMode[]).map((m) => (
                                <button key={m} onClick={() => setMode(m)}
                                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all capitalize ${mode === m
                                        ? 'bg-emerald-500/20 text-emerald-400 shadow-sm'
                                        : 'text-zinc-500 hover:text-zinc-300'
                                        }`}>
                                    {m}
                                </button>
                            ))}
                        </div>

                        <button onClick={() => copyToClipboard(copyText)} disabled={!hasItems}
                            className="text-zinc-400 cursor-pointer hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 bg-zinc-800/50 hover:bg-zinc-700 px-3 py-1.5 rounded-md">
                            {copied ? (
                                <><CheckCircle2 className="w-4 h-4 text-emerald-400" /><span className="text-xs text-emerald-400 font-medium">Copied!</span></>
                            ) : (
                                <><Copy className="w-4 h-4" /><span className="text-xs font-medium">Copy</span></>
                            )}
                        </button>
                    </div>
                </div>

                <div className="p-4 overflow-x-auto min-h-[80px] max-h-[200px] overflow-y-auto space-y-2">
                    {hasItems ? items.map(item => {
                        const cls = item.className.startsWith('.') ? item.className.substring(1) : item.className;

                        return (
                            <pre key={item.id} className="text-sm font-mono leading-relaxed text-zinc-300">
                                {mode === 'tailwind' && (
                                    <>
                                        <span className="text-zinc-500">&lt;</span><span className="text-pink-400">i</span> <span className="text-cyan-300">class</span>=<span className="text-emerald-300">"{cls} w-6 h-6 inline-block bg-contain bg-no-repeat bg-center"</span><span className="text-zinc-500">&gt;&lt;/</span><span className="text-pink-400">div</span><span className="text-zinc-500">&gt;</span>
                                    </>
                                )}

                                {mode === 'bootstrap' && (
                                    <>
                                        <span className="text-zinc-500">&lt;</span><span className="text-pink-400">i</span> <span className="text-cyan-300">class</span>=<span className="text-emerald-300">"{cls} d-inline-block"</span> <span className="text-cyan-300">style</span>=<span className="text-emerald-300">"width: 1.5rem; height: 1.5rem; background-size: contain; background-repeat: no-repeat;"</span><span className="text-zinc-500">&gt;&lt;/</span><span className="text-pink-400">span</span><span className="text-zinc-500">&gt;</span>
                                    </>
                                )}

                                {mode === 'html' && (
                                    <>
                                        <span className="text-zinc-500">&lt;</span><span className="text-pink-400">i</span> <span className="text-cyan-300">class</span>=<span className="text-emerald-300">"{cls}"</span> <span className="text-cyan-300">style</span>=<span className="text-emerald-300">"display: inline-block; width: 24px; height: 24px; background-size: contain; background-repeat: no-repeat; background-position: center;"</span><span className="text-zinc-500">&gt;&lt;/</span><span className="text-pink-400">i</span><span className="text-zinc-500">&gt;</span>
                                    </>
                                )}
                            </pre>
                        );
                    }) : (
                        <div className="h-full flex items-center justify-center text-zinc-600 text-sm font-mono pt-4">
                            Implementation snippet will appear here
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}