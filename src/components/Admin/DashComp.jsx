import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { FaUser, FaBox, FaMoneyCheckAlt, FaCog, FaWallet, FaDollarSign, FaExclamationTriangle } from 'react-icons/fa';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

// Enregistrer les composants nécessaires de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export const AdminDashboard = () => {
  const leadsBySourceData = {
    labels: ['Ads', 'Trade Shows', 'Web'],
    datasets: [
      {
        label: 'Leads by Source',
        data: [8500, 5000, 7000],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const topProductsSalesData = {
    labels: ['iMac', 'iPhone'],
    datasets: [
      {
        label: 'Top Products Sales',
        data: [300, 225],
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="admin-dashboard">
      <div className="stats-row">
        <div className="stat-card">
          <FaUser className="stat-icon" />
          <div className="stat-info">
            <h4>3564</h4>
            <p>New Customers</p>
          </div>
        </div>
        <div className="stat-card">
          <FaBox className="stat-icon" />
          <div className="stat-info">
            <h4>342</h4>
            <p>New Products</p>
          </div>
        </div>
        <div className="stat-card">
          <FaMoneyCheckAlt className="stat-icon" />
          <div className="stat-info">
            <h4>56%</h4>
            <p>Today's Profit</p>
          </div>
        </div>
        <div className="stat-card">
          <FaCog className="stat-icon" />
          <div className="stat-info">
            <h4>56%</h4>
            <p>New Leads</p>
          </div>
        </div>
      </div>

      <div className="charts-row">
        <div className="chart-card">
          <h4>Leads by Source</h4>
          <Doughnut data={leadsBySourceData} />
        </div>
        <div className="chart-card">
          <h4>Top Products Sales</h4>
          <Line data={topProductsSalesData} />
        </div>
      </div>
      <div className="charts-row">
        <div className="chart-card">
        </div>
        <div className="chart-card">
        </div>
      </div>
    </div>
  );
};

export const StaffDashboard = () => {
  const topProductsSalesData = {
    labels: ['Product A', 'Product B', 'Product C'],
    datasets: [
      {
        label: 'Top Products Sales',
        data: [200, 150, 100],
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

  const classWiseReportData = {
    labels: ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'],
    datasets: [
      {
        label: 'Fees (Monthly)',
        data: [15000, 15000, 15000, 15000, 15000],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Paid Amount',
        data: [9000, 9000, 9000, 9000, 9000],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const estimatedFeeData = {
    labels: ['Collection', 'Remaining'],
    datasets: [
      {
        data: [35000, 35000],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };

  return (
    <div className="staff-dashboard">
      <div className="stats-row">
        <div className="stat-card">
          <FaUser className="stat-icon" />
          <div className="stat-info">
            <h4>50</h4>
            <p>Total Students</p>
          </div>
        </div>
        <div className="stat-card">
          <FaUser className="stat-icon" />
          <div className="stat-info">
            <h4>50</h4>
            <p>Total Employees</p>
          </div>
        </div>
        <div className="stat-card">
          <FaWallet className="stat-icon" />
          <div className="stat-info">
            <h4>₹7,800</h4>
            <p>Revenue This Month</p>
          </div>
        </div>
        <div className="stat-card">
          <FaDollarSign className="stat-icon" />
          <div className="stat-info">
            <h4>₹4,200</h4>
            <p>Total Profit</p>
          </div>
        </div>
        <div className="stat-card">
          <FaExclamationTriangle className="stat-icon" />
          <div className="stat-info">
            <h4>₹20,200</h4>
            <p>Dues This Month</p>
          </div>
        </div>
      </div>

      <div className="charts-row">
        <div className="chart-card">
          <h4>Class Wise Report</h4>
          <Bar data={classWiseReportData} />
        </div>
        <div className="chart-card">
          <h4>Estimated Fee This Month</h4>
          <Doughnut data={estimatedFeeData} />
        </div>
        <div className="chart-card">
          <h4>Staff Presence</h4>
          <Line data={topProductsSalesData} />
        </div>
      </div>

      <div className="report-section">
        <h4>Class Wise Report</h4>
        <table>
          <thead>
            <tr>
              <th>Class</th>
              <th>Present Today</th>
              <th>Absent Today</th>
              <th>On Leave</th>
              <th>Fees (Monthly)</th>
              <th>Paid Amount</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>35</td>
              <td>15</td>
              <td>5</td>
              <td>15,000</td>
              <td>9,000</td>
              <td>6,000</td>
            </tr>
            <tr>
              <td>1</td>
              <td>35</td>
              <td>15</td>
              <td>5</td>
              <td>15,000</td>
              <td>9,000</td>
              <td>6,000</td>
            </tr>
            <tr>
              <td>1</td>
              <td>35</td>
              <td>15</td>
              <td>5</td>
              <td>15,000</td>
              <td>9,000</td>
              <td>6,000</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};