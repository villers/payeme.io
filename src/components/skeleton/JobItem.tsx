import { Box, Card, Divider, Skeleton, Stack } from "@mui/material";

const JobItemSkeleton = ({ ...other }) => {
  return (
    <Card {...other}>
      <Stack spacing={2} sx={{ p: 3 }}>
        {[...Array(4)].map((_, index) => (
          <Skeleton
            key={index}
            variant="text"
            sx={{
              height: 20 - index * 2,
              width: (5 - index) * 50,
            }}
          />
        ))}
      </Stack>

      <Divider sx={{ borderStyle: "dashed" }} />

      <Box
        sx={{
          p: 3,
          display: "grid",
          gap: 3,
          gridTemplateColumns: "repeat(2, 1fr)",
        }}
      >
        {[...Array(4)].map((_, index) => (
          <Skeleton key={index} variant="rectangular" sx={{ width: 1, height: 20, borderRadius: 0.5 }} />
        ))}
      </Box>
    </Card>
  );
};

export default JobItemSkeleton;
