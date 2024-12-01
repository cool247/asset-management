import { FormProvider, RHFSelect, RHFTextField } from "../../../components/hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Grid, MenuItem } from "@mui/material";
import FormWrapper from "../../../components/FormWrapper";
import { useMutation } from "@tanstack/react-query";
import { createAsstReq } from "../../../mutations";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useGetAssets } from "../../../api-hook";

const defaultValues = {
  assetId: null,
  userRemarks: "",
};
const schema = Yup.object().shape({
  assetId: Yup.number().nullable().positive("Asset ID must be positive").required("Required"),
  requestedRemarks: Yup.string().max(255, "Comments must not exceed 255 characters").optional(),
  requestedQuantity:Yup.number().nullable().positive("must be positive").required("Required")
});
export default function CreateAssetsRequest({ onClose, isEditMode, row, refetch }) {
  const { data } = useGetAssets();
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const { handleSubmit, reset } = methods;
  const mutation = useMutation({
    mutationFn: async (formData) => {
      return createAsstReq(formData, row?.id);
    },
    onSuccess: () => {
      enqueueSnackbar(`Successfully submitted Request`, {
        variant: "success",
      });
      refetch();
      onClose();
    },
    onError: () => {
      enqueueSnackbar(`Failed to ${isEditMode ? "update" : "add"} `, {
        variant: "error",
      });
    },
  });
  const onSubmit = (data) => {
    mutation.mutate(data );
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
      title={isEditMode ? "Update Request" : "Create New Request"}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <RHFSelect name={"assetId"} label={"Select Asset"} required>
              {data?.map((el) => (
                <MenuItem value={el.id} key={el.id}>
                  {el.name}
                </MenuItem>
              ))}
            </RHFSelect>
          </Grid>
          <Grid item xs={6}>
            <RHFTextField type='number' name={"requestedQuantity"} label={"Request Quantity"} />
          </Grid>
          <Grid item xs={12}>
            <RHFTextField name={"requestedRemarks"} label={"Remarks"} />
          </Grid>
        </Grid>
      </FormProvider>
    </FormWrapper>
  );
}
