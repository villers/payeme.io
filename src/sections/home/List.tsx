import { Box } from "@mui/material";
import { InfiniteData } from "@tanstack/query-core/build/lib/types";

import JobItemSkeleton from "@/components/skeleton/JobItem";
import { Record } from "@/interfaces";
import HomeItem from "@/sections/home/Item";

type Pros = {
  pageJobs: Record[][];
  loading: boolean;
};

const HomeList = ({ pageJobs, loading }: Pros) => {
  return (
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
      {loading && [...Array(6)].map((job, index) => <JobItemSkeleton key={index} />)}
      {!loading &&
        pageJobs.map((pages, index) => pages.map((record, index) => <HomeItem key={record.id} record={record} />))}
    </Box>
  );
};

export default HomeList;
