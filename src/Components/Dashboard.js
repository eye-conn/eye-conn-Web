// import axios from 'axios';
import React, { useEffect, useRef, useState } from "react";

import axios from "axios";
// import { getToken } from '../Utils/Common';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import AddAPhoto from "@mui/icons-material/AddAPhoto";
import CircularProgressWithLabel from "../assets/misc/CircularProgressWithLabel";
import Save from "@mui/icons-material/Save";
import CloudUpload from "@mui/icons-material/CloudUpload";
import CloudDownload from "@mui/icons-material/CloudDownload";
import Https from "@mui/icons-material/Https";
import NoEncryptionGmailerrorred from "@mui/icons-material/NoEncryptionGmailerrorred";
// import Typography from '@mui/material/Typography';
import {
  Alert,
  Button,
  Card,
  CardHeader,
  IconButton,
  Link,
  Slide,
  Snackbar,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import Compressor from "compressorjs";
import { getToken } from "../Utils/Common";

require("dotenv").config();

function Dashboard({
  setAuth: hasAuth,
  setAuthLoading: hasAuthLoading,
  Socket: socket,
  ...props
}) {
  const [loading] = useState(false);
  const [saveloadingE, setSaveloadingE] = useState(false);
  const [encryptImage, setEncryptImage] = useState(null);
  const [decryptImage, setDecryptImage] = useState(null);
  const [saveloadingD, setSaveloadingD] = useState(false);
  const [msgOpen, setMsgOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState({state: false, data: null});
  const [progressE, setProgressE] = useState(0);
  const [progressD, setProgressD] = useState(0);
  const [EncryptPhoto, setEncryptPhoto] = useState({ file: null, path: null });
  const [DecryptPhoto, setDecryptPhoto] = useState({ file: null, path: null });
  // const hiddenFileInputEncrypt = useRef(null);
  const hiddenFileInputDecrypt = useRef(null);
  const cancelTokenSource = axios.CancelToken.source();

  // const handleClickEncrypt = event => {
  //   hiddenFileInputEncrypt.current.click();
  // };
  const handleClickDecrypt = (event) => {
    hiddenFileInputDecrypt.current.click();
  };
  const handleChangeEncrypt = (event) => {
    const reader = new FileReader();
    let fileUploaded = event.target.files[0];
    if (!fileUploaded) return;
    if (
      fileUploaded.type.slice(0, 5) !== "image" ||
      fileUploaded.size > 104857600
    ) {
      return alert("Please upload a image less than 10MB");
    }
    // console.log(fileUploaded.size)
    // if (fileUploaded.size >= 307200){
    if (false) {
      let qF = 1;
      for (qF = 95; qF >= 5; qF -= 5) {
        if ((fileUploaded.size * qF) / 100 < 307200) {
          break;
        }
      }
      // console.log(qF)
      if (qF === 0) {
        for (qF = 5; qF >= 1; qF -= 1) {
          if ((fileUploaded.size * qF) / 100 < 307200) {
            break;
          }
        }
      }
      // console.log(qF)
      new Compressor(fileUploaded, {
        quality: qF / 100, // 0.6 can also be used, but its not recommended to go below.
        success: (compressedResult) => {
          fileUploaded = compressedResult;
          reader.onload = function (e) {
            setEncryptPhoto({ file: fileUploaded, path: e.target.result });
          };
          reader.readAsDataURL(fileUploaded);
          // console.log(fileUploaded.size)
          // console.log(compressedResult)
        },
      });
    } else {
      reader.onload = function (e) {
        setEncryptPhoto({ file: fileUploaded, path: e.target.result });
      };
      reader.readAsDataURL(fileUploaded);
      // console.log(fileUploaded.size)
    }
    // props.handleFile(fileUploaded);
  };
  const handleChangeDecrypt = async (event) => {
    const reader = new FileReader();
    let fileUploaded = event.target.files[0];
    if (!fileUploaded) return;
    if (
      fileUploaded.type.slice(0, 5) !== "image" ||
      fileUploaded.size > 10485760
    ) {
      return alert("Please upload a image less than 10MB");
    }
    // console.log(fileUploaded.size)
    // if (fileUploaded.size >= 307200) {
    if (false) {
      let qF = 1;
      for (qF = 95; qF >= 5; qF -= 5) {
        if ((fileUploaded.size * qF) / 100 < 307200) {
          break;
        }
      }
      // console.log(qF)
      if (qF === 0) {
        for (qF = 5; qF >= 1; qF -= 1) {
          if ((fileUploaded.size * qF) / 100 < 307200) {
            break;
          }
        }
      }
      // console.log(qF)
      new Compressor(fileUploaded, {
        quality: qF / 100, // 0.6 can also be used, but its not recommended to go below.
        success: (compressedResult) => {
          fileUploaded = compressedResult;
          reader.onload = function (e) {
            setDecryptPhoto({ file: fileUploaded, path: e.target.result });
          };
          reader.readAsDataURL(fileUploaded);
          // console.log(fileUploaded.size)
          // console.log(compressedResult)
        },
      });
    } else {
      reader.onload = function (e) {
        setDecryptPhoto({ file: fileUploaded, path: e.target.result });
      };
      reader.readAsDataURL(fileUploaded);
      // console.log(fileUploaded.size)
    }
    // props.handleFile(fileUploaded);
  };

  const handleESubmit = (e) => {
    // console.log(EncryptPhoto.file)
    e.preventDefault();
    if (!EncryptPhoto.file) return alert("Please upload a image");
    setSaveloadingE(true);
    const form = new FormData();
    form.append("encrypt", EncryptPhoto.file);
    form.append("token", getToken());

    // console.log(updateData)
    const config = {
      onUploadProgress: (e) =>
        setProgressE(Math.ceil((parseInt(e.loaded) / parseInt(e.total)) * 100)),
      cancelToken: cancelTokenSource.token,
    };
    // http://localhost:5000/upload
    axios
      .post(`${process.env.REACT_APP_HOST}/encrypt`, form, { ...config })
      .then((response) => {
        console.log(response.data);
        setMsgOpen(true);
        setEncryptImage(response.data.file);
        setSaveloadingE(false);
        setProgressE(0)
      })
      .catch((error) => {
        console.log(error.response.data);
        // removeUserSession();
        setErrorOpen({ state: true, data: error.response.data.error });
        setSaveloadingE(false);
        // setAuth(false);
      });
  };

  const handleDSubmit = (e) => {
    // console.log(size)
    e.preventDefault();
    setSaveloadingD(true);
    const form = new FormData();
    form.append("decrypt", DecryptPhoto.file);
    form.append("key", e.target.key.value);
    form.append("token", getToken());

    // console.log(updateData)
    const config = {
      onUploadProgress: (e) =>
        setProgressD(Math.ceil((parseInt(e.loaded) / parseInt(e.total)) * 100)),
      cancelToken: cancelTokenSource.token,
    };
    axios
      .post(`${process.env.REACT_APP_HOST}/decrypt`, form, { ...config })
      .then((response) => {
        console.log(response.data);
        setMsgOpen(true);
        setDecryptImage(response.data.file)
        setSaveloadingD(false);
        setProgressD(0)
      })
      .catch((error) => {
        console.log(error.response.data);
        // removeUserSession();
        setErrorOpen({ state: true, data: error.response.data.error });
        setSaveloadingD(false);
        // setAuth(false);
      });
  };

  useEffect(() => {
    // setLoading(true)

    return () => {};
  }, []);

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  if (loading) {
    // return <div className="loadclass"><span className="loader-11"></span></div>;
    return (
      <>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </>
    );
  }

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 1, mb: 4 }}>
        <Box>
          <Box>
            <Tabs
              value={tabIndex}
              onChange={handleTabChange}
              variant="fullWidth"
            >
              <Tab icon={<Https />} label="Encrypt" />
              <Tab icon={<NoEncryptionGmailerrorred />} label="Decrypt" />
              {/* <Tab label="Tab 3" /> */}
            </Tabs>
          </Box>
          <Box sx={{ padding: 1 }}>
            {tabIndex === 0 && (
              <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                {/* file upload with preview */}
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 340,
                  }}
                >
                  <Box sx={{ mt: 1, height: 330 }}>
                    {/* <Typography variant="h6" gutterBottom component="div">
              Encrypt
            </Typography> */}
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Box
                          sx={{
                            mt: 0,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            height: 300,
                            gap: 3,
                          }}
                        >
                          {/* <Typography variant="h6"  component="div">
                    Upload File
                  </Typography> */}
                          <form
                            onSubmit={handleESubmit}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              gap: 15,
                              alignSelf: "center",
                            }}
                          >
                            <input
                              accept="image/*"
                              style={{ display: "none" }}
                              id="raised-button-file"
                              multiple
                              type="file"
                              onChange={handleChangeEncrypt}
                            />
                            <label htmlFor="raised-button-file">
                              <Button
                                variant="contained"
                                component="span"
                                startIcon={<CloudUpload />}
                              >
                                Upload
                              </Button>
                            </label>
                            <Button
                              color="success"
                              type="submit"
                              disabled={saveloadingE}
                              startIcon={
                                saveloadingE ? (
                                  <>
                                    <CircularProgressWithLabel
                                      size={24}
                                      value={progressE}
                                      variant="determinate"
                                    />{" "}
                                  </>
                                ) : (
                                  <Save fontSize="20" />
                                )
                              }
                              variant="contained"
                            >
                              Encrypt
                            </Button>
                          </form>
                          {/* create a download button */}
                          {encryptImage && (
                            <Link
                              href={encryptImage}
                              download
                              sx={{
                                mt: 0,
                                display: "flex",
                                flexDirection: "column",
                                alignSelf: "center",
                                width: 150,
                              }}
                            >
                              <Button
                                color="error"
                                variant="contained"
                                component="span"
                                startIcon={<CloudDownload />}
                              >
                                Download
                              </Button>
                            </Link>
                          )}
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Box sx={{ mt: 0 }}>
                          <Typography variant="h6" gutterBottom component="div">
                            Preview
                          </Typography>
                          <Box sx={{ mt: 3 }}>
                            <img
                              src={
                                EncryptPhoto
                                  ? EncryptPhoto.path
                                  : "https://via.placeholder.com/150"
                              }
                              alt="preview"
                              height={250}
                            />
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>

                {/* <Box>
            <Grid container spacing={3}>
              
            <Grid item xs={12} md={8} lg={12}>
<Paper
  sx={{
    p: 2,
    display: 'flex',
    flexDirection: 'column',
    height: 340,
  }}
>
  <Box sx={{
// marginTop: 8,
display: 'flex',
flexDirection: 'column',
alignItems: 'center',
}}>
<form onSubmit={handleESubmit}>
    

<Card sx={{ maxWidth: 345 }}>
<CardHeader
action={
<IconButton onClick={handleClickEncrypt} aria-label="settings">
<AddAPhoto />
<input type="file" accept='image/*' id="Encrypt" onChange={handleChangeEncrypt} ref={hiddenFileInputEncrypt} style={{ display: "none" }} />
</IconButton>
}
subheader="Your Photo"
// subheader="September 14, 2016"
/>   
  </Card>
  <Button color="primary"
type="submit"
disabled={saveloadingE}
startIcon={saveloadingE ? (
<CircularProgressWithLabel fontSize='24' value={progressE} />
):<Save fontSize='50'/>}
variant="contained">Encrypt</Button>
</form>
  </Box>
</Paper>
</Grid>
              
              </Grid>
          </Box> */}
              </Slide>
            )}
            {tabIndex === 1 && (
              <Slide direction="right" in={true} mountOnEnter unmountOnExit>
                <Box>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4} lg={12}>
                      <Paper
                        sx={{
                          p: 2,
                          display: "flex",
                          flexDirection: "column",
                          height: 340,
                        }}
                      >
                        <Box
                          sx={{
                            // marginTop: ,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <form
                            onSubmit={handleDSubmit}
                            // style={{display: 'flex', flexDirection: 'column', gap: 10, alignSelf: 'center'}}
                          >
                            <Card sx={{}}>
                              <CardHeader
                                action={
                                  <IconButton
                                    onClick={handleClickDecrypt}
                                    aria-label="settings"
                                  >
                                    <AddAPhoto />
                                    <input
                                      type="file"
                                      accept="image/*"
                                      id="Decrypt"
                                      onChange={handleChangeDecrypt}
                                      ref={hiddenFileInputDecrypt}
                                      style={{ display: "none" }}
                                    />
                                  </IconButton>
                                }
                                subheader="Decrypt"
                                // subheader="September 14, 2016"
                              />
                            </Card>
                            <TextField
                              margin="normal"
                              required
                              fullWidth
                              id="key"
                              label="Key"
                              name="key"
                              autoComplete="key"
                            />
                            <Button
                              sx={{}}
                              color="primary"
                              type="submit"
                              disabled={saveloadingD}
                              startIcon={
                                saveloadingD ? (
                                  <CircularProgressWithLabel
                                    size={24}
                                    value={progressD}
                                  />
                                ) : (
                                  <Save fontSize="20" />
                                )
                              }
                              variant="contained"
                            >
                              Decrypt
                            </Button>
                          </form>
                          {decryptImage && (
                            <Link
                              href={decryptImage}
                              download
                              sx={{
                                mt: 0,
                                display: "flex",
                                flexDirection: "column",
                                alignSelf: "center",
                                width: 150,
                              }}
                            >
                              <Button
                                color="warning"
                                variant="contained"
                                component="span"
                                startIcon={<CloudDownload />}
                              >
                                Download
                              </Button>
                            </Link>
                          )}
                        </Box>
                      </Paper>
                    </Grid>
                  </Grid>
                </Box>
              </Slide>
            )}
          </Box>
        </Box>
      </Container>
      <Snackbar
        open={msgOpen}
        autoHideDuration={3000}
        onClose={() => {
          setMsgOpen(false);
        }}
      >
        <Alert
          severity="success"
          sx={{ width: "100%" }}
          onClose={() => {
            setMsgOpen(false);
          }}
        >
          Saved Succesfully
        </Alert>
      </Snackbar>
      <Snackbar
        open={errorOpen.state}
        autoHideDuration={3000}
        onClose={() => {
          setErrorOpen({ state: false, data: "" });
        }}
      >
        <Alert
          severity="error"
          sx={{ width: "100%" }}
          onClose={() => {
            setErrorOpen({ state: false, data: "" });
          }}
        >
          {errorOpen.data}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Dashboard;
