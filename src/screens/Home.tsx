import { Button, Container, Pagination } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import Page from "@/components/Page";
import { Record } from "@/interfaces";
import HomeFilters, { form } from "@/sections/home/Filter";
import HomeList from "@/sections/home/List";
import { RecordsService } from "@/services/firebase/database";

const ScreenHome = () => {
  const [filters, setFilters] = useState<form>({
    job: "",
    city: "",
    company: "",
  });

  const { data, isError, isLoading, error, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<
    Record[],
    Error
  >(
    ["records"],
    (query) => {
      return RecordsService.getAll(filters, query.pageParam);
    },
    {
      getNextPageParam: (records, pages) => {
        if (records.length > 0) {
          return records[records.length - 1].doc;
        }
        return false;
      },
    }
  );

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  useEffect(() => {
    refetch();
  }, [filters]);

  const pageJobs: Record[][] | never[] = data?.pages || [];

  return (
    <Page title="Jobs - Career">
      <Container>
        <HomeFilters setFilters={setFilters} />
        <HomeList pageJobs={pageJobs} loading={isLoading} />
        {hasNextPage && (
          <Button
            variant="contained"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            sx={{
              mt: 5,
              "& .MuiPagination-ul": {
                justifyContent: "center",
              },
            }}
          >
            {isFetchingNextPage ? "Chargement..." : "Charger plus"}
          </Button>
        )}
      </Container>
    </Page>
  );
};

export default ScreenHome;
