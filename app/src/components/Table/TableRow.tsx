import { ReactElement } from "react";

import { HeaderContext } from "./contexts";
import { TableCellInterface } from "./TableCell";

interface TableRowInterface {
  isHeaderRow?: boolean;
  cells: ReactElement<TableCellInterface>[];
}

export const TableRow = ({ isHeaderRow = false, cells }: TableRowInterface) => {
  const headerRowStyling = "border-b-4 border-primary text-primary";
  const regularRowStyling = "border-b-2";
  const rowStyling = isHeaderRow ? headerRowStyling : regularRowStyling;

  return (
    <tr className={rowStyling}>
      <HeaderContext.Provider value={isHeaderRow}>
        {cells}
      </HeaderContext.Provider>
    </tr>
  );
};
