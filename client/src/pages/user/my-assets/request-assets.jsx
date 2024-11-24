import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from "../../../components/hook-form";
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
import jwtDecode from "jwt-decode";

const defaultValues = {
  assetId: "",
  userRemarks: "",
};
const schema = Yup.object().shape({
  assetId: Yup.number()
    .positive("Asset ID must be positive")
    .required("Required"),
  // qty: Yup.number().positive("User ID must be positive").required("Required"),
  userRemarks: Yup.string()
    .max(255, "Comments must not exceed 255 characters")
    .optional(),
});
export default function CreateAssetsRequest({
  onClose,
  isEditMode,
  row,
  refetch,
}) {
  const { data } = useGetAssets();
  const { enqueueSnackbar } = useSnackbar();
  const token = localStorage.getItem("accessToken");
  const parseUser = jwtDecode(token);
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const { handleSubmit, reset } = methods;

  const mutation = useMutation({
    mutationFn: async formData => {
      return createAsstReq(formData, row?.id);
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
    mutation.mutate({ ...data, userId: parseUser.id });
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
      title={isEditMode ? "Update Request" : "Raise a Request"}
    >
      {" "}
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RHFSelect name={"assetId"} label={"Select Asset"} required>
              {data &&
                data.map(el => (
                  <MenuItem value={el.id} key={el.id}>
                    {el.name}
                  </MenuItem>
                ))}
            </RHFSelect>
          </Grid>
          <Grid item xs={12}>
            <RHFTextField name={"userRemarks"} label={"Remarks"} />
          </Grid>
        </Grid>
      </FormProvider>
    </FormWrapper>
  );
}
