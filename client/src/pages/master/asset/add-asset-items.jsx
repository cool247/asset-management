import * as Yup from "yup";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import { useFieldArray, useForm } from "react-hook-form";
import {
  IconButton,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
//
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from "../../../components/hook-form";
import FormWrapper from "../../../components/FormWrapper";
import { addUpdateAssetItem } from "../../../mutations";
import { Add, Delete } from "@mui/icons-material";
import { useGetRackCupBoard } from "../../../api-hook";

const defaultValues = {
  item: [
    {
      barcodeId: "",
      rackAndCupboardBardCodeId: "",
    },
  ],
};

const schema = Yup.object().shape({
  item: Yup.array().of(
    Yup.object().shape({
      barcodeId: Yup.string()
        .trim()
        .min(1)
        .max(100)
        .required("Barcode ID is required"),
      rackAndCupboardBardCodeId: Yup.string().required(
        "Rack/Cupboard is required"
      ),
    })
  ),
});

export default function AddAssetItem({
  onClose,
  isEditMode,
  row,
  refetch,
  assetId,
}) {
  const { enqueueSnackbar } = useSnackbar();

  const { data: racksAndcupboard } = useGetRackCupBoard();

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { append, remove, fields } = useFieldArray({
    name: "item",
    control: methods.control,
  });

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const mutation = useMutation({
    mutationFn: async formData => {
      return await addUpdateAssetItem(formData, row?.id);
    },
    onSuccess: () => {
      enqueueSnackbar(`Successfully ${isEditMode ? "Updated" : "Added"}  `, {
        variant: "success",
      });
      onClose();
      refetch();
    },
    onError: () => {
      enqueueSnackbar(`Failed to ${isEditMode ? "update" : "add"} `, {
        variant: "error",
      });
    },
  });

  const onSubmit = data => {
    mutation.mutate(data.item.map(d => ({ ...d, assetId })));
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
      title={isEditMode ? "Update Item" : "Add Item"}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Barcode ID *</TableCell>
              <TableCell>Rack/Cupboard *</TableCell>
              <TableCell>
                <IconButton
                  size="small"
                  onClick={() =>
                    append({ barcodeId: "", rackAndCupboardBardCodeId: "" })
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
                      name={`item[${index}].barcodeId`}
                      required
                      placeholder="Enter Barcode ID"
                    />
                  </TableCell>
                  <TableCell>
                    <RHFSelect
                      name={`item[${index}].rackAndCupboardBardCodeId`}
                      required
                    >
                      <MenuItem value="" disabled>
                        Select Rack/Cupboard
                      </MenuItem>
                      {racksAndcupboard?.map(({ barcodeId, name }) => (
                        <MenuItem value={barcodeId} key={barcodeId}>
                          {name}
                        </MenuItem>
                      ))}
                    </RHFSelect>
                  </TableCell>

                  <TableCell width={80}>
                    {index !== 0 && (
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => remove(index)}
                      >
                        <Delete fontSize="small" color="error" />
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
