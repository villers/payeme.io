import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import StudyLevel from "@/components/StudyLevel";
import { Record } from "@/interfaces";

const columns: GridColDef[] = [
  { field: "city", headerName: "Ville", width: 130 },
  { field: "company", headerName: "Entreprise", width: 200 },
  { field: "job", headerName: "Metier", width: 200 },
  { field: "salary", headerName: "Rémunération", width: 200, type: "number" },
  { field: "experience", headerName: "Experience", width: 150, type: "number" },
  {
    field: "study_level",
    headerName: "Niveau d'étude",
    width: 130,
    renderCell: (params: GridRenderCellParams<Date>) => <StudyLevel index={params.row[params.field]} />,
  },
  { field: "note", headerName: "Note", width: 100, type: "number" },
];

type Props = {
  data: Record[];
};

const JobDetail = ({ data }: Props) => {
  return (
    <div style={{ height: "50vh", width: "100%" }}>
      <DataGrid rows={data} columns={columns} />
    </div>
  );
};

export default JobDetail;
