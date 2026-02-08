import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ElegantShape } from '@/components/ui/shape-landing-hero';
import { motion } from 'framer-motion';

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
        <div className="relative min-h-screen bg-[#030303] p-8 overflow-hidden">
            {/* Background gradients */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.03] via-transparent to-cyan-500/[0.03] blur-3xl" />

            {/* Floating geometric shapes */}
            <div className="absolute inset-0 overflow-hidden">
                <ElegantShape
                    delay={0.2}
                    width={400}
                    height={100}
                    rotate={15}
                    gradient="from-violet-500/[0.1]"
                    className="left-[-5%] top-[10%]"
                />
                <ElegantShape
                    delay={0.4}
                    width={300}
                    height={80}
                    rotate={-20}
                    gradient="from-cyan-500/[0.1]"
                    className="right-[-3%] bottom-[15%]"
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-6 flex items-center justify-between"
                >
                    <div>
                        <h1 className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-violet-300 via-white to-cyan-300">
                            Matrix Input
                        </h1>
                        <p className="text-white/60 mt-1">
                            Enter values for your {matrixSize}×{matrixSize} matrix
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => navigate('/')}
                        className="bg-white/[0.03] border-white/[0.1] text-white hover:bg-white/[0.08]"
                    >
                        ← Back
                    </Button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <Card className="mb-6 backdrop-blur-xl bg-white/[0.03] border-white/[0.08]">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-white/90">Matrix Values</CardTitle>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleRandomFill}
                                    className="bg-gradient-to-r from-violet-500/20 to-cyan-500/20 border-white/[0.1] text-white hover:from-violet-500/30 hover:to-cyan-500/30"
                                >
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
                                                className="bg-white/[0.05] border border-white/[0.1] rounded text-white text-xs text-center focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent"
                                                style={{ width: matrixSize > 30 ? '48px' : '64px', height: matrixSize > 30 ? '48px' : '64px' }}
                                            />
                                        ))
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex justify-end"
                >
                    <Button
                        size="lg"
                        onClick={handleSubmit}
                        className="bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-600 hover:to-cyan-600 border-0"
                    >
                        Proceed to Analysis →
                    </Button>
                </motion.div>
            </div>

            {/* Bottom gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent pointer-events-none" />
        </div>
    );
}
