import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AnimatedResultCard from '@/components/layout/AnimatedResultCard';
import type { MatrixOperationResult } from '@/types/matrix';

const API_BASE_URL = 'http://localhost:3001/api/matrix';

export default function AnalysisPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { matrix, matrixSize } = location.state || {};

    const [loading, setLoading] = useState<string | null>(null);

    // Individual result states for each operation
    const [rowSumResult, setRowSumResult] = useState<MatrixOperationResult | null>(null);
    const [colSumResult, setColSumResult] = useState<MatrixOperationResult | null>(null);
    const [rowAvgResult, setRowAvgResult] = useState<MatrixOperationResult | null>(null);
    const [colAvgResult, setColAvgResult] = useState<MatrixOperationResult | null>(null);
    const [swapResult, setSwapResult] = useState<MatrixOperationResult | null>(null);
    const [detResult, setDetResult] = useState<MatrixOperationResult | null>(null);

    if (!matrix || !matrixSize) {
        navigate('/');
        return null;
    }

    const callAPI = async (
        endpoint: string,
        setResult: (result: MatrixOperationResult | null) => void
    ) => {
        setLoading(endpoint);
        try {
            const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ matrix }),
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error(`Error calling ${endpoint}:`, error);
            alert(`Error calculating ${endpoint}. Please try again.`);
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="min-h-screen bg-calm-bg p-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold">Matrix Analysis</h1>
                        <p className="text-calm-accent mt-1">
                            {matrixSize}×{matrixSize} Matrix • All operations run server-side
                        </p>
                    </div>
                    <Button variant="outline" onClick={() => navigate('/input', { state: { matrixSize } })}>
                        ← Edit Matrix
                    </Button>
                </div>

                <div className="space-y-8">
                    {/* Row Sum Section */}
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Row Sum</CardTitle>
                                <p className="text-sm text-calm-accent">
                                    Calculate the sum of elements in each row
                                </p>
                            </CardHeader>
                            <CardContent>
                                <Button
                                    onClick={() => callAPI('row-sum', setRowSumResult)}
                                    disabled={loading !== null}
                                    className="w-full sm:w-auto"
                                >
                                    {loading === 'row-sum' ? 'Calculating...' : 'Calculate Row Sum'}
                                </Button>
                            </CardContent>
                        </Card>
                        {rowSumResult && (
                            <AnimatedResultCard
                                title="Row Sum Results"
                                result={rowSumResult.result}
                                metadata={rowSumResult.metadata}
                                isVisible={true}
                            />
                        )}
                    </div>

                    {/* Column Sum Section */}
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Column Sum</CardTitle>
                                <p className="text-sm text-calm-accent">
                                    Calculate the sum of elements in each column
                                </p>
                            </CardHeader>
                            <CardContent>
                                <Button
                                    onClick={() => callAPI('column-sum', setColSumResult)}
                                    disabled={loading !== null}
                                    className="w-full sm:w-auto"
                                >
                                    {loading === 'column-sum' ? 'Calculating...' : 'Calculate Column Sum'}
                                </Button>
                            </CardContent>
                        </Card>
                        {colSumResult && (
                            <AnimatedResultCard
                                title="Column Sum Results"
                                result={colSumResult.result}
                                metadata={colSumResult.metadata}
                                isVisible={true}
                            />
                        )}
                    </div>

                    {/* Row Average Section */}
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Row Average</CardTitle>
                                <p className="text-sm text-calm-accent">
                                    Calculate the average of elements in each row (reuses row sum)
                                </p>
                            </CardHeader>
                            <CardContent>
                                <Button
                                    onClick={() => callAPI('row-average', setRowAvgResult)}
                                    disabled={loading !== null}
                                    className="w-full sm:w-auto"
                                >
                                    {loading === 'row-average' ? 'Calculating...' : 'Calculate Row Average'}
                                </Button>
                            </CardContent>
                        </Card>
                        {rowAvgResult && (
                            <AnimatedResultCard
                                title="Row Average Results"
                                result={rowAvgResult.result}
                                metadata={rowAvgResult.metadata}
                                isVisible={true}
                            />
                        )}
                    </div>

                    {/* Column Average Section */}
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Column Average</CardTitle>
                                <p className="text-sm text-calm-accent">
                                    Calculate the average of elements in each column (reuses column sum)
                                </p>
                            </CardHeader>
                            <CardContent>
                                <Button
                                    onClick={() => callAPI('column-average', setColAvgResult)}
                                    disabled={loading !== null}
                                    className="w-full sm:w-auto"
                                >
                                    {loading === 'column-average' ? 'Calculating...' : 'Calculate Column Average'}
                                </Button>
                            </CardContent>
                        </Card>
                        {colAvgResult && (
                            <AnimatedResultCard
                                title="Column Average Results"
                                result={colAvgResult.result}
                                metadata={colAvgResult.metadata}
                                isVisible={true}
                            />
                        )}
                    </div>

                    {/* Swap Diagonals Section */}
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Swap Upper & Lower Diagonal</CardTitle>
                                <p className="text-sm text-calm-accent">
                                    Swap elements above and below the main diagonal (in-place operation)
                                </p>
                            </CardHeader>
                            <CardContent>
                                <Button
                                    onClick={() => callAPI('swap-diagonals', setSwapResult)}
                                    disabled={loading !== null}
                                    className="w-full sm:w-auto"
                                >
                                    {loading === 'swap-diagonals' ? 'Swapping...' : 'Swap Diagonals'}
                                </Button>
                            </CardContent>
                        </Card>
                        {swapResult && (
                            <AnimatedResultCard
                                title="Swapped Matrix"
                                result={swapResult.result}
                                metadata={swapResult.metadata}
                                isVisible={true}
                            />
                        )}
                    </div>

                    {/* Determinant Section */}
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Determinant</CardTitle>
                                <p className="text-sm text-calm-accent">
                                    Calculate determinant using Gaussian Elimination with Partial Pivoting
                                </p>
                            </CardHeader>
                            <CardContent>
                                <Button
                                    onClick={() => callAPI('determinant', setDetResult)}
                                    disabled={loading !== null}
                                    className="w-full sm:w-auto"
                                >
                                    {loading === 'determinant' ? 'Calculating...' : 'Calculate Determinant'}
                                </Button>
                            </CardContent>
                        </Card>
                        {detResult && (
                            <AnimatedResultCard
                                title="Determinant Result"
                                result={detResult.result as any}
                                metadata={detResult.metadata}
                                isVisible={true}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
