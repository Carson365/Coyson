import { useAdminAuth } from '../AdminAuthenticateContext.js';

function AdminDashboard() {
    const { adminUser } = useAdminAuth();

  return (
    <div>
        {console.log(adminUser)}
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin dashboard!</p>
    </div>
  );
}
export default AdminDashboard;