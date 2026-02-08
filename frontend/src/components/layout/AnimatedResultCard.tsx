import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import ResultChart from '@/components/ui/ResultChart';

interface AnimatedResultCardProps {
    title: string;
    result: number[] | number[][];  // Can be 1D array or 2D array
    metadata: {
        timeComplexity: string;
        spaceComplexity: string;
        note?: string;
        method?: string;
    };
    isVisible: boolean;
}

export default function AnimatedResultCard({
    title,
    result,
    metadata,
    isVisible,
}: AnimatedResultCardProps) {
    if (!isVisible) return null;

    const isMatrix = Array.isArray(result[0]);
    const isDeterminant = typeof result === 'number';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-4"
        >
            <Card className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border-white/[0.1] shadow-2xl">
                {/* Subtle gradient background */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(236, 72, 153, 0.3) 100%)',
                        backgroundSize: '200% 200%',
                        animation: 'gradient-slow 15s ease infinite'
                    }}
                />

                <div className="relative z-10">
                    <CardHeader className="bg-gradient-to-r from-violet-500/[0.08] to-rose-500/[0.08]">
                        <CardTitle className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-violet-300 to-rose-300">
                            {title}
                        </CardTitle>
                        <div className="text-xs text-white/70 space-y-0.5">
                            <p><strong className="text-white/90">Time Complexity:</strong> {metadata.timeComplexity}</p>
                            <p><strong className="text-white/90">Space Complexity:</strong> {metadata.spaceComplexity}</p>
                            {metadata.note && <p><strong className="text-white/90">Note:</strong> {metadata.note}</p>}
                            {metadata.method && <p><strong className="text-white/90">Method:</strong> {metadata.method}</p>}
                        </div>
                    </CardHeader>

                    <CardContent className="pt-4">
                        {isMatrix ? (
                            // Display 2D matrix (for swapped diagonals)
                            <div>
                                <p className="text-sm font-medium mb-2 text-white/80">Resulting Matrix:</p>
                                <div className="overflow-auto max-h-60 bg-black/20 p-3 rounded border border-white/[0.1]">
                                    <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${(result as number[][])[0].length}, minmax(0, 1fr))` }}>
                                        {(result as number[][]).map((row, i) =>
                                            row.map((cell, j) => (
                                                <div
                                                    key={`${i}-${j}`}
                                                    className="text-xs text-center p-1 bg-white/[0.05] rounded border border-white/[0.1] text-white"
                                                    style={{ minWidth: '40px' }}
                                                >
                                                    {typeof cell === 'number' ? cell.toFixed(2) : cell}
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : isDeterminant ? (
                            // Single value (determinant)
                            <div className="bg-gradient-to-r from-violet-500/[0.15] to-rose-500/[0.15] p-6 rounded-lg text-center border border-white/[0.1]">
                                <p className="text-sm text-white/60 mb-1">Determinant Value:</p>
                                <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-300 to-rose-300">
                                    {(result as number).toFixed(6)}
                                </p>
                            </div>
                        ) : (
                            // Array of values (sums/averages)
                            <div>
                                {/* Interactive Chart */}
                                <div className="mb-6">
                                    <p className="text-sm font-medium mb-3 text-white/80">Visual Representation:</p>
                                    <ResultChart
                                        data={result as number[]}
                                        title={title}
                                        type={title.toLowerCase().includes('sum') ? 'sum' : 'average'}
                                    />
                                </div>

                                {/* Data Table */}
                                <p className="text-sm font-medium mb-2 text-white/80">Exact Values:</p>
                                <div className="overflow-auto max-h-60 bg-black/20 p-3 rounded border border-white/[0.1]">
                                    <div className="flex flex-wrap gap-2">
                                        {(result as number[]).map((value, index) => (
                                            <div
                                                key={index}
                                                className="bg-white/[0.05] px-3 py-2 rounded border border-white/[0.1]"
                                            >
                                                <p className="text-xs text-white/60">Index {index}</p>
                                                <p className="text-sm font-medium text-white">
                                                    {typeof value === 'number' ? value.toFixed(2) : value}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </div>
            </Card>
        </motion.div>
    );
}

