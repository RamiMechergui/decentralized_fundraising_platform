import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import "./profile.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../../setup";

interface PieChartProps {
  data: number[];
  labels: string[];
}

const PieChart: React.FC<PieChartProps> = ({ data, labels }) => {
  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "pie",
      width:600
    },
    labels,
    series: data,
    colors: ["#FF6384", "#FFCE56", "#36A2EB", "#66BB6A", "#8d6e63"],
    dataLabels: {
      enabled: false // Set this to false to hide the percentage values in the pie chart
    }

  };

  return (
    <div>
      <ReactApexChart options={chartOptions} series={data} type="pie" width="600" />
    </div>
  );
};

export function Overview() {
  const [data, setData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const userType = useSelector<RootState>(({auth}) => auth.user?.userType);
  const pme = userType == "admin";

  useEffect(() => {
    // Fetch data from the backend using Axios
    axios.get("http://backend.docker.local/api/campaign/piechart") // Replace this with your actual API endpoint
      .then((response) => {
        const { data, labels } = response.data; // Assuming the API returns data and labels in the response
        
        setData(data);
        setLabels(labels);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    
  }, []);
  console.log("data",data); 
    console.log("labels",labels);  
  return (
    
      <div>
      <h1>Campaigns overview</h1>
      <div className="pie">
        {pme && data.length > 0 && <PieChart data={data} labels={labels} />}
      </div>
      
    </div>
    
  

    // <div className='row g-5 g-xxl-8'>
    //   <div className='col-xl-6'>
    //     <FeedsWidget2 className='mb-5 mb-xxl-8' />

    //     <FeedsWidget3 className='mb-5 mb-xxl-8' />

    //     <FeedsWidget4 className='mb-5 mb-xxl-8' />

    //     <FeedsWidget5 className='mb-5 mb-xxl-8' />

    //     <FeedsWidget6 className='mb-5 mb-xxl-8' />
    //   </div>

    //   <div className='col-xl-6'>
    //     <ChartsWidget1 className='mb-5 mb-xxl-8' />

    //     <ListsWidget5 className='mb-5 mb-xxl-8' />

    //     <ListsWidget2 className='mb-5 mb-xxl-8' />
    //   </div>
    // </div>
  );
}
