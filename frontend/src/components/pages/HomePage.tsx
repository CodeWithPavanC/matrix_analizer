import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HeroGeometric, ElegantShape } from '@/components/ui/shape-landing-hero';
import { motion } from 'framer-motion';

export default function HomePage() {
    const [matrixSize, setMatrixSize] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const size = parseInt(matrixSize);

        // Validation
        if (isNaN(size)) {
            setError('Please enter a valid integer');
            return;
        }

        if (size < 20) {
            setError('Matrix size must be at least 20');
            return;
        }

        if (size > 100) {
            setError('For performance reasons, please use a matrix size ≤ 100');
            return;
        }

        // Navigate to matrix input page
        navigate('/input', { state: { matrixSize: size } });
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]">
            {/* Background gradients */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

            {/* Floating geometric shapes */}
            <div className="absolute inset-0 overflow-hidden">
                <ElegantShape
                    delay={0.3}
                    width={600}
                    height={140}
                    rotate={12}
                    gradient="from-indigo-500/[0.15]"
                    className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
                />

                <ElegantShape
                    delay={0.5}
                    width={500}
                    height={120}
                    rotate={-15}
                    gradient="from-rose-500/[0.15]"
                    className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
                />

                <ElegantShape
                    delay={0.4}
                    width={300}
                    height={80}
                    rotate={-8}
                    gradient="from-violet-500/[0.15]"
                    className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
                />

                <ElegantShape
                    delay={0.6}
                    width={200}
                    height={60}
                    rotate={20}
                    gradient="from-amber-500/[0.15]"
                    className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
                />

                <ElegantShape
                    delay={0.7}
                    width={150}
                    height={40}
                    rotate={-25}
                    gradient="from-cyan-500/[0.15]"
                    className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-md px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <Card className="shadow-2xl backdrop-blur-xl bg-white/[0.03] border-white/[0.08]">
                        <CardHeader className="text-center">
                            <CardTitle className="text-3xl mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-rose-300">
                                Interactive Matrix Analysis
                            </CardTitle>
                            <p className="text-white/60 text-sm">
                                A Data Structures & Algorithms Application
                            </p>
                        </CardHeader>

                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="matrixSize" className="block text-sm font-medium mb-2 text-white/80">
                                        Enter Matrix Size (N × N)
                                    </label>
                                    <Input
                                        id="matrixSize"
                                        type="number"
                                        min="20"
                                        placeholder="Enter N (minimum 20)"
                                        value={matrixSize}
                                        onChange={(e) => {
                                            setMatrixSize(e.target.value);
                                            setError('');
                                        }}
                                        className="text-lg bg-white/[0.05] border-white/[0.1] text-white placeholder:text-white/30"
                                    />
                                    <p className="text-xs text-white/40 mt-1">
                                        Constraint: N ≥ 20
                                    </p>
                                </div>

                                {error && (
                                    <div className="bg-rose-500/10 border border-rose-500/20 rounded-md p-3">
                                        <p className="text-sm text-rose-400">{error}</p>
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-indigo-500 to-rose-500 hover:from-indigo-600 hover:to-rose-600 border-0"
                                    size="lg"
                                >
                                    Create Matrix →
                                </Button>
                            </form>

                            <div className="mt-6 pt-6 border-t border-white/[0.08]">
                                <h3 className="text-sm font-medium mb-2 text-white/80">Available Operations:</h3>
                                <ul className="text-xs text-white/60 space-y-1">
                                    <li>• Row Sum & Average</li>
                                    <li>• Column Sum & Average</li>
                                    <li>• Swap Upper & Lower Diagonal</li>
                                    <li>• Determinant (Gaussian Elimination)</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>

                    <p className="text-center text-xs text-white/40 mt-4">
                        All matrix operations run server-side with verified DSA correctness
                    </p>
                </motion.div>
            </div>

            {/* Bottom gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
        </div>
    );
}
