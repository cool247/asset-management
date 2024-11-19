import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from "../../../components/hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button, Grid, MenuItem, Stack } from "@mui/material";
import FormWrapper from "../../../components/FormWrapper";

const defaultValues = {
  row: "",
  type: "",
  name: "",
  description: "",
  barCodeId: "",
};
const schema = Yup.object().shape({
  name: Yup.string().trim().required("Required"),
  row: Yup.string().trim().required("Required"),
  type: Yup.string().trim().required("Required"),
  barCodeId: Yup.string().trim().required("Required"),
});
export default function AddRackCupboard({ onClose, isEditMode }) {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const { handleSubmit, reset, watch } = methods;

  const onSubmit = data => {
    console.log(data);
  };
  return (
    <FormWrapper
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => {
        reset();
      }}
      loading={false}
      maxWidth={"sm"}
      fullWidth
      isEditMode={isEditMode}
      title={isEditMode ? "Update Location" : "Add Location"}
    >
      {" "}
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <RHFSelect name={"row"} label={"Select Row"} required>
              <MenuItem value="">Select Row</MenuItem>
            </RHFSelect>
          </Grid>

          <Grid item xs={6}>
            <RHFSelect name={"type"} label={"Select Type"} required>
              <MenuItem value="Rack">Rack</MenuItem>
              <MenuItem value="Cupboard">Cupboard</MenuItem>
            </RHFSelect>
          </Grid>
          <Grid item xs={6}>
            <RHFTextField
              name={"name"}
              label={watch("row") === "Rack" ? "Rack" : "Cupboard"}
            />
          </Grid>
          <Grid item xs={6}>
            <RHFTextField name={"descriptiion"} label={"Description"} />
          </Grid>
          <Grid item xs={12}>
            <Stack direction={"row"} gap={2} alignItems={"center"}>
              <RHFTextField name={"barCodeId"} label={"Barcode"} />
              <Button variant="contained" color="secondary" size="large">
                Scacn
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>
    </FormWrapper>
  );
}
