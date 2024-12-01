import PropTypes from "prop-types";
// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { Radio, RadioGroup, FormHelperText, FormControlLabel, FormControl, FormLabel } from "@mui/material";

// ----------------------------------------------------------------------

RHFRadioGroup.propTypes = {
  name: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  getOptionLabel: PropTypes.arrayOf(PropTypes.string),
};

export default function RHFRadioGroup({ name, label, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl>
         {label && <FormLabel>{label}</FormLabel>}
          <RadioGroup {...field} row {...other}>
            <FormControlLabel value={true} control={<Radio />} label={"Yes"} />
            <FormControlLabel value={false} control={<Radio />} label={"No"} />
          </RadioGroup>

          {!!error && (
            <FormHelperText error sx={{ px: 2 }}>
              {error.message}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
