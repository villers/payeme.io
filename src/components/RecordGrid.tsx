import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import ContractType from "@/components/Contact";
import GenreType from "@/components/Genre";
import StudyLevel from "@/components/StudyLevel";
import { Record } from "@/interfaces";

const columns: GridColDef[] = [
  { field: "city", headerName: "Ville", width: 130 },
  { field: "company", headerName: "Entreprise", width: 200 },
  { field: "job", headerName: "Metier", width: 200 },
  {
    field: "gender",
    headerName: "Genre",
    width: 100,
    renderCell: (params: GridRenderCellParams<Date>) => <GenreType index={params.row[params.field]} />,
  },
  { field: "salary", headerName: "Rémunération", width: 80, type: "number" },
  {
    field: "contract",
    headerName: "Contract",
    width: 80,
    type: "string",
    renderCell: (params: GridRenderCellParams) => <ContractType index={params.row[params.field]} type="type" />,
  },
  { field: "experience", headerName: "Experience", width: 100, type: "number" },
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
