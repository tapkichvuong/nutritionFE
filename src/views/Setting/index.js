import React from 'react';
import { useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faPen } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './Setting.module.scss';
import provincesData from '~/assets/provinces/provinces.json';
import districtData from '~/assets/provinces/district.json';
import wardData from '~/assets/provinces/ward.json';
import Image from '~/components/Image';
import Modal from '~/components/Modal';
import { useGetProfile, useUpdateProfile } from '~/services/userServices';
import useAuth from '~/hooks/useAuth';

const cx = classNames.bind(styles);

const defaultTheme = createTheme();

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]*$/;
function Setting() {
    const { auth } = useAuth();
    const [isLoading, setLoading] = useState(false);
    const [provinces, setProvinces] = useState({});
    const [wards, setWard] = useState({});
    const [districts, setDistrict] = useState({});

    const [provincesId, setProvincesId] = useState(0);
    const [districtId, setDistrictId] = useState(0);
    const [wardId, setWardId] = useState(0);

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [birth, setBirth] = useState('');

    const [phone, setPhone] = useState('');
    const [validPhone, setValidPhone] = useState(false);
    const [phoneFocus, setPhoneFocus] = useState(false);

    const [address, setAddress] = useState('');

    const [gender, setGender] = useState('');

    const [avatarFile, setAvatarFile] = useState(null);
    const avatarUrl = useRef('http://localhost:8080/api/v1/image/defaultAvatar.png');
    const [modalOpen, setModalOpen] = useState(false);

    const updateAvatar = (imgSrc) => {
        avatarUrl.current = imgSrc;
    };

    const getProfile = useGetProfile();
    const updateProfile = useUpdateProfile();
    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    useEffect(() => {
        setValidPhone(PHONE_REGEX.test(phone));
    }, [phone]);
    useEffect(() => {
        setProvinces(provincesData);
    }, []);
    useEffect(() => {
        const updateDistrict = (provincesId) => {
            const filteredDistricts = Object.values(districtData).filter(
                (district) => district.parent_code === provincesId,
            );
            setDistrict(filteredDistricts);
        };

        // Call updateDistrict with provincesSelect
        updateDistrict(provincesId);
    }, [provincesId]);
    useEffect(() => {
        const updateWard = (districtId) => {
            const filteredWards = Object.values(wardData).filter((ward) => ward.parent_code === districtId);
            setWard(filteredWards);
            console.log(filteredWards);
        };

        // Call updateDistrict with provincesSelect
        updateWard(districtId);
    }, [districtId]);

    useEffect(() => {
        setLoading(true);
        const fetchProfile = async () => {
            if (auth?.accessToken) {
                try {
                    const response = await getProfile(auth?.accessToken);
                    setFname(response?.firstName || '');
                    setLname(response?.lastName || '');
                    setPhone(response?.body || '');
                    setEmail(response?.email || '');
                    setPhone(response?.phone || '');
                    setBirth(dayjs(response?.birth) || '');
                    setGender(response?.gender || '');

                    let provinceName = response?.address.province;
                    let provinceId = Object.values(provincesData).find(
                        (province) => province.name === provinceName,
                    )?.code;
                    setProvincesId(provinceId || '');

                    let districtName = response?.address.district;
                    let districtId = Object.values(districtData).find(
                        (district) => district.name === districtName,
                    )?.code;
                    setDistrictId(districtId || '');

                    let wardName = response?.address.ward;
                    let filteredWards = Object.values(wardData).filter((ward) => ward.parent_code === districtId);
                    let wardId = Object.values(filteredWards).find((ward) => ward.name === wardName)?.code;
                    setWardId(wardId || '');

                    setAddress(response?.address.street || '');
                    avatarUrl.current = response?.avatar;
                } catch (error) {
                    console.error('Error fetching post:', error);
                    // Handle error, e.g., redirect to an error page
                }
            }
        };
        fetchProfile();
        setLoading(false);
    }, []);
    useEffect(() => {
        fetch(avatarUrl.current)
            .then((res) => res.blob())
            .then((blob) => {
                const file = new File([blob], 'dot.png', blob);
                setAvatarFile(file);
            });
    }, [avatarUrl]);
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const strBirth = dayjs(birth).format('YYYY-MM-DD');
            const provinceName = Object.values(provincesData).find((province) => province.code === provincesId)?.name;
            const districtName = Object.values(districtData).find((district) => district.code === districtId)?.name;
            const wardName = Object.values(wardData).find((ward) => ward.code === wardId)?.name;
            const response = await updateProfile(
                fname,
                lname,
                phone,
                avatarFile,
                gender,
                strBirth,
                address,
                wardName,
                districtName,
                provinceName,
                auth?.accessToken,
            );

            if (!!response) {
                // Handle successful upload, e.g., show success message
                toast.success('Update information successfully!');
            } else {
                // Handle upload error
                toast.error('Failed to update information.');
            }
        } catch (error) {
            // Handle fetch error
            console.error('Error uploading avatar:', error);
            toast.error('An error occurred while update information.');
        }
    };
    return isLoading ? (
        <></>
    ) : (
        <ThemeProvider theme={defaultTheme}>
            <ToastContainer />
            {modalOpen && <Modal updateAvatar={updateAvatar} closeModal={() => setModalOpen(false)} />}
            <Container component="main" maxWidth="sm" sx={{}}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        background: '#fff',
                        padding: 4,
                        borderRadius: 3,
                    }}
                >
                    <Grid item sm={6}>
                        <div className={cx('avatar-container')}>
                            <Image src={avatarUrl.current} alt="Avatar" className={cx('avatar')} />
                            <button
                                className={cx('avatar-button')}
                                title="Change photo"
                                onClick={() => setModalOpen(true)}
                            >
                                <FontAwesomeIcon icon={faPen} />
                            </button>
                        </div>
                    </Grid>

                    <Typography component="h1" variant="h5">
                        General information
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    error={!fname}
                                    id="firstname"
                                    label="First Name"
                                    name="firstname"
                                    autoComplete="firstname"
                                    value={fname}
                                    onChange={(e) => setFname(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    error={!lname}
                                    id="lastname"
                                    label="Last Name"
                                    name="lastname"
                                    autoComplete="lastname"
                                    value={lname}
                                    onChange={(e) => setLname(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Grid container direction="row" justifyContent="space-around" alignItems="center">
                                    <Typography component="p" variant="p">
                                        Birth
                                    </Typography>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            slotProps={{
                                                textField: {
                                                    error: false,
                                                },
                                            }}
                                            fullWidth
                                            value={birth}
                                            onChange={(birth) => setBirth(birth)}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl required fullWidth>
                                    <InputLabel id="Gender">Gender</InputLabel>
                                    <Select
                                        labelId="Gender"
                                        id="gender"
                                        value={gender}
                                        label="Gender"
                                        onChange={(e) => setGender(e.target.value)}
                                    >
                                        <MenuItem value={'FEMALE'}>FEMALE</MenuItem>
                                        <MenuItem value={'MALE'}>MALE</MenuItem>
                                        <MenuItem value={'OTHERS'}>OTHERS</MenuItem>
                                    </Select>
                                </FormControl>
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
                                    error={!validPhone && !!phone}
                                    name="phone"
                                    label="Phone"
                                    type="phone"
                                    id="phone"
                                    autoComplete="phone"
                                    onFocus={() => setPhoneFocus(true)}
                                    onBlur={() => setPhoneFocus(false)}
                                    onChange={(e) => setPhone(e.target.value)}
                                    value={phone}
                                />
                                <div
                                    id="uidnote"
                                    className={
                                        phoneFocus && phone && !validPhone ? cx('instructions') : cx('offscreen')
                                    }
                                >
                                    <FontAwesomeIcon icon={faInfoCircle} className={cx('icon')} />
                                    <p>Invalid Phone</p>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    error={!address}
                                    name="Address"
                                    label="Address"
                                    type="Address"
                                    id="Address"
                                    autoComplete="Address"
                                    onChange={(e) => setAddress(e.target.value)}
                                    value={address}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl required fullWidth>
                                    <InputLabel id="Provinces">Provinces</InputLabel>
                                    <Select
                                        labelId="Provinces"
                                        id="Provinces"
                                        value={provincesId}
                                        label="Provinces"
                                        onChange={(e) => setProvincesId(e.target.value)}
                                    >
                                        {Object.values(provinces).map((province, index) => {
                                            return (
                                                <MenuItem key={index} value={province.code}>
                                                    {province.name}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl required fullWidth>
                                    <InputLabel id="District">District</InputLabel>
                                    <Select
                                        labelId="District"
                                        id="District"
                                        value={districtId}
                                        label="District"
                                        onChange={(e) => setDistrictId(e.target.value)}
                                    >
                                        {Object.values(districts).map((district, index) => {
                                            return (
                                                <MenuItem key={index} value={district.code}>
                                                    {district.name}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl required fullWidth>
                                    <InputLabel id="ward">Ward</InputLabel>
                                    <Select
                                        labelId="ward"
                                        id="ward"
                                        value={wardId}
                                        label="ward"
                                        onChange={(e) => setWardId(e.target.value)}
                                    >
                                        {Object.values(wards).map((ward, index) => {
                                            return (
                                                <MenuItem key={index} value={ward.code}>
                                                    {ward.name}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={!fname && !lname && !email && !phone && validEmail && validPhone ? true : false}
                        >
                            Save All
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Setting;
