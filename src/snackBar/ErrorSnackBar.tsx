import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../state/store";
import { setAppErrorAC } from "../state/appReducer";


export function ErrorSnackBar() {
    let error = useSelector<AppRootStateType, string | null>(state=> state.app.appError)
    let dispatch = useDispatch()
    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
      dispatch(setAppErrorAC(null))
    };
  
    return (
        <div>
            <Snackbar
                open={!!error}
                autoHideDuration={3000}
                onClose={handleClose}>
                    <Alert
                onClose={handleClose}
                severity="error"
                variant="outlined"
                sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </div>
    );
}