import { Typography } from "@mui/material";

import { Job } from "@/interfaces";

type Props = {
  job: Job;
  jobCount: number;
  avgSalary: number;
};

const JobDetail = ({ job, avgSalary, jobCount }: Props) => {
  return (
    <section>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Salaires d'un {job.name}
      </Typography>

      <Typography variant="h4" sx={{ mb: 3 }}>
        Le salaires moyen est de {avgSalary.toFixed(1)}
      </Typography>
      <Typography variant="h4" sx={{ mb: 3 }}>
        {jobCount} salaires
      </Typography>
    </section>
  );
};

export default JobDetail;
