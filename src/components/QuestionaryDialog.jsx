import { useEffect, useState } from 'react';
import { t } from 'i18next';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import { useTheme } from '@mui/material/styles';

export default function QuestionaryDialog({questionObj, handlerFoundEgg, handlerOpen}) {
  const {title, description, question, options, answer, reason, maxWidthHelperTxt} = questionObj;

  const [open, setOpen] = useState(true);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [helperText, setHelperText] = useState(" ");
  const theme = useTheme();

  // trigger on component mount
  useEffect(() => {
    handlerOpen(open);
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(" ");
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (value == options[answer]) {
      setHelperText(`\u2714 ${t("questionary_rightAnswer")}${reason != null ? " " + t(reason) : ""}`);
      setError(false);
      setCorrect(true);
      handlerFoundEgg();
      document.querySelector(`div.questionary-dialog div.MuiFormGroup-root > label:nth-child(${answer + 1}) > span > input[name="radio-buttons-group"]`).disabled = true;
    }
    else if (value != undefined && value != "") {
      setHelperText(`\u2716 ${t("questionary_wrongAnswer")}`);
      setError(true);
    }
    else {
      setHelperText(t("questionary_selectOption"));
      setError(true);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        className="questionary-dialog"
        aria-labelledby="questionary-dialog-title"
        aria-describedby="questionary-dialog-description"
      >
        <DialogTitle id="questionary-dialog-title">
          {t(title)}
        </DialogTitle>
        <DialogContent sx={{pb: 0}}>
          <DialogContentText id="questionary-dialog-description" sx={{mb: 1}}>
            <span>{t(description)}</span>
          </DialogContentText>
          <FormControl error={error}>
            <FormLabel id="radio-buttons-group-label" sx={correct ? {color: theme.palette.success.main} : undefined}>{t(question)}</FormLabel>
            <RadioGroup
              name="radio-buttons-group"
              aria-labelledby="radio-buttons-group-label"
              value={value}
              onChange={correct ? undefined : handleRadioChange}
            >
              {options.map((option, i) => {
                return (
                  <FormControlLabel
                    key={i}
                    value={(correct && i != answer) ? "disabled" : option}
                    control={<Radio color={(correct && i == answer) ? "success" : (error && i != answer && option == value) ? "error" : undefined} />}
                    label={option}
                    disabled={(correct && i != answer) ? true : undefined}
                    sx={(correct && i == answer) ? {color: theme.palette.success.main} : (error && i != answer && option == value) ? {color: theme.palette.error.main} : undefined}
                  />
                )
              })}
            </RadioGroup>
            <FormHelperText 
              sx={{ m: 0,
                ...correct ? {color: theme.palette.success.main} : undefined,
                ...maxWidthHelperTxt ? {width: "100%", maxWidth: t(maxWidthHelperTxt)} : undefined
              }}
            >{helperText}</FormHelperText>
          </FormControl>
        </DialogContent>
        <DialogActions>
          {correct ? 
            <Button onClick={handleClose}>{t("questionary_close")}</Button>
            :
            <Button onClick={handleSubmit}>{t("questionary_check")}</Button>}
        </DialogActions>
      </Dialog>
    </>
  );
}