import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
        <div className="min-h-screen bg-calm-bg flex items-center justify-center p-8">
            <div className="relative z-10 w-full max-w-md">
                <Card className="shadow-lg">
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl mb-2">
                            Interactive Matrix Analysis
                        </CardTitle>
                        <p className="text-calm-accent text-sm">
                            A Data Structures & Algorithms Application
                        </p>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="matrixSize" className="block text-sm font-medium mb-2">
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
                                    className="text-lg"
                                />
                                <p className="text-xs text-calm-accent mt-1">
                                    Constraint: N ≥ 20
                                </p>
                            </div>

                            {error && (
                                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                                    <p className="text-sm text-red-600">{error}</p>
                                </div>
                            )}

                            <Button type="submit" className="w-full" size="lg">
                                Create Matrix →
                            </Button>
                        </form>

                        <div className="mt-6 pt-6 border-t border-calm-border">
                            <h3 className="text-sm font-medium mb-2">Available Operations:</h3>
                            <ul className="text-xs text-calm-accent space-y-1">
                                <li>• Row Sum & Average</li>
                                <li>• Column Sum & Average</li>
                                <li>• Swap Upper & Lower Diagonal</li>
                                <li>• Determinant (Gaussian Elimination)</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>

                <p className="text-center text-xs text-calm-accent mt-4">
                    All matrix operations run server-side with verified DSA correctness
                </p>
            </div>
        </div>
    );
}
