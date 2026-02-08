import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ResultChartProps {
    data: number[];
    title: string;
    type: 'sum' | 'average';
}

export default function ResultChart({ data, title, type }: ResultChartProps) {
    // Transform data for recharts
    const chartData = data.map((value, index) => ({
        index: `${index}`,
        value: value,
        label: type === 'sum' ? 'Sum' : 'Average'
    }));

    // Gradient colors based on type
    const gradientColors = type === 'sum'
        ? ['#8b5cf6', '#ec4899'] // violet to rose
        : ['#06b6d4', '#f59e0b']; // cyan to amber

    return (
        <div className="w-full h-64 mb-4">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <defs>
                        {/* Gradient for bars */}
                        <linearGradient id={`barGradient-${type}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={gradientColors[0]} stopOpacity={0.8} />
                            <stop offset="100%" stopColor={gradientColors[1]} stopOpacity={0.6} />
                        </linearGradient>
                    </defs>

                    {/* Grid with dark theme */}
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />

                    {/* X Axis */}
                    <XAxis
                        dataKey="index"
                        stroke="rgba(255, 255, 255, 0.5)"
                        tick={{ fill: 'rgba(255, 255, 255, 0.7)', fontSize: 12 }}
                        label={{ value: 'Index', position: 'insideBottom', offset: -5, fill: 'rgba(255, 255, 255, 0.6)' }}
                    />

                    {/* Y Axis */}
                    <YAxis
                        stroke="rgba(255, 255, 255, 0.5)"
                        tick={{ fill: 'rgba(255, 255, 255, 0.7)', fontSize: 12 }}
                        label={{ value: 'Value', angle: -90, position: 'insideLeft', fill: 'rgba(255, 255, 255, 0.6)' }}
                    />

                    {/* Tooltip */}
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'rgba(0, 0, 0, 0.9)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '8px',
                            padding: '8px 12px'
                        }}
                        labelStyle={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 'bold' }}
                        itemStyle={{ color: gradientColors[0] }}
                        cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                    />

                    {/* Bar with gradient */}
                    <Bar
                        dataKey="value"
                        fill={`url(#barGradient-${type})`}
                        radius={[4, 4, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
