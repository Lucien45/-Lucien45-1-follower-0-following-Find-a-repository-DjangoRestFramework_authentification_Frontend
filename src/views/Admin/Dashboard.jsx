import React, { useEffect, useState } from 'react';
import { UserService } from '../../_services/User.service';
import { Utils } from '../../_utils/utils';
import { AdminDashboard, StaffDashboard } from '../../components/Admin/DashComp';
import '../../assets/admin/dashboard.css';

const Dashboard = () => {
  const [status, setStatus] = useState();

  useEffect(() => {
    UserService.getUser()
      .then((res) => {
        console.log(res.data.user);
        if (res.data.user.is_admin) {
          setStatus('Administrateur');
        } else {
          setStatus('Staff');
        }
      })
      .catch((error) => {
        Utils.errorPage(error.response.data.message);
      });
  }, []);

  return (
    <div className="dashboard-container">
      {status === 'Administrateur' ? (
        <AdminDashboard />
      ) : (
        <StaffDashboard />
      )}
    </div>
  );
};

export default Dashboard;
