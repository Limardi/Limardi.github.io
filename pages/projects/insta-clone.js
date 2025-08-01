import { useRouter } from 'next/router';

const ProjectPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // Fetch project data based on the id
  const project = {
    title: `Project ${id}`,
    description: 'Detailed description of the project.',
    // Add more project details here
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
      <p className="text-lg">{project.description}</p>
      {/* Add more project details here */}
    </div>
  );
};

export default ProjectPage;