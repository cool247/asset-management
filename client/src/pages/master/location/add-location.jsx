import { FormProvider, RHFTextField } from "../../../components/hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Grid } from "@mui/material";
import FormWrapper from "../../../components/FormWrapper";

const defaultValues = {
  name: "",
  description: "",
};
const schema = Yup.object().shape({
  name: Yup.string().trim().required("Required"),
});
export default function AddLocation({ onClose, isEditMode }) {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const { handleSubmit, reset } = methods;

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
      maxWidth={"xs"}
      fullWidth
      isEditMode={isEditMode}
      title={isEditMode ? "Update Location" : "Add Location"}
    >
      {" "}
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RHFTextField name={"name"} label={"Location Name"} required />
          </Grid>
          <Grid item xs={12}>
            <RHFTextField name={"description"} label={"Description"} />
          </Grid>
        </Grid>
      </FormProvider>
    </FormWrapper>
  );
}
