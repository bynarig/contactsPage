import { FiGithub } from "react-icons/fi";
import { CiLinkedin } from "react-icons/ci";
import Button from '#/shared/ui/Button';
import { useNavigate } from 'react-router-dom';

export default function LinksWidget() {
  const navigate = useNavigate();

  const handleNavigateToProjects = () => {
    navigate('/projects');
  };

  return (
    <div className="flex items-center justify-center h-150 md:h-250 lg:h-screen mt-10 md:mt-0 flex-col">
      <div className="card bg-base-100 w-200 shadow-md   max-w-80 md:max-w-100 flex flex-row justify-between ">
        <div>
          <h2 className="text-5xl font-bold">Yaroslav</h2>
        <h2 className="text-2xl font-thin opacity-30">fullstack developer</h2>
        <p>@bynarig</p>
        <p></p>
        </div>
        <div>
          <FiGithub className="text-3xl"/>
        <CiLinkedin className="text-3xl"/>
        </div>
      </div>
      <Button className="btn-accent mt-10" name="My projects" onClick={handleNavigateToProjects} />
    </div>
  );
}