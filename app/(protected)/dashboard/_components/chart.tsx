"use client";

import { useMounted } from "@/hooks/use-mounted";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

type ChartData = {
    name: string,
    value: number,
    color: string,
}

interface ChartProps {
    chartData: ChartData[],
}

export const Chart = ({
    chartData
}: ChartProps) => {

    const mounted = useMounted();

    if (!mounted) {
        return null;
    }

    return (
        <ResponsiveContainer width="100%" height={270}>
            <PieChart>
                <Pie
                    data={chartData}
                    dataKey="value"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                    labelLine={false}
                    fontSize="small"
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    )
}