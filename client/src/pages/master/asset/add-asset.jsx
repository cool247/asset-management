import * as Yup from "yup";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { Box, Grid } from "@mui/material";
//
import { FormProvider, RHFRadioGroup, RHFTextField } from "../../../components/hook-form";
import FormWrapper from "../../../components/FormWrapper";
import { addUpdatAsset } from "../../../mutations";
import { useGetAssetTypeWithPropertiesById } from "../../../api-hook";

// Generate Yup schema and default values
function generateSchemaAndDefaults(assetType) {
  const propertySchema = {};
  const defaultValues = {};

  for (const property of assetType.properties) {
    const fieldName = `propertyId_${property.id}`;

    // Define validation schema
    let fieldSchema;
    let defaultValue;

    switch (property.dataType) {
      case "String":
        fieldSchema = Yup.string();
        defaultValue = "";
        break;
      case "Number":
        fieldSchema = Yup.number().typeError(`${property.name} must be a number`);
        defaultValue = 0;
        break;
      case "Boolean":
        fieldSchema = Yup.boolean();
        defaultValue = false;
        break;
      default:
        throw new Error(`Unsupported data type: ${property.dataType}`);
    }

    // Mark required or optional
    if (property.isRequired) {
      fieldSchema = fieldSchema.required(`Field "${property.name}" is required`);
    } else {
      fieldSchema = fieldSchema.notRequired();
    }

    // Add to schema and default values
    propertySchema[fieldName] = fieldSchema;
    defaultValues[fieldName] = defaultValue;
  }

  return {
    schema: Yup.object().shape({
      name: Yup.string().trim().required("Required"),
      ...propertySchema,
    }),
    defaultValues: {
      name: "",
      ...defaultValues,
    },
  };
}

export default function AddAsset({ onClose, isEditMode, row, refetch, assetTypeId }) {
  const { enqueueSnackbar } = useSnackbar();
  const { data } = useGetAssetTypeWithPropertiesById(assetTypeId);
  // Generate schema and default values
  const formInfo = data && generateSchemaAndDefaults(data);

  const methods = useForm({
    defaultValues:formInfo?.defaultValues,
    resolver: yupResolver(formInfo?.schema),
  });

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;
  const mutation = useMutation({
    mutationFn: async (formData) => {
      return addUpdatAsset(formData, row?.id);
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

  const onSubmit = (data) => {
    console.log(data);
    mutation.mutate({
      propertiesAndValues: Object.entries(data)
    .filter(([key]) => key.startsWith("propertyId_")) // Filter property keys
    .map(([key, value]) => ({
      propertyId: parseInt(key.replace("propertyId_", ""), 10), // Extract property ID
      propertyValue: value,
    })),
      typeId:assetTypeId,
      name:data.name
    });
  };
  useEffect(() => {
    if (isEditMode) {
      reset({ ...row });
    }
  }, []);

  console.log(errors, "errors", data);
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
      title={isEditMode ? "Update Asset" : "Add Asset"}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <RHFTextField
            name={"name"}
            label={"Asset Name"}
            fullWidth={false}
            placeholder="Enter Asset Name"
            required
          />
        </Box>
        <Grid container spacing={2} mt={1}>
          {data?.properties?.map((property) => {
            const fieldName = `propertyId_${property.id}`;
            return (
              <Grid item xs={12} sm={12} md={4} key={property.id}>
                {property.dataType === "Boolean" ? (
                  <RHFRadioGroup label={property.name} name={fieldName} />
                ) : (
                  <RHFTextField
                    name={fieldName}
                    label={property.name}
                    type={property.dataType === "Number" ? "number" : "text"}
                    placeholder="Enter here"
                    required={property.isRequired}
                  />
                )}
              </Grid>
            );
          })}
        </Grid>
      </FormProvider>
    </FormWrapper>
  );
}
