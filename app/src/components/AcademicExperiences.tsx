const AcademicExperiences = () => {

return (
<div className="relative border flex-row border-[#166276] p-4 rounded-b-lg gap-10 text-left bg-white z-50">
  <div className="grid grid-cols-2 gap-10"> 
    <p>Formação</p>
    <p>Status</p>
  </div>
  <div className="relative flex gap-10">
    <select className="w-[100%]  flex border-gray-300 py-3 px-4 bg-white placeholder-gray-400 text-base focus:outline-none focus:ring-2  focus:border-transparent focus:ring-sky-200 rounded-lg"
    id="AcademicLevel">
      <option value="basic">Básico</option>
      <option value="medium">Médio</option>
      <option value="superior">Superior</option>
    </select>

    <select className="w-[100%]  flex border-gray-300 py-3 px-4 bg-white placeholder-gray-400 text-base focus:outline-none focus:ring-2  focus:border-transparent focus:ring-sky-200 rounded-lg"
    id="AcademicStatus">
      <option value="Progressing">Em andamento</option>
      <option value="Done">Concluída</option>
      <option value="Not Done">Não finalizado</option>
    </select>
  </div>
  <div className="grid grid-cols-2 gap-10"> 
    <p>Curso</p>
    <p>Instituição</p>
  </div>
  <div className="relative flex gap-10">
    <input
    type="text" id="AcademicCourse"
    className="w-[100%]  flex border-gray-300 py-3 px-4 bg-white placeholder-gray-400 text-base focus:outline-none focus:ring-2  focus:border-transparent focus:ring-sky-200 rounded-lg"
    placeholder="Curso"
    />

    <input
    type="text" id="AcademicInstitution"
    className="w-[100%]  flex border-gray-300 py-3 px-4 bg-white placeholder-gray-400 text-base focus:outline-none focus:ring-2  focus:border-transparent focus:ring-sky-200 rounded-lg"
    placeholder="Instituição"
    />
  </div>
  <div className="grid grid-cols-2 gap-10"> 
    <p>Início</p>
    <p>Fim</p>
  </div>
  <div className="relative flex gap-10">
    <input
    type="text" id="AcademicStart"
    className="w-[100%]  flex border-gray-300 py-3 px-4 bg-white placeholder-gray-400 text-base focus:outline-none focus:ring-2  focus:border-transparent focus:ring-sky-200 rounded-lg"
    placeholder="Mês / Ano"
    />

    <input
    type="text" id="AcademicEnd"
    className="w-[100%]  flex border-gray-300 py-3 px-4 bg-white placeholder-gray-400 text-base focus:outline-none focus:ring-2  focus:border-transparent focus:ring-sky-200 rounded-lg"
    placeholder="Mês / Ano"
    />
  </div>
</div>
);
};

export default AcademicExperiences