import Dashboard from '../../../views/Admin/Dashboard';
import ProtectedRoute from '../../../components/ProtectedRoute';
export default function Page() { return <ProtectedRoute><Dashboard /></ProtectedRoute>; }