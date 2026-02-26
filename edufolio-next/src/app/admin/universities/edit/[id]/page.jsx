import UniversityForm from '../../../../../views/Admin/UniversityForm';
import ProtectedRoute from '../../../../../components/ProtectedRoute';
export default function Page({ params }) { return <ProtectedRoute><UniversityForm id={params.id} /></ProtectedRoute>; }