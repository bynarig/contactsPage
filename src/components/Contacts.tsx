import React from 'react';
import './contacts.scss'; // Assuming the CSS is in contacts.scss or equivalent file

const Contact: React.FC = () => {
  // Contact information (e.g., social media links)

  // Projects list with descriptions
  const projects = [
    {
      name: 'Project One',
      description: 'A description of project one goes here. It can be anything!',
      link: 'https://github.com/yourusername/project-one'
    },
    {
      name: 'Project Two',
      description: 'Description for project two. A short summary.',
      link: 'https://github.com/yourusername/project-two'
    },
    {
      name: 'Project Three',
      description: 'Another interesting project with some cool functionality.',
      link: 'https://github.com/yourusername/project-three'
    },
    {
      name: 'Project Four',
      description: 'A new exciting project with great features.',
      link: 'https://github.com/yourusername/project-four'
    },
      {
      name: 'Project Four',
      description: 'A new exciting project with great features.',
      link: 'https://github.com/yourusername/project-four'
    },
        {
      name: 'Project Four',
      description: 'A new exciting project with great features.',
      link: 'https://github.com/yourusername/project-four'
    },
        {
      name: 'Project Four',
      description: 'A new exciting project with great features.',
      link: 'https://github.com/yourusername/project-four'
    },
        {
      name: 'Project Four',
      description: 'A new exciting project with great features.',
      link: 'https://github.com/yourusername/project-four'
    },
        {
      name: 'Project Four',
      description: 'A new exciting project with great features.',
      link: 'https://github.com/yourusername/project-four'
    },
  ];

  return (
      <div className="text-white min-h-screen py-8 px-4">
        <div className="flex justify-between ">
          <div className=" ml-0 lg:ml-20 mb-32 lg:mb-0">
            <h1 className="text-6xl lg:text-9xl font-normal font-sans mb-8">Contacts</h1>
            <div className="block ml-3 lg:ml-10">
              <a href="https://discord.com/users/722469380046454864" className=" text-5xl lg:text-7xl font-extralight font-sans bg-transparent">discord</a><br/>
              <a href="https://steamcommunity.com/id/bynarig/" className=" text-5xl lg:text-7xl font-extralight font-sans bg-transparent">steam</a><br/>
              <a href="https://t.me/bynarig" className=" text-5xl lg:text-7xl font-extralight font-sans bg-transparent">telegram</a><br/>
              <a href="https://www.gta5-mods.com/users/bynarig" className=" text-5xl lg:text-7xl font-extralight font-sans bg-transparent">5mods</a>
            </div>

          </div>

          {/* Running Text Section */}
          {/*<div className="">dakfjksj</div>*/}
          <div className="running-text-container lg:flex flex-col items-end justify-evenly mr-40 lg:mt-16">
            <div className="running-text mr-40">dev bynarig</div>
            <div className="running-text mr-40">dev bynarig</div>
            <div className="running-text mr-40">dev bynarig</div>
            <div className="running-text mr-40">dev bynarig</div>
              <div className="running-text mr-40">dev bynarig</div>
              <div className="running-text mr-40">dev bynarig</div>
              <div className="running-text mr-40">dev bynarig</div>
              <div className="running-text mr-40">dev bynarig</div>
              <div className="running-text mr-40">dev bynarig</div>
              <div className="running-text mr-40">dev bynarig</div>

              <div className="rotate-90 text-9xl pb-96 bg-transparent font-sans">NonStop</div>
            </div>


        </div>

              {/* Projects Section */}
      <section>
        <div className="text-2xl font-semibold ml-10 lg:ml-20 mb-4 lg:mb-12 mt-0 lg:mt-80 text-5xl lg:text-7xl font-sans ">My projects</div>
        <div className="overflow-x-auto flex gap-8 pb-8 snap-x snap-mandatory mx-0 lg:mx-20 ">
          {projects.map((project, index) => (
            <div
              key={index}
              className="lg:min-w-max w-full sm:w-80 md:w-96 lg:w-1/3 h-96 lg:h-44 p-6 rounded-lg shadow-lg bg-gray-800 snap-start transition-all duration-300 hover:scale-105 "
            >
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">{project.name}</h3>
              <p className="text-lg mb-4">{project.description}</p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 font-semibold"
              >
                View Project
              </a>
            </div>
          ))}
        </div>
      </section>
      </div>
  );
};

export default Contact;
