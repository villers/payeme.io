import { Container } from "@mui/material";

import Page from "@/components/Page";
import RecordForm from "@/sections/record/Form";

const ScreenRecordCreate = () => {
  return (
    <Page title="Ajouter un métier">
      <Container maxWidth="sm" sx={{ marginY: 3 }}>
        <RecordForm />
      </Container>
    </Page>
  );
};

export default ScreenRecordCreate;
