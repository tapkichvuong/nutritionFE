import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useRegister } from '~/services/authServices';
import styles from './Register.module.scss';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" to="/">
                Nutrition
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.
const USER_REGEX = /^[A-Za-z][A-Za-z0-9_]{3,23}$/;
const PWD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%]).{8,}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const defaultTheme = createTheme();

function Register() {
    const navigate = useNavigate();
    const userRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [role, setRole] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user]);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd]);

    const register = useRegister();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            return;
        }
        try {
            const response = await register(user, pwd, email, role);
            if (!!response) {
                setUser('');
                setPwd('');
                setMatchPwd('');
                toast.success('Account successfully created', {
                    position: 'top-center',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                    onClose: () => {
                        navigate('/login');
                    },
                });
            }
        } catch (err) {
            if (!err?.response) {
                toast.error('No Server Response', {
                    // ... toast options
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
            } else if (err.response?.status === 409) {
                toast.error('Username Taken', {
                    // ... toast options
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
            } else {
                toast.error('Registration Failed (Server Error)', {
                    // ... toast option
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
            }
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <ToastContainer />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    error={!validName && !!user}
                                    id="username"
                                    label="User Name"
                                    name="username"
                                    autoComplete="user"
                                    ref={userRef}
                                    value={user}
                                    onFocus={() => setUserFocus(true)}
                                    onBlur={() => setUserFocus(false)}
                                    onChange={(e) => setUser(e.target.value)}
                                />
                                <div
                                    id="uidnote"
                                    className={userFocus && user && !validName ? cx('instructions') : cx('offscreen')}
                                >
                                    <FontAwesomeIcon icon={faInfoCircle} className={cx('icon')} />
                                    <p>
                                        4 to 24 characters.
                                        <br />
                                        Must begin with a letter.
                                        <br />
                                        Letters, numbers, underscores, hyphens allowed.
                                    </p>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    error={!validEmail && !!email}
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onFocus={() => setEmailFocus(true)}
                                    onBlur={() => setEmailFocus(false)}
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                                <div
                                    id="uidnote"
                                    className={
                                        emailFocus && email && !validEmail ? cx('instructions') : cx('offscreen')
                                    }
                                >
                                    <FontAwesomeIcon icon={faInfoCircle} className={cx('icon')} />
                                    <p>Invalid email Address</p>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    error={!validPwd && !!pwd}
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onFocus={() => setPwdFocus(true)}
                                    onBlur={() => setPwdFocus(false)}
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                />
                                <div
                                    id="pwdnote"
                                    className={!!pwd && pwdFocus && !validPwd ? cx('instructions') : cx('offscreen')}
                                >
                                    <FontAwesomeIcon icon={faInfoCircle} className={cx('icon')} />
                                    <p>
                                        8 to 24 characters.
                                        <br />
                                        Must include uppercase and lowercase letters, a number and a special character.
                                        <br />
                                        Allowed special characters: <span aria-label="exclamation mark">!</span>{' '}
                                        <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span>{' '}
                                        <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                                    </p>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    error={!validMatch}
                                    name="Confirm Password"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirm_pwd"
                                    autoComplete="new-password"
                                    onFocus={() => setMatchFocus(true)}
                                    onBlur={() => setMatchFocus(false)}
                                    onChange={(e) => setMatchPwd(e.target.value)}
                                    value={matchPwd}
                                />
                                <div
                                    id="confirmnote"
                                    className={matchFocus && !validMatch ? cx('instructions') : cx('offscreen')}
                                >
                                    <FontAwesomeIcon icon={faInfoCircle} className={cx('icon')} />
                                    <p>Must match the first password input field.</p>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl required fullWidth>
                                    <InputLabel id="Role">Role</InputLabel>
                                    <Select
                                        labelId="Role"
                                        id="role"
                                        value={role}
                                        label="Role"
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <MenuItem value={'CLIENT'}>CLIENT</MenuItem>
                                        <MenuItem value={'SELLER'}>SELLER</MenuItem>
                                        <MenuItem value={'DOCTOR'}>DOCTOR</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={!validName || !validPwd || !validMatch ? true : false}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}

export default Register;
