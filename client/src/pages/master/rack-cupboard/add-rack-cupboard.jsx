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
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { addUpdatRackCupBoard } from "../../../mutations";
import { useSnackbar } from "notistack";
import { useGetRows } from "../../../api-hook";

const defaultValues = {
  rowId: "",
  type: "",
  name: "",
  description: "",
  barcodeId: "011444555",
};
const schema = Yup.object().shape({
  name: Yup.string().trim().required("Required"),
  rowId: Yup.string().trim().required("Required"),
  type: Yup.string().trim().required("Required"),
  barcodeId: Yup.string().trim().required("Required"),
});
export default function AddRackCupboard({ onClose, isEditMode, row, refetch }) {
  const { enqueueSnackbar } = useSnackbar();
  const { data } = useGetRows();
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const { handleSubmit, reset, watch } = methods;

  const mutation = useMutation({
    mutationFn: async formData => {
      return addUpdatRackCupBoard(formData, row?.id);
    },
    onSuccess: () => {
      enqueueSnackbar(`Successfully ${isEditMode ? "Updated" : "Added"}`, {
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

  const onSubmit = data => {
    console.log(data);
    mutation.mutate({
      ...data,
      rowId: +data.rowId,
    });
  };
  useEffect(() => {
    if (isEditMode) {
      reset({ ...row });
    }
  }, [row]);
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
      title={isEditMode ? "Update Rack/Cupboard" : "Add Rack/Cupboard"}
    >
      {" "}
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <RHFSelect name={"rowId"} label={"Select Row"} required>
              <MenuItem value="">Select Row</MenuItem>
              {data &&
                data.map(el => (
                  <MenuItem value={el.id} key={el.id}>
                    {el.name}
                  </MenuItem>
                ))}
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
              label={watch("type") === "Rack" ? "Rack Name" : "Cupboard Name"}
            />
          </Grid>
          <Grid item xs={6}>
            <RHFTextField name={"description"} label={"Description"} />
          </Grid>
          <Grid item xs={12}>
            <RHFTextField name={"barcodeId"} label={"Barcode"} />
          </Grid>
        </Grid>
      </FormProvider>
    </FormWrapper>
  );
}
