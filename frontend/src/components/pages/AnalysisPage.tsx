import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AnimatedResultCard from '@/components/layout/AnimatedResultCard';
import type { MatrixOperationResult } from '@/types/matrix';
import { ElegantShape } from '@/components/ui/shape-landing-hero';
import { motion } from 'framer-motion';

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
        <div className="relative min-h-screen bg-[#030303] p-8 overflow-hidden">
            {/* Background gradients */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.03] via-transparent to-indigo-500/[0.03] blur-3xl" />

            {/* Floating geometric shapes */}
            <div className="absolute inset-0 overflow-hidden">
                <ElegantShape
                    delay={0.2}
                    width={350}
                    height={90}
                    rotate={10}
                    gradient="from-amber-500/[0.1]"
                    className="left-[-8%] top-[20%]"
                />
                <ElegantShape
                    delay={0.4}
                    width={280}
                    height={70}
                    rotate={-18}
                    gradient="from-indigo-500/[0.1]"
                    className="right-[-4%] top-[60%]"
                />
                <ElegantShape
                    delay={0.3}
                    width={200}
                    height={50}
                    rotate={-25}
                    gradient="from-rose-500/[0.08]"
                    className="left-[10%] bottom-[10%]"
                />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8 flex items-center justify-between"
                >
                    <div>
                        <h1 className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-white to-indigo-300">
                            Matrix Analysis
                        </h1>
                        <p className="text-white/60 mt-1">
                            {matrixSize}×{matrixSize} Matrix • All operations run server-side
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => navigate('/input', { state: { matrixSize } })}
                        className="bg-white/[0.03] border-white/[0.1] text-white hover:bg-white/[0.08]"
                    >
                        ← Edit Matrix
                    </Button>
                </motion.div>

                <div className="space-y-8">
                    {/* Row Sum Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <Card className="backdrop-blur-xl bg-white/[0.03] border-white/[0.08]">
                            <CardHeader>
                                <CardTitle className="text-white/90">Row Sum</CardTitle>
                                <p className="text-sm text-white/60">
                                    Calculate the sum of elements in each row
                                </p>
                            </CardHeader>
                            <CardContent>
                                <Button
                                    onClick={() => callAPI('row-sum', setRowSumResult)}
                                    disabled={loading !== null}
                                    className="w-full sm:w-auto bg-gradient-to-r from-amber-500/20 to-indigo-500/20 border border-white/[0.1] text-white hover:from-amber-500/30 hover:to-indigo-500/30"
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
                    </motion.div>

                    {/* Column Sum Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Card className="backdrop-blur-xl bg-white/[0.03] border-white/[0.08]">
                            <CardHeader>
                                <CardTitle className="text-white/90">Column Sum</CardTitle>
                                <p className="text-sm text-white/60">
                                    Calculate the sum of elements in each column
                                </p>
                            </CardHeader>
                            <CardContent>
                                <Button
                                    onClick={() => callAPI('column-sum', setColSumResult)}
                                    disabled={loading !== null}
                                    className="w-full sm:w-auto bg-gradient-to-r from-amber-500/20 to-indigo-500/20 border border-white/[0.1] text-white hover:from-amber-500/30 hover:to-indigo-500/30"
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
                    </motion.div>

                    {/* Row Average Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <Card className="backdrop-blur-xl bg-white/[0.03] border-white/[0.08]">
                            <CardHeader>
                                <CardTitle className="text-white/90">Row Average</CardTitle>
                                <p className="text-sm text-white/60">
                                    Calculate the average of elements in each row (reuses row sum)
                                </p>
                            </CardHeader>
                            <CardContent>
                                <Button
                                    onClick={() => callAPI('row-average', setRowAvgResult)}
                                    disabled={loading !== null}
                                    className="w-full sm:w-auto bg-gradient-to-r from-amber-500/20 to-indigo-500/20 border border-white/[0.1] text-white hover:from-amber-500/30 hover:to-indigo-500/30"
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
                    </motion.div>

                    {/* Column Average Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <Card className="backdrop-blur-xl bg-white/[0.03] border-white/[0.08]">
                            <CardHeader>
                                <CardTitle className="text-white/90">Column Average</CardTitle>
                                <p className="text-sm text-white/60">
                                    Calculate the average of elements in each column (reuses column sum)
                                </p>
                            </CardHeader>
                            <CardContent>
                                <Button
                                    onClick={() => callAPI('column-average', setColAvgResult)}
                                    disabled={loading !== null}
                                    className="w-full sm:w-auto bg-gradient-to-r from-amber-500/20 to-indigo-500/20 border border-white/[0.1] text-white hover:from-amber-500/30 hover:to-indigo-500/30"
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
                    </motion.div>

                    {/* Swap Diagonals Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <Card className="backdrop-blur-xl bg-white/[0.03] border-white/[0.08]">
                            <CardHeader>
                                <CardTitle className="text-white/90">Swap Upper & Lower Diagonal</CardTitle>
                                <p className="text-sm text-white/60">
                                    Swap elements above and below the main diagonal (in-place operation)
                                </p>
                            </CardHeader>
                            <CardContent>
                                <Button
                                    onClick={() => callAPI('swap-diagonals', setSwapResult)}
                                    disabled={loading !== null}
                                    className="w-full sm:w-auto bg-gradient-to-r from-amber-500/20 to-indigo-500/20 border border-white/[0.1] text-white hover:from-amber-500/30 hover:to-indigo-500/30"
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
                    </motion.div>

                    {/* Determinant Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <Card className="backdrop-blur-xl bg-white/[0.03] border-white/[0.08]">
                            <CardHeader>
                                <CardTitle className="text-white/90">Determinant</CardTitle>
                                <p className="text-sm text-white/60">
                                    Calculate determinant using Gaussian Elimination with Partial Pivoting
                                </p>
                            </CardHeader>
                            <CardContent>
                                <Button
                                    onClick={() => callAPI('determinant', setDetResult)}
                                    disabled={loading !== null}
                                    className="w-full sm:w-auto bg-gradient-to-r from-amber-500/20 to-indigo-500/20 border border-white/[0.1] text-white hover:from-amber-500/30 hover:to-indigo-500/30"
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
                    </motion.div>
                </div>
            </div>

            {/* Bottom gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent pointer-events-none" />
        </div>
    );
}
