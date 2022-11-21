import { Typography } from "@mui/material";

import { Company } from "@/interfaces";

type Props = {
  company: Company;
  companyCount: number;
  avgSalary: number;
};

const CompanyDetail = ({ company, avgSalary, companyCount }: Props) => {
  return (
    <section>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Salaires de l'entreprise {company.name}
      </Typography>

      <Typography variant="h4" sx={{ mb: 3 }}>
        Le salaires moyen est de {avgSalary.toFixed(1)}
      </Typography>
      <Typography variant="h4" sx={{ mb: 3 }}>
        {companyCount} salaires
      </Typography>
    </section>
  );
};

export default CompanyDetail;
