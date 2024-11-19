import { ChangeEvent, useEffect, useState, FormEvent } from "react";
import useSWR from "swr";
import { institutionService } from "../../services/Institution.services";
import Loading from "../general/Loading";
import AuthServices from "../../services/auth.services";
import {
  GoArrowLeft,
  GoArrowRight,
  GoChevronLeft,
  GoChevronRight,
} from "react-icons/go";
import { MdDelete, MdCreate, MdSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { getUserToken } from "../../helpers/userInfo";
import { toast } from "react-toastify";
import { IconContext } from "react-icons/lib";
import { useNotifications } from "../notification/NotificationContext";
import { Institution } from "../../interfaces/Institution";
import GenericModalComponent from "../GenericModalComponent";

import { useApi } from "../../hooks/useAPI";
// Interface
export type NewInstitution = {
  institutionName: string;
  domain: string;
  secondaryDomain: string;
};

const AddInstitutionButton = () => {
  const [showModal, setShowModal] = useState(false);
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  const {
    call: addInstitution,
    isLoading,
    error,
  } = useApi(AuthServices.addInstitution);

  // Use-form setup
  const { register, handleSubmit } = useForm<NewInstitution>();

  // Function to execute upon accepting an application
  const onSubmit: SubmitHandler<NewInstitution> = async (data) => {
    try {
      const res = await addInstitution({
        domain: data.domain,
        institutionName: data.institutionName,
        secondaryDomain: data.secondaryDomain,
      });
      console.log(res);
      setShowModal(false);
      navigate("/educado-admin/applications");
      addNotification(
        "Adicionado " +
          res.data.institution.institutionName +
          " como nova instituição"
      );
    } catch {
      if (error) {
        const errorCause = error.response?.data?.error?.code;
        switch (errorCause) {
          case "E1201":
            toast.error(" Não foi possível carregar a Instituição", {
              hideProgressBar: true,
            });
            break;
          case "E1202":
            toast.error(" já é uma instituição registrada", {
              hideProgressBar: true,
            });
            break;
          case "E1203":
            toast.error(" já está registrado em outra instituição", {
              hideProgressBar: true,
            });
            break;
          case "E1204":
            toast.error(" já está registrado em outra instituição", {
              hideProgressBar: true,
            });
            break;
          default:
            toast.error("Ocorreu um erro desconhecido", {
              hideProgressBar: true,
            });
        }
      }
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <button
        id="newInstitutionButton"
        className="btn text-base bg-[#166276]"
        onClick={(e) => {
          e.preventDefault();
          setShowModal(true);
        }}
        disabled={isLoading}>
        <div className="flex justify-center items-center space-x-2">
          {isLoading ? (
            <span className="spinner-border animate-spin rounded-full border-2 border-t-transparent w-4 h-4" />
          ) : null}
          <span>Adicionar</span>
        </div>
      </button>

      {showModal && (
        <GenericModalComponent
          onConfirm={handleSubmit(onSubmit)}
          onClose={handleClose}
          isVisible={showModal}
          title="Adicionar Instituição"
          contentText=""
          confirmBtnText="Adicionar"
          loading={isLoading}
          children={
            <form className="form-control flex flex-col space-y-4">
              <div className="flex flex-col space-y-2">
                <label>
                  <span>Nome da Instituição</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Instituição"
                  {...register("institutionName", { required: true })}
                  className="input"
                  id="institution"
                />

                <label>
                  <span>Domínio</span>
                </label>
                <input
                  type="text"
                  required
                  pattern="@([\w\-]+\.)+[\w\-]{2,4}"
                  title="@domain.com"
                  placeholder="@domain.com"
                  {...register("domain", { required: true })}
                  className="input"
                  id="domain"
                />

                <label>
                  <span>Segundo Domínio</span>
                </label>
                <input
                  type="text"
                  placeholder="@domain.com (opcional)"
                  title="@domain.com"
                  pattern="@([\w\-]+\.)+[\w\-]{2,4}$"
                  {...register("secondaryDomain")}
                  className="input"
                  id="secondary-domain"
                />
              </div>
            </form>
          }
        />
      )}
    </>
  );
};

export const InstitutionsTableAdmin = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { addNotification } = useNotifications();

  const userToken = getUserToken();
  const { data: institutionsResponse, mutate } = useSWR(
    "api/institutions",
    () => institutionService.getInstitutions(userToken)
  );

  if (!institutionsResponse?.data) return <Loading />;

  const filteredData = institutionsResponse.data.filter((institution) => {
    if (searchTerm === "") return institution;
    const fieldsToCheck = ["institutionName", "domain", "secondaryDomain"];
    return fieldsToCheck.some(
      (field) =>
        institution[field] &&
        institution[field].toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const startItem = (currentPage - 1) * rowsPerPage + 1;
  const endItem = Math.min(currentPage * rowsPerPage, filteredData.length);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  const columnNames = [
    { name: "Instituições", width: "basis-1/4" },
    { name: "Domínio", width: "basis-1/4" },
    { name: "Domínio secundário", width: "basis-1/4" },
  ];

  const UpdateButton = ({ institution }: { institution: Institution }) => {
    const [showModal, setShowModal] = useState(false);

    const [nameInput, setNameInput] = useState(institution.institutionName);
    const [domainInput, setDomainInput] = useState(institution.domain);
    const [secondaryDomainInput, setSecondaryDomainInput] = useState(
      institution.secondaryDomain
    );

    const {
      call: updateInstitution,
      isLoading,
      error,
    } = useApi(institutionService.updateInstitution);

    useEffect(() => {
      setNameInput(institution.institutionName);
      setDomainInput(institution.domain);
      setSecondaryDomainInput(institution.secondaryDomain);
    }, [showModal]);

    const handleSumbit = async (e?: FormEvent<HTMLFormElement>) => {
      try {
        if (e) {
          e.preventDefault();
          e.currentTarget.reportValidity();
          if (!e.currentTarget.checkValidity()) {
            e.currentTarget.reportValidity();
            return;
          }
        }
        await updateInstitution(institution._id!, getUserToken(), {
          institutionName: nameInput,
          domain: domainInput,
          secondaryDomain: secondaryDomainInput,
        });

        mutate();
        setShowModal(false);
        addNotification("Instituição atualizada com sucesso !");
      } catch (err) {
        toast.error(String(err));
        console.error(err);
      }
    };

    const handleClose = () => {
      setNameInput("");
      setDomainInput("");
      setSecondaryDomainInput("");

      setShowModal(false);
    };

    return (
      <>
        <button
          className="btn btn-circle bg-primary hover:bg-cyan-900 border-transparent"
          onClick={() => setShowModal(true)}>
          <MdCreate />
        </button>

        {showModal && (
          <GenericModalComponent
            onConfirm={(e) => handleSumbit(e)}
            onClose={handleClose}
            isVisible={showModal}
            title="Update Instituições"
            confirmBtnText="Atualizar"
            loading={isLoading}
            children={
              <form className="form-control flex flex-col space-y-4">
                <div className="flex flex-col space-y-2">
                  <label>
                    <span>Nome da Instituição</span>
                  </label>
                  <input
                    type="text"
                    name="institution-name"
                    required
                    placeholder="Instituição"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="input"
                  />

                  <label>
                    <span>Domínio</span>
                  </label>
                  <input
                    type="text"
                    name="domain"
                    required
                    pattern="@([\w\-]+\.)+[\w\-]{2,4}"
                    title="@domain.com"
                    placeholder="@domain.com"
                    value={domainInput}
                    onChange={(e) => setDomainInput(e.target.value)}
                    className="input"
                  />

                  <label>
                    <span>Segundo Domínio</span>
                  </label>
                  <input
                    type="text"
                    name="secondary-domain"
                    placeholder="@domain.com (opcional)"
                    title="@domain.com (opcional)"
                    pattern="@([\w\-]+\.)+[\w\-]{2,4}$"
                    value={secondaryDomainInput}
                    onChange={(e) => setSecondaryDomainInput(e.target.value)}
                    className="input"
                  />
                </div>
              </form>
            }
          />
        )}
      </>
    );
  };

  const DeleteButton = ({ institutionId }: { institutionId: string }) => {
    const [showModal, setShowModal] = useState(false);
    const {
      call: deleteInstitution,
      isLoading,
      error,
    } = useApi(institutionService.deleteInstitution);

    const handleConfirm = async () => {
      try {
        await deleteInstitution(institutionId, getUserToken());
        mutate();
        addNotification("Instituição deletada com sucesso !");
      } catch (err) {
        toast.error(err as string);
        console.error(err);
      }
    };

    return (
      <>
        <button
          className="btn btn-circle bg-primary hover:bg-cyan-900 border-transparent"
          onClick={() => setShowModal(true)}>
          <MdDelete />
        </button>
        {showModal && (
          <GenericModalComponent
            onConfirm={handleConfirm}
            onClose={() => setShowModal(false)}
            isVisible={showModal}
            confirmBtnText="Deletar"
            loading={isLoading}
            title="Deletando usuário"
            contentText="Você tem certeza de que deseja excluir este Instituições?"
            width="w-[600px]"
          />
        )}
      </>
    );
  };

  return (
    <div className="container mx-auto flex flex-col overflow-hidden gap-6">
      <div className="flex flex-wrap justify-end gap-2">
        <select className="select select-bordered">
          <option value="most-recent">Mais recentes</option>
        </select>
        <div className="flex flex-row">
          <input
            className="input input-bordered"
            type="text"
            placeholder="Buscar usuário"
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <div className="flex flex-col justify-center">
            <MdSearch className="-ml-6" />
          </div>
        </div>
        <AddInstitutionButton />
      </div>

      <table className="table w-full">
        <thead>
          <tr className="border-b-4 border-primary text-primary">
            {columnNames.map((columnName, key) => (
              <th
                scope="col"
                className={`text-sm bg-transparent ${columnName.width}`}
                key={`${columnName.name}-${key}`}>
                {columnName.name}
              </th>
            ))}
            {/* ACTION BUTTONS */}
            <th scope="col" className="bg-transparent basis-1/6" />
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((institution, key: number) => {
            return (
              <tr key={key} className="border-b-2">
                <td>
                  <p>{institution.institutionName}</p>
                </td>
                <td>
                  <p>{institution.domain}</p>
                </td>
                <td>
                  <p>{institution.secondaryDomain}</p>
                </td>
                <td>
                  <div className="flex flex-wrap justify-end gap-2">
                    <IconContext.Provider value={{ size: "20" }}>
                      <div>
                        <UpdateButton institution={institution} />
                      </div>
                      <div>
                        <DeleteButton institutionId={institution._id!} />
                      </div>
                    </IconContext.Provider>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="flex flex-row space-x-8 justify-end">
        <div className="flex items-center">
          <span className="text-gray-600">Rows per page:</span>
          <div>
            <select
              className="select"
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={50}>50</option>
            </select>
          </div>
          <span className="text-gray-600">
            {startItem} - {endItem} of {filteredData.length}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <IconContext.Provider value={{ size: "20" }}>
            <button
              type="button"
              disabled={currentPage === 1}
              className={`${
                currentPage === 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-600 hover:bg-gray-100 cursor-pointer"
              }`}
              onClick={handleFirstPage}>
              <GoArrowLeft />
            </button>
            <button
              type="button"
              className={`${
                currentPage === 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-600 hover:bg-gray-100 cursor-pointer"
              }`}
              onClick={() => handlePageChange(currentPage - 1)}>
              <GoChevronLeft />
            </button>
            <button
              type="button"
              className={`${
                currentPage === totalPages
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-600 hover:bg-gray-100 cursor-pointer"
              }`}
              onClick={() => handlePageChange(currentPage + 1)}>
              <GoChevronRight />
            </button>
            <button
              type="button"
              className={`${
                currentPage === totalPages
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-600 hover:bg-gray-100 cursor-pointer"
              }`}
              onClick={handleLastPage}>
              <GoArrowRight />
            </button>
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
};
