import { Dropzone, Header, CodeOutput, UsageExample } from './components';
import { useSvgConverter } from './hooks';
import { Trash2 } from 'lucide-react';

export default function App() {
  const { items, addFiles, updateClassName, removeItem } = useSvgConverter();

  return (
    <div className="min-h-screen p-6 md:p-12 lg:p-24 flex flex-col items-center bg-zinc-950 text-zinc-100">
      <div className="max-w-5xl w-full space-y-8">
        <Header />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Files DropZone & List Items */}
          <div className="lg:col-span-6 space-y-6">
            <Dropzone onFilesLoad={addFiles} />
            {/* Uploaded icons */}
            {items.length > 0 && (
              <div className="space-y-3 mt-6">
                <h3 className="text-sm font-semibold text-zinc-300">Processed Icons ({items.length})</h3>
                <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2">
                  {items.map(item => (
                    <div key={item.id} className="flex items-center gap-3 bg-zinc-900/50 p-3 rounded-lg border border-zinc-800">
                      {/* Mini Preview */}
                      <div className="w-8 h-8 bg-zinc-800 rounded flex-shrink-0 bg-no-repeat bg-center bg-contain"
                        style={{ backgroundImage: `url('${item.dataUrl}')` }} />
                      {/* Input ClassName */}
                      <input type="text" value={item.className} onChange={(e) => updateClassName(item.id, e.target.value)}
                        className="flex-1 bg-zinc-950 border border-zinc-700 rounded px-2 py-1 text-sm font-mono focus:border-indigo-500 focus:outline-none" />
                      <button onClick={() => removeItem(item.id)} className="text-zinc-500 hover:text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* CSS Output */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-zinc-300">Combined CSS Output</label>
              <CodeOutput items={items} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-zinc-300">How to use (CSS Class Output)</label>
              <UsageExample items={items} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}