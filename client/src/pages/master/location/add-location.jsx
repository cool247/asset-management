import { FormProvider, RHFTextField } from "../../../components/hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Grid } from "@mui/material";
import FormWrapper from "../../../components/FormWrapper";
import { useMutation } from "@tanstack/react-query";
import { addUpdatLocation } from "../../../mutations";
import { useSnackbar } from "notistack";
import { useEffect } from "react";

const defaultValues = {
  name: "",
  description: "",
};
const schema = Yup.object().shape({
  name: Yup.string().trim().required("Required"),
});
export default function AddLocation({ onClose, isEditMode, row, refetch }) {
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const { handleSubmit, reset } = methods;

  const mutation = useMutation({
    mutationFn: async formData => {
      return addUpdatLocation(formData, row?.id);
    },
    onSuccess: () => {
      enqueueSnackbar("Successfully Added ", { variant: "success" });
      refetch();
      onClose();
    },
    onError: () => {
      enqueueSnackbar("Failed to add", { variant: "error" });
    },
  });
  const onSubmit = data => {
    mutation.mutate(data);
  };
  useEffect(() => {
    if (isEditMode) {
      reset({
        ...row,
      });
    }
  }, [row, isEditMode]);
  return (
    <FormWrapper
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => {
        reset();
      }}
      loading={mutation.isPending}
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
