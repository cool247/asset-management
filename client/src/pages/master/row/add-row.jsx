import { FormProvider, RHFTextField } from "../../../components/hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Grid } from "@mui/material";
import FormWrapper from "../../../components/FormWrapper";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { addUpdateRow } from "../../../mutations";
import { useEffect } from "react";
const defaultValues = {
  name: "",
  description: "",
};
const schema = Yup.object().shape({
  name: Yup.string().trim().required("Required"),
});
export default function AddRow({ onClose, isEditMode, refetch, row }) {
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const { handleSubmit, reset } = methods;

  const mutation = useMutation({
    mutationFn: async formData => {
      return addUpdateRow(formData, row?.id);
    },
    onSuccess: () => {
      enqueueSnackbar("Successfully Added Row", { variant: "success" });
      refetch();
      onClose();
    },
    onError: () => {
      enqueueSnackbar("Failed to add", { variant: "error" });
    },
  });
  useEffect(() => {
    if (isEditMode) {
      reset({ ...row });
    }
  }, [row]);
  const onSubmit = data => {
    mutation.mutate(data);
  };
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
      title={isEditMode ? "Update Row" : "Add Row"}
    >
      {" "}
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RHFTextField name={"name"} label={"Row Name"} required />
          </Grid>
          <Grid item xs={12}>
            <RHFTextField name={"description"} label={"Row Description"} />
          </Grid>
        </Grid>
      </FormProvider>
    </FormWrapper>
  );
}
