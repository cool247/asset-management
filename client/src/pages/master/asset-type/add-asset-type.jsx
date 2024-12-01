import * as Yup from "yup";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Box,
  IconButton,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
//
import {
  FormProvider,
  RHFRadioGroup,
  RHFSelect,
  RHFTextField,
} from "../../../components/hook-form";
import FormWrapper from "../../../components/FormWrapper";
import { addUpdateAssetType } from "../../../mutations";
import { Add } from "@mui/icons-material";

const DATA_TYPE = ["String", "Number", "Boolean"];

const defaultValues = {
  name: "",
  properties: [
    {
      name: "",
      dataType: "",
      isRequired: "",
    },
  ],
};

const schema = Yup.object().shape({
  name: Yup.string().required(),
  properties: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Required"),
        dataType: Yup.string().required("Required"),
        isRequired: Yup.string().required("Required"),
      })
    )
    .min(1)
    .required(),
});

export default function AddAssetType({
  onClose,
  isEditMode,
  row,
  refetch,
  assetTypeId,
}) {
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = methods;

  const { append, remove, fields } = useFieldArray({
    name: "properties",
    control,
  });

  const mutation = useMutation({
    mutationFn: async formData => {
      return addUpdateAssetType(formData, row?.id);
    },
    onSuccess: () => {
      enqueueSnackbar(`Successfully ${isEditMode ? "Updated" : "Added"}  `, {
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
      name: data.name,
      properties: data.properties.map(p => ({
        ...p,
        isRequired: p.isRequired === "true",
      })),
    });
  };
  useEffect(() => {
    if (isEditMode) {
      reset({ ...row });
    }
  }, []);

  console.log(errors, "errors", fields);
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
      title={isEditMode ? "Update Asset Type" : "Add Asset Type"}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <RHFTextField
            name={"name"}
            label={"Asset Type Name"}
            fullWidth={false}
            placeholder="Enter Asset Type Name"
            required
          />
        </Box>

        <Typography
          style={{ marginBlock: 8 }}
          align="center"
          variant="h6"
          color="text.secondary"
        >
          {" "}
          Enter Property Details
        </Typography>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name *</TableCell>
              <TableCell width={"220px"}>Data Type *</TableCell>
              <TableCell>Is Required *</TableCell>
              <TableCell>
                <IconButton
                  size="small"
                  onClick={() =>
                    append({ name: "", dataType: "", isRequired: "" })
                  }
                >
                  <Add />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fields.map((item, index) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>
                    <RHFTextField
                      name={`properties[${index}].name`}
                      required
                      placeholder="Enter Property Name"
                    />
                  </TableCell>
                  <TableCell>
                    <RHFSelect name={`properties[${index}].dataType`} required>
                      <MenuItem value="" disabled>
                        Select Data Type
                      </MenuItem>
                      {DATA_TYPE.map(dt => (
                        <MenuItem value={dt} key={dt}>
                          {dt}
                        </MenuItem>
                      ))}
                    </RHFSelect>
                  </TableCell>
                  <TableCell>
                    <RHFRadioGroup name={`properties[${index}].isRequired`} />
                  </TableCell>
                  <TableCell width={80}>
                    {index !== 0 && (
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => remove(index)}
                      >
                        <Add fontSize="small" />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </FormProvider>
    </FormWrapper>
  );
}
