import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart } from '../../../../components/chart';

// ----------------------------------------------------------------------

const chartData = [
  {
    name: 'Power',
    type: 'column',
    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
  },
  
];

export default function AnalyticsWebsiteVisits({title, subheader,}) {
  const chartOptions = merge(BaseOptionChart(), {
    // stroke: { width: [0,5,10] },
    plotOptions: { bar: { columnWidth: '70%' } },
    
    fill: { type: ['solid', ] },
    labels: [
      '01/Feb',
      '02/Feb',
      '03/Feb',
      '04/Feb',
      '05/Feb',
      '06/Feb',
      '07/Feb',
      '08/Feb',
      '09/Feb',
      '10/Feb',
      '11/Feb',
    ],
    toolbar:{
      show:true
    },
    // colors:['#00ff00'] ,
    // xaxis: { type: 'datetime' },
    tooltip: {
      enabled: true,
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} KWH`;
          }
          return y;
        },
      },
    },
  });

  return (
    <Card>
      <CardHeader title={title} subheader={subheader} />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={chartData} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
