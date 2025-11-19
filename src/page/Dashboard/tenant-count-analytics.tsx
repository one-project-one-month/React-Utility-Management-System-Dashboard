import { type PieLabelRenderProps } from 'recharts';

import { useFetchContractTypesAnalytics } from './hooks/useFetchAnalytics';
import AnalyticsPieChart from './components/AnalyticsPieChart';

const RADIAN = Math.PI / 180;



const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: PieLabelRenderProps) => {

  const ncx = Number(cx);
  const ncy = Number(cy);
  const ir = Number(innerRadius);
  const or = Number(outerRadius);
  const npercent = Number(percent);


  if (isNaN(ncx) || isNaN(ncy) || isNaN(ir) || isNaN(or) || isNaN(npercent)) {
    return null;
  }

  const radius = ir + (or - ir) * 0.5;
  const angleInRadian = -(midAngle ?? 0) * RADIAN;

  const x = ncx + radius * Math.cos(angleInRadian);
  const y = ncy + radius * Math.sin(angleInRadian);

  return (
    <text
      x={x}
      y={y}
      fill="#ffffff"
      textAnchor={x > ncx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize={14}
    >
      {`${(npercent * 100).toFixed(0)}%`}
    </text>
  );
};

const TenantCountAnalytics = () => {
  const { data = [] } = useFetchContractTypesAnalytics();

  return (
    <AnalyticsPieChart
      title='Contract Types Analytics'
      data={data}
      dataKey='tenantCount'
      nameKey='contractType'
      renderLabel={renderCustomizedLabel}
      tooltipFormatter={(value, name) => {
        let displayName = name;

        if (typeof name === 'string') {
          const match = name.match(/^(\d+)\sMonths$/);
          if (match) {
            const months = parseInt(match[1], 10);
            if (months >= 12) {
              const years = months / 12;
              displayName = years === 1 ? '1 Year' : `${years} Years`;
            }
          }
        }

        return [`${value} Tenants`, displayName];
      }}
      legendFormatter={(value) => {
        if (value === "12 Months") {
          return "1 Year";
        }
        if (value === "24 Months") {
          return "2 Years";
        }
        return value;
      }}
    />
  );
};

export default TenantCountAnalytics;


