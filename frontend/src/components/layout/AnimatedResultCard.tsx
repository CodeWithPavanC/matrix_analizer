import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

    return (
        <div className="animate-fade-in mt-4">
            <Card className="relative overflow-hidden border-2 border-calm-primary/20 shadow-md">
                {/* Subtle gradient background */}
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        background: 'linear-gradient(135deg, #5b7c99 0%, #6c757d 100%)',
                        backgroundSize: '200% 200%',
                        animation: 'gradient-slow 15s ease infinite'
                    }}
                />

                <div className="relative z-10">
                    <CardHeader className="bg-calm-primary/5">
                        <CardTitle className="text-xl text-calm-primary">{title}</CardTitle>
                        <div className="text-xs text-calm-accent space-y-0.5">
                            <p><strong>Time Complexity:</strong> {metadata.timeComplexity}</p>
                            <p><strong>Space Complexity:</strong> {metadata.spaceComplexity}</p>
                            {metadata.note && <p><strong>Note:</strong> {metadata.note}</p>}
                            {metadata.method && <p><strong>Method:</strong> {metadata.method}</p>}
                        </div>
                    </CardHeader>

                    <CardContent className="pt-4">
                        {isMatrix ? (
                            // Display 2D matrix (for swapped diagonals)
                            <div>
                                <p className="text-sm font-medium mb-2">Resulting Matrix:</p>
                                <div className="overflow-auto max-h-60 bg-calm-bg p-3 rounded border border-calm-border">
                                    <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${(result as number[][])[0].length}, minmax(0, 1fr))` }}>
                                        {(result as number[][]).map((row, i) =>
                                            row.map((cell, j) => (
                                                <div
                                                    key={`${i}-${j}`}
                                                    className="text-xs text-center p-1 bg-white rounded border border-calm-border"
                                                    style={{ minWidth: '40px' }}
                                                >
                                                    {typeof cell === 'number' ? cell.toFixed(2) : cell}
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // Display 1D array (for sums/averages) or single value (determinant)
                            <div>
                                {typeof result === 'number' ? (
                                    // Single value (determinant)
                                    <div className="bg-calm-primary/10 p-6 rounded-lg text-center">
                                        <p className="text-sm text-calm-accent mb-1">Determinant Value:</p>
                                        <p className="text-3xl font-bold text-calm-primary">
                                            {result.toFixed(6)}
                                        </p>
                                    </div>
                                ) : (
                                    // Array of values (sums/averages)
                                    <div>
                                        <p className="text-sm font-medium mb-2">Result Array:</p>
                                        <div className="overflow-auto max-h-60 bg-calm-bg p-3 rounded border border-calm-border">
                                            <div className="flex flex-wrap gap-2">
                                                {(result as number[]).map((value, index) => (
                                                    <div
                                                        key={index}
                                                        className="bg-white px-3 py-2 rounded border border-calm-border"
                                                    >
                                                        <p className="text-xs text-calm-accent">Index {index}</p>
                                                        <p className="text-sm font-medium">
                                                            {typeof value === 'number' ? value.toFixed(2) : value}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </CardContent>
                </div>
            </Card>
        </div>
    );
}
