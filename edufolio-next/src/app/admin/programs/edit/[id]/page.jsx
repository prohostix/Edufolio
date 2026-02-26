import ProgramForm from '../../../../../views/Admin/ProgramForm';
import ProtectedRoute from '../../../../../components/ProtectedRoute';
export default function Page({ params }) { return <ProtectedRoute><ProgramForm id={params.id} /></ProtectedRoute>; }