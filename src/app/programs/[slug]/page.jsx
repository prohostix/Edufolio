import ProgramDetail from '../../../views/ProgramDetail';
export default async function Page({ params }) { 
    const { slug } = await params;
    return <ProgramDetail slug={slug} />; 
}