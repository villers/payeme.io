import { Container } from "@mui/material";

import Page from "@/components/Page";
import ReCaptchaProvider from "@/components/Recaptcha/RecaptchaProvider";
import RecordForm from "@/sections/record/Form";

const ScreenRecordCreate = () => {
  return (
    <ReCaptchaProvider>
      <Page title="Partager mon salaire">
        <Container maxWidth="sm" sx={{ marginY: 3 }}>
          <RecordForm />
        </Container>
      </Page>
    </ReCaptchaProvider>
  );
};

export default ScreenRecordCreate;
