import increaseLevel from "@iconify/icons-carbon/increase-level";
import locationIcon from "@iconify/icons-carbon/location";
import moneyIcon from "@iconify/icons-carbon/money";
import starIcon from "@iconify/icons-carbon/star";
import learnIcone from "@iconify/icons-dashicons/welcome-learn-more";
import { Card, Divider, Grid, Link, Stack, Typography } from "@mui/material";

import Iconify from "@/components/Iconify";
import StudyLevel from "@/components/StudyLevel";
import TextIconLabel from "@/components/TextIconLabel";
import { Record } from "@/interfaces";
import Routes from "@/routes";

type Props = {
  record: Record;
};

const HomeItem = ({ record }: Props) => {
  const { job, salary, city, company, note, study_level, experience, createdAt, jobRef, companyRef } = record;

  return (
    <Card>
      <Stack sx={{ p: 3, pb: 0 }}>
        <Stack spacing={0.5}>
          <Link variant="h6" href={Routes.job.detail(jobRef.id)}>
            {job}
          </Link>

          <Link variant="body2" href={Routes.company.detail(companyRef.id)} sx={{ color: "secondary.main" }}>
            {company}
          </Link>

          <TextIconLabel
            icon={<Iconify icon={locationIcon} sx={{ mr: 0.5, width: 18, height: 18 }} />}
            value={city}
            sx={{ typography: "body3", color: "text.secondary" }}
          />
        </Stack>

        <Typography variant="caption" sx={{ color: "text.disabled" }}>
          {createdAt.toDate().toLocaleDateString()}
        </Typography>
      </Stack>

      <Divider sx={{ borderStyle: "dashed", my: 2 }} />

      <Grid
        container
        spacing={1.5}
        sx={{
          p: 3,
          pt: 0,
          typography: "body3",
          color: "text.secondary",
          textTransform: "capitalize",
        }}
      >
        <Grid item xs={6}>
          <TextIconLabel
            sx={{ textTransform: "none" }}
            icon={<Iconify icon={increaseLevel} sx={{ width: 20, height: 20, mr: 1 }} />}
            value={`${experience} an(s) xp`}
          />
        </Grid>

        <Grid item xs={6}>
          <TextIconLabel
            icon={<Iconify icon={starIcon} sx={{ width: 20, height: 20, mr: 1 }} />}
            value={<span>{note}/5</span>}
          />
        </Grid>

        <Grid item xs={6}>
          <TextIconLabel
            icon={<Iconify icon={moneyIcon} sx={{ width: 20, height: 20, mr: 1 }} />}
            value={<span>{salary} €</span>}
          />
        </Grid>

        <Grid item xs={6}>
          <TextIconLabel
            sx={{ textTransform: "none" }}
            icon={<Iconify icon={learnIcone} sx={{ width: 20, height: 20, mr: 1 }} />}
            value={<StudyLevel index={study_level} />}
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export default HomeItem;
