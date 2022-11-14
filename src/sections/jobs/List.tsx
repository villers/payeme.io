import { Box, Pagination } from "@mui/material";

import JobItemSkeleton from "@/components/skeleton/JobItem";
import { Record } from "@/interfaces";
import CareerJobItem from "@/sections/jobs/Item";

type Pros = {
  jobs: Record[];
  loading: boolean;
};

const CareerJobList = ({ jobs, loading }: Pros) => {
  return (
    <>
      <Box
        sx={{
          display: "grid",
          rowGap: { xs: 4, md: 5 },
          columnGap: 4,
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
        }}
      >
        {(loading ? [...Array(6)] : jobs).map((job, index) =>
          job ? <CareerJobItem key={job.id} record={job} /> : <JobItemSkeleton key={index} />
        )}
      </Box>

      <Pagination
        count={10}
        color="primary"
        size="large"
        sx={{
          pt: 10,
          pb: { xs: 10, md: 15 },
          "& .MuiPagination-ul": {
            justifyContent: "center",
          },
        }}
      />
    </>
  );
};

export default CareerJobList;
