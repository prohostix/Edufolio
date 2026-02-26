import UniversityForm from '../../../../views/Admin/UniversityForm';
import ProtectedRoute from '../../../../components/ProtectedRoute';
export default function Page() { return <ProtectedRoute><UniversityForm /></ProtectedRoute>; }