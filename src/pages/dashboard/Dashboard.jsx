import React from 'react';

import { ChartCard } from '../../components/Dashboard/ChartCard';
import { TableCard } from '../../components/Dashboard/TableCard';
import { RecentActivity } from '../../components/Dashboard/RecentActivity';

const Dashboard = () => {
    return (
      <div>
        <h2>Dashboard</h2>
        {<><ChartCard /><TableCard /><RecentActivity /></>}
        {/* Aquí puedes agregar el contenido del dashboard */}
      </div>
    );
  };

export default Dashboard;