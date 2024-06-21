import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { InputLabel, FormControl, Select, MenuItem, Container, colors } from '@mui/material';

import { useState, useEffect } from "react";
import {fetchBarChartData} from '../utils/api';

import './BarChartComponent.css';

export default function BarChartComponent(){

    const [dataset, setDataset]=useState([]);
    const [month, setMonth]=useState(9);
    const [loading, setLoading]=useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTransactions();
      }, [month]);

  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchBarChartData(month);
      setDataset(data);
    } catch (error) {
      setError(error.message || 'Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const xAxisData = dataset.map(item => item.priceRange);
  const seriesData = dataset.map(item => item.count);

    return(
        <div>

            <Container sx={{ marginTop: 4,}} className='container'>
              <FormControl fullWidth sx={{ marginBottom: 4, }}>
                <InputLabel className='input-label' id="month-select-label">Select Month</InputLabel>
                <Select
                  className='input'
                  labelId="month-select-label"
                  id="month-select"
                  value={month}
                  label="Select Month"
                  onChange={handleMonthChange}
                >
                  <MenuItem value={1}>January</MenuItem>
                  <MenuItem value={2}>February</MenuItem>
                  <MenuItem value={3}>March</MenuItem>
                  <MenuItem value={4}>April</MenuItem>
                  <MenuItem value={5}>May</MenuItem>
                  <MenuItem value={6}>June</MenuItem>
                  <MenuItem value={7}>July</MenuItem>
                  <MenuItem value={8}>August</MenuItem>
                  <MenuItem value={9}>September</MenuItem>
                  <MenuItem value={10}>October</MenuItem>
                  <MenuItem value={11}>November</MenuItem>
                  <MenuItem value={12}>December</MenuItem>
                </Select>
              </FormControl>
              <BarChart
                className='bar-chart'
                xAxis={[
                  {
                    scaleType: 'band',
                    data: xAxisData,
                    axis: {
                      tickLabelStyle: {
                        fill: '#EEEEEE' // Change x-axis text color to white
                      }
                    }
                  }
                ]}
                yAxis={[
                  {
                    axis: {
                      tickLabelStyle: {
                        fill: '#EEEEEE' // Change y-axis text color to white
                      }
                    }
                  }
                ]}
                series={[{ data: seriesData }]}
                width={500}
                height={300}
                sx={{
                    //change left yAxis label styles
                  "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel":{
                    strokeWidth:"0.4",
                    fill:"#fff"
                  },
                  // change all labels fontFamily shown on both xAxis and yAxis
                  "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel":{
                      fontFamily: "Roboto",
                    },
                    // change bottom label styles
                    "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel":{
                        strokeWidth:"0.5",
                        fill:"#fff"
                   }}}
              />

            </Container>

        </div>

        
    )

  }