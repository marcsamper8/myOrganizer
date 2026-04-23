import { Snackbar, Alert, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { FormControl } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import api from "../utils/axios";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";

function Login() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isShowError, setIsShowError] = useState(false);


    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;

        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await api.post("/auth/login", formValues);

            const { token, user } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            setError(null);
            setIsShowError(false);

            navigate("/organizer");
        } catch (error) {
            setError(error.response?.data?.message || "Login failed");
            setIsShowError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") return;
        setIsShowError(false);
    };

    return (
        <>
            <Box
                component="form"
                onSubmit={onSubmitHandler}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                }}
            >
                <Card sx={{ width: 400, p: 2 }}>
                    <FormControl fullWidth>
                        <CardContent>
                            <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
                                LOGIN
                            </Typography>

                            <TextField
                                fullWidth
                                margin="normal"
                                name="email"
                                label="Email"
                                type="email"
                                variant="outlined"
                                value={formValues.email}
                                onChange={onChangeHandler}
                            />

                            <TextField
                                fullWidth
                                margin="normal"
                                name="password"
                                label="Password"
                                variant="outlined"
                                type="password"
                                value={formValues.password}
                                onChange={onChangeHandler}
                            />
                        </CardContent>

                        <CardActions>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={isLoading}
                                fullWidth
                            >
                                {isLoading ? "Logging in..." : "Login"}
                            </Button>
                        </CardActions>
                    </FormControl>
                </Card>

                <Snackbar
                    open={isShowError}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                >
                    <Alert onClose={handleClose} severity="error" variant="filled">
                        {error}
                    </Alert>
                </Snackbar>
            </Box>
        </>
    );
}

export default Login;