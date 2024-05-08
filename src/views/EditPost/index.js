import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import classNames from 'classnames/bind';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './EditPost.module.scss';
import Image from '~/components/Image';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '~/hooks/useAuth';
import { useGetPost, useModify, useUpload } from '~/services/postServices';

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
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const defaultTheme = createTheme();

function EditPost() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [isLoading, setLoading] = useState(false);
    const { auth } = useAuth();
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Uncategorized');
    const [description, setDescription] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [thumbPath, setThumbPath] = useState('');
    const getPost = useGetPost();

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ align: ['', 'center', 'right', 'justify'] }],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link', 'image'],
            ['clean'],
        ],
    };

    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'align',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
    ];
    const modifyApi = useModify();
    
    useEffect(() => {
        if (thumbnail) {
            setThumbPath(URL.createObjectURL(thumbnail));
        }
    }, [thumbnail]);
    useEffect(() => {
        setLoading(true);
        const fetchPost = async () => {
            if (auth?.accessToken) {
                try {
                    const response = await getPost(id, auth?.accessToken);
                    setTitle(response.title);
                    setCategory(response.category);
                    setDescription(response.body);
                    setThumbPath(response.thumbnail);
                } catch (error) {
                    console.error('Error fetching post:', error);
                    // Handle error, e.g., redirect to an error page
                }
            }
        };

        fetchPost();
        setLoading(false);
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await modifyApi(id, title, category, description, thumbnail, auth?.accessToken);
            if (!!response) {
                setTitle('');
                setCategory('Uncategorized');
                setDescription('');
                setThumbnail('');
                toast.success('Blog have been successfully edited', {
                    position: 'top-center',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                    onClose: () => {
                        navigate('/');
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
            } else {
                console.log(err);
                toast.error('Edit Failed (Server Error)', {
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
    const POST_CATEGORIES = [
        'Uncategorized',
        'Eat well',
        'Nutrition basics',
        'Vitamins and supplements',
        'Food, beverages & meal kits',
        'Fitness gear',
        'Skincare',
        'News',
    ];
    return isLoading ? (
        <></>
    ) : (
        <ThemeProvider theme={defaultTheme}>
            <ToastContainer />
            <Container component="main" maxWidth={false}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        minHeight: '100vh',
                    }}
                >
                    <Typography component="h1" variant="h5" className={cx('title')}>
                        Edit Post
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, maxWidth: '80%' }}>
                        <Grid container spacing={4}>
                            <Grid item xs={8}>
                                <TextField
                                    required
                                    fullWidth
                                    error={!title}
                                    id="Title"
                                    label="Title"
                                    name="Title"
                                    autoComplete="Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <div id="uidnote" className={!title ? cx('instructions') : cx('offscreen')}>
                                    <FontAwesomeIcon icon={faInfoCircle} className={cx('icon')} />
                                    <p>Must have a title</p>
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl required fullWidth>
                                    <InputLabel id="Role">Category</InputLabel>
                                    <Select
                                        labelId="Category"
                                        id="Category"
                                        value={category}
                                        label="Category"
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        {POST_CATEGORIES.map((cat, index) => (
                                            <MenuItem key={index} value={cat}>
                                                {cat}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid
                                container
                                direction="column"
                                alignItems="center"
                                justifyContent="center"
                                sx={{ mt: 3 }}
                            >
                                <Image src={thumbPath} className={cx('image-preview')} />
                            </Grid>
                            <Grid
                                container
                                direction="column"
                                alignItems="center"
                                justifyContent="center"
                                sx={{ mt: 3 }}
                            >
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon />}
                                >
                                    Upload file
                                    <VisuallyHiddenInput
                                        accept="image/*"
                                        id="contained-button-file"
                                        multiple
                                        type="file"
                                        onChange={(e) => setThumbnail(e.target.files[0])}
                                    />
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <ReactQuill
                                    theme="snow"
                                    modules={modules}
                                    formats={formats}
                                    value={description}
                                    onChange={setDescription}
                                />
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={!title ? true : false}
                            >
                                POST
                            </Button>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}

export default EditPost;
