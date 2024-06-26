import {
  Legend,
  PieChart,
  Tooltip,
  ResponsiveContainer,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar
} from 'recharts'

type Props = {
  data: {
    name: string
    value: number
  }[]
}

export const RadarVariant = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <RadarChart cx="50%" cy="50%" outerRadius="60%" data={data}>
        <PolarGrid />
        <PolarAngleAxis style={{ fontSize: '12px' }} dataKey="name" />
        <PolarAngleAxis style={{ fontSize: '12px' }} />
        <Radar
          dataKey="value"
          stroke="#3b82f6"
          fill="#3b82f6"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}
