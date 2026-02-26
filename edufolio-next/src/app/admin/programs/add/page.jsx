import ProgramForm from '../../../../views/Admin/ProgramForm';
import ProtectedRoute from '../../../../components/ProtectedRoute';
export default function Page() { return <ProtectedRoute><ProgramForm /></ProtectedRoute>; }