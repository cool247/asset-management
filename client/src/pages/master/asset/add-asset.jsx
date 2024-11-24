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
import { addUpdatAsset } from "../../../mutations";
import { useSnackbar } from "notistack";
import { useGetRackCupBoard } from "../../../api-hook";

const defaultValues = {
  assetTypeId: "",
  type: "",
  vendor: "",
  capacity: "",
  rackAndCupboardBardCodeId: "",
  barcodeId: "",
  location: "",
  partNo: "",
  name: "",
  description: "",
  totalQty: "",
};
const DEFAULT_ASSET = [
  { name: "Pen-drive", id: 1 },
  { name: "Laptop", id: 2 },
];
const schema = Yup.object().shape({
  name: Yup.string().trim().required("Required"),
  rackAndCupboardBardCodeId: Yup.string().trim().required("Required"),
  // location: Yup.string().trim().required("Required"),
  totalQty: Yup.string().trim().required("Required"),
  partNo: Yup.string().trim().required("Required"),
  assetTypeId: Yup.string().trim().required("Required"),
  barcodeId: Yup.string().trim().required("Required"),
});
export default function AddAsset({ onClose, isEditMode, row, refetch }) {
  const { enqueueSnackbar } = useSnackbar();
  const { data } = useGetRackCupBoard();
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;
  const mutation = useMutation({
    mutationFn: async formData => {
      return addUpdatAsset(formData, row?.id);
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
    console.log(data);
    mutation.mutate({
      ...data,
      assetTypeId: +data.assetTypeId,
      totalQty: +data.totalQty,
    });
  };
  useEffect(() => {
    if (isEditMode) {
      reset({ ...row });
    }
  }, []);
  console.log(errors, "errors");
  return (
    <FormWrapper
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => {
        reset();
      }}
      loading={mutation.isPending}
      maxWidth={"md"}
      fullWidth
      isEditMode={isEditMode}
      title={isEditMode ? "Update Asset" : "Add Asset"}
    >
      {" "}
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={4}>
            <RHFSelect
              name={"assetTypeId"}
              label={"Asset Type"}
              required
              native={false}
            >
              <MenuItem value="">Select Type</MenuItem>
              {DEFAULT_ASSET.map((el, index) => (
                <MenuItem value={el.id} key={index}>
                  {el.name}
                </MenuItem>
              ))}
            </RHFSelect>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <RHFTextField
              name={"name"}
              label={"Asset Name"}
              placeholder="Enter Asset Name"
              required
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <RHFTextField
              name={"partNo"}
              label={"Part No."}
              placeholder="Enter Part Name"
              required
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <RHFTextField
              name={"capacity"}
              label={"Capacity"}
              placeholder="Enter Capacity"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <RHFTextField
              name={"vendor"}
              label={"Vendor"}
              placeholder="Enter Vendor"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <RHFTextField
              name={"barcodeId"}
              label={"Barcode"}
              placeholder="Enter Barcode"
              required
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <RHFTextField
              name={"totalQty"}
              label={"Quantity"}
              placeholder="Enter Quantity"
              required
            />
          </Grid>

          {/* <Grid item xs={12} sm={12} md={4}>
            <RHFSelect name={"location"} label={"Select location"} required>
              <MenuItem value="">Select Location</MenuItem>
            </RHFSelect>
          </Grid> */}

          <Grid item xs={12} sm={12} md={4}>
            <RHFSelect name={"type"} label={"Select Type"} required>
              <MenuItem value="Rack">Rack</MenuItem>
              <MenuItem value="Cupboard">Cupboard</MenuItem>
            </RHFSelect>
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <RHFSelect
              name={"rackAndCupboardBardCodeId"}
              label={"Select Rack/Cupboard"}
              required
            >
              <MenuItem value="">Select Rack/Cupboard</MenuItem>
              {data &&
                data.map(el => (
                  <MenuItem value={el.name} key={el.id}>
                    {el.name}
                  </MenuItem>
                ))}
            </RHFSelect>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <RHFTextField
              name={"description"}
              label={"Description"}
              placeholder="Enter Description"
            />
          </Grid>
        </Grid>
      </FormProvider>
    </FormWrapper>
  );
}
