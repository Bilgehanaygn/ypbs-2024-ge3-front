import * as React from "react";
import { Button, Card, Box } from "@mui/material";
import BasicSelect from "../custom-input/CustomInput";

const LoginPage: React.FC = () => {
  const unitsEndpoint = "/api/dummy/units";

  return (
    <>
      <Card>1231</Card>
      <BasicSelect endpoint={unitsEndpoint} />
    </>
  );
};

export default LoginPage;
