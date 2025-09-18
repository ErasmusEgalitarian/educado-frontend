import { useEffect, useState } from "react";

import EmptyImg from "@assets/no-courses.png";
import { getUserCertificates } from "@certificates/api/certificate-queries";
import { Certificate } from "@certificates/types/certificate-types";
import Layout from "@common/layout/Layout";

import CertificateCard from "./certificate-card";
import EmptyState from "./certificate-empty";

export default function Certificates() {
  const [certificates, setCertificates] = useState<Certificate[]>();

  useEffect(() => {
    const storedId = localStorage.getItem("id");
    const userId = storedId ?? "";
    getUserCertificates(userId)
      .then((res: Certificate[]) => {
        setCertificates(res);
      })
      .catch(() => {
        setCertificates([]);
      });
  }, []);

  return (
    <Layout meta="Certificates">
      <div className="h-[93%] align-self-center lg:px-20 xl:px-40">
        <div className="m-8 p-8 pb-0 bg-white rounded-xl overflow-hidden h-full">
          {certificates && certificates.length > 0 ? (
            <div
              className="overflow-scroll min-h-full pb-4"
              id="certificate-list"
            >
              {certificates.length > 0 ? (
                <>
                  <div className="w-full">
                    <h1 className="text-3xl font-semibold">Certificados</h1>
                    <p className="text-grayMedium">
                      Você tem {certificates.length} certificados.
                    </p>
                  </div>
                  {certificates.map((certificate: Certificate, key: number) => (
                    <CertificateCard
                      certificate={certificate}
                      key={certificate.course._id}
                      num={key}
                    />
                  ))}
                </>
              ) : (
                // If the user has no courses, display this 'empty state'
                <div className="grid place-content-center w-full h-full text-center">
                  <div
                    className="md:mx-40 xl:mx-64"
                    id="no-certificates-message"
                  >
                    <img src={EmptyImg} className="w-full" />
                    <h1 className="te	xt-xl font-bold my-4">Comece agora</h1>
                    {/* It appears you haven't created any courses yet.
					Click the button below to see your course page. */}
                    <p>
                      Parece que você ainda não criou nenhum curso. Clique no
                      botão abaixo para acessar sua página de cursos.
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </Layout>
  );
}
