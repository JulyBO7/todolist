import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { AppRootStateType, useAppDispatch } from '../state/store';
import { Navigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { logInTC } from './auth-reducer';

type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
}
export const Login = () => {
  const isAuth = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
  const dispatch = useAppDispatch()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    onSubmit: values => {
      // alert(JSON.stringify(values, null, 2))
      dispatch(logInTC(values))
      formik.resetForm()
    },
    validate: values => {
      console.log(values,':validate')
      const errors: FormikErrorType = {}
      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }
      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length <= 6){
        errors.password = 'Password lengtn must be more than 6 symbols'
      }
      return errors
    }
  })
  console.log('formic:', formik)

  if (isAuth) return <Navigate to='/' />
  return (
    <Grid container justifyContent="center">
      <Grid item xs={4}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormGroup>
              <TextField
                color="success"
                label="Email"
                margin="normal"
                // name="email"
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                // value={formik.values.email}
                {...formik.getFieldProps("email")}
               />
              {formik.touched.email && formik.errors.email && <p style={{color: 'red'}}> {formik.errors.email} </p>}
              <TextField
                color="success"
                type="password"
                label="Password"
                margin="normal"
                // name="password"
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                // value={formik.values.password} 
                {...formik.getFieldProps("password")} />
                {formik.touched.password && formik.errors.password && <p style={{color: 'red'}}> {formik.errors.password} </p>}
              <FormControlLabel
                label="Remember me"
                control={
                  <Checkbox
                    color="success" 
                    checked={formik.values.rememberMe}
                    // onChange={formik.handleChange}
                    // onBlur={formik.handleBlur}
                    // name="rememberMe"
                    {...formik.getFieldProps("rememberMe")} />}/>
              <Button type="submit" variant="outlined" color="success"> Log In </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  )

}