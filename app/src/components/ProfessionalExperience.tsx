const ProfessionalExperience = () => {

    return (
    <div className="relative border flex-row border-[#166276] p-4 rounded-b-lg gap-5 text-left bg-white z-50">
    <div className="grid grid-cols-2 gap-10"> 
      <p>Empresa</p>
      <p>Cargo</p>
    </div>
    <div className="relative flex gap-10">
      <input
      type="text" id="ProfessionalCompany"
      className="w-[100%]  flex border-gray-300 py-3 px-4 bg-white placeholder-gray-400 text-base focus:outline-none focus:ring-2  focus:border-transparent focus:ring-sky-200 rounded-lg"
      placeholder="Mobile Education"
      />

      <input
      type="text" id="ProfessionalPosition"
      className="w-[100%]  flex border-gray-300 py-3 px-4 bg-white placeholder-gray-400 text-base focus:outline-none focus:ring-2  focus:border-transparent focus:ring-sky-200 rounded-lg"
      placeholder="Product Designer"
      />
    </div>
    <div className="grid grid-cols-2 gap-10"> 
      <p>Início</p>
      <p>Fim</p>
    </div>
    <div className="relative flex gap-10">
      <input
      type="text" id="ProfessionalStart"
      className="w-[100%]  flex border-gray-300 py-3 px-4 bg-white placeholder-gray-400 text-base focus:outline-none focus:ring-2  focus:border-transparent focus:ring-sky-200 rounded-lg"
      placeholder="Mês / Ano"
      />

      <input
      type="text" id="ProfessionalEnd"
      className="w-[100%]  flex border-gray-300 py-3 px-4 bg-white placeholder-gray-400 text-base focus:outline-none focus:ring-2  focus:border-transparent focus:ring-sky-200 rounded-lg"
      placeholder="Mês / Ano"
      />
    </div>
    <div className="grid grid-cols-1"> 
      <p>Descrição de atividades</p>
    </div>
    <div className="relative flex">
      <input
      type="text" id="ProfessionalActivities"
      className="w-[100%]  flex border-gray-300 py-3 px-4 bg-white placeholder-gray-400 text-base focus:outline-none focus:ring-2  focus:border-transparent focus:ring-sky-200 rounded-lg"
      placeholder="Escreva aqui as suas responsabilidades"
      />

    </div>
    </div>
    );
    };
    
    export default ProfessionalExperience