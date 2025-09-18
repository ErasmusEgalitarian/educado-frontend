import { Icon } from "@mdi/react";

interface CertificateFieldProps {
  children: React.ReactNode;
  icon?: string;
  className?: string;
}

const CertificateField = ({
  children,
  icon,
  className,
}: Readonly<CertificateFieldProps>) => {
  return (
    <div className={className ?? ""}>
      <div className="flex flex-row">
        {icon != null && <Icon path={icon} className="w-6 mr-1 inline-block" />}
        {children}
      </div>
    </div>
  );
};

export default CertificateField;
