import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function MatrixInputPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const matrixSize = location.state?.matrixSize;

    const [matrix, setMatrix] = useState<number[][]>([]);

    useEffect(() => {
        // Redirect if no matrix size provided
        if (!matrixSize) {
            navigate('/');
            return;
        }

        // Initialize matrix with zeros
        const initialMatrix = Array(matrixSize)
            .fill(0)
            .map(() => Array(matrixSize).fill(0));
        setMatrix(initialMatrix);
    }, [matrixSize, navigate]);

    const handleCellChange = (row: number, col: number, value: string) => {
        const numValue = value === '' ? 0 : parseFloat(value);

        if (!isNaN(numValue)) {
            const newMatrix = matrix.map((r, i) =>
                i === row ? r.map((c, j) => (j === col ? numValue : c)) : r
            );
            setMatrix(newMatrix);
        }
    };

    const handleRandomFill = () => {
        const newMatrix = Array(matrixSize)
            .fill(0)
            .map(() =>
                Array(matrixSize)
                    .fill(0)
                    .map(() => Math.floor(Math.random() * 20) - 10)  // Random values -10 to 9
            );
        setMatrix(newMatrix);
    };

    const handleSubmit = () => {
        navigate('/analysis', { state: { matrix, matrixSize } });
    };

    if (!matrixSize) return null;

    return (
        <div className="min-h-screen bg-calm-bg p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold">Matrix Input</h1>
                        <p className="text-calm-accent mt-1">
                            Enter values for your {matrixSize}×{matrixSize} matrix
                        </p>
                    </div>
                    <Button variant="outline" onClick={() => navigate('/')}>
                        ← Back
                    </Button>
                </div>

                <Card className="mb-6">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Matrix Values</CardTitle>
                            <Button variant="outline" size="sm" onClick={handleRandomFill}>
                                Fill with Random Values
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-auto max-h-96">
                            <div
                                className="grid gap-1"
                                style={{
                                    gridTemplateColumns: `repeat(${matrixSize}, minmax(0, 1fr))`,
                                }}
                            >
                                {matrix.map((row, i) =>
                                    row.map((cell, j) => (
                                        <input
                                            key={`${i}-${j}`}
                                            type="number"
                                            value={cell}
                                            onChange={(e) => handleCellChange(i, j, e.target.value)}
                                            className="matrix-input text-xs"
                                            style={{ width: matrixSize > 30 ? '48px' : '64px', height: matrixSize > 30 ? '48px' : '64px' }}
                                        />
                                    ))
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end">
                    <Button size="lg" onClick={handleSubmit}>
                        Proceed to Analysis →
                    </Button>
                </div>
            </div>
        </div>
    );
}
