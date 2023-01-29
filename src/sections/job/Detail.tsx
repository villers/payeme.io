import { Typography } from "@mui/material";

import { Job } from "@/interfaces";

type Props = {
  job: Job;
  avgSalary: number;
  avgTJM: number;
};

const JobDetail = ({ job, avgSalary, avgTJM }: Props) => {
  return (
    <section>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Salaires d'un {job.name}
      </Typography>

      <Typography variant="h4" sx={{ mb: 3 }}>
        Le salaires moyen est de {avgSalary.toFixed(1)} €
      </Typography>

      <Typography variant="h4" sx={{ mb: 3 }}>
        Le TJM moyen est de {avgTJM.toFixed(1)} €
      </Typography>
    </section>
  );
};

export default JobDetail;
