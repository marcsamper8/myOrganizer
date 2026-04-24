import {
    Snackbar,
    Alert,
    Button,
    Checkbox,
    FormControlLabel,
    Link,
    Stack,
} from "@mui/material";
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
import { persistAuthSession } from "../utils/authStorage";

const defaultFormState = {
    name: "",
    email: "",
    password: "",
    rememberMe: true,
};

function Login() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isShowError, setIsShowError] = useState(false);
    const [mode, setMode] = useState("login");
    const [formValues, setFormValues] = useState(defaultFormState);

    const onChangeHandler = (e) => {
        const { name, value, type, checked } = e.target;

        setFormValues((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const payload =
                mode === "register"
                    ? {
                        name: formValues.name.trim(),
                        email: formValues.email.trim(),
                        password: formValues.password,
                    }
                    : {
                        email: formValues.email.trim(),
                        password: formValues.password,
                    };

            const endpoint = mode === "register" ? "/auth/register" : "/auth/login";
            const response = await api.post(endpoint, payload);

            const { token, user } = response.data;

            persistAuthSession({
                token,
                user,
                rememberMe: formValues.rememberMe,
            });

            setError(null);
            setSuccessMessage(
                mode === "register"
                    ? "Account created successfully."
                    : "Logged in successfully."
            );
            setIsShowError(false);

            navigate("/organizer");
        } catch (error) {
            setSuccessMessage(null);
            setError(
                error.response?.data?.message ||
                (mode === "register" ? "Registration failed" : "Login failed")
            );
            setIsShowError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") return;
        setIsShowError(false);
    };

    const switchMode = (nextMode) => {
        setMode(nextMode);
        setError(null);
        setSuccessMessage(null);
        setIsShowError(false);
        setFormValues((prev) => ({
            ...defaultFormState,
            rememberMe: prev.rememberMe,
            email: prev.email,
        }));
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
                    px: { xs: 3 },
                    background:
                        "radial-gradient(circle at top left, rgba(102, 86, 220, 0.18), transparent 32%), linear-gradient(180deg, #f7f8ff 0%, #eef2fb 100%)",
                }}
            >
                <Card sx={{
                    width: "100%",
                    maxWidth: 460,
                    p: { xs: 1, sm: 2 },
                    borderRadius: 3,
                    boxShadow: "0 18px 60px rgba(38, 45, 92, 0.14)"
                }}>
                    <FormControl fullWidth>
                        <CardContent>
                            <Stack spacing={1.5} sx={{ mb: 2 }}>
                                <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 13, letterSpacing: 1.2, mb: 0 }}>
                                    {mode === "login" ? "WELCOME BACK" : "CREATE ACCOUNT"}
                                </Typography>
                                <Typography sx={{ color: "#161c3d", fontSize: { xs: 28, sm: 34 }, fontWeight: 700, lineHeight: 1.05 }}>
                                    {mode === "login" ? "Login to My Organizer" : "Register for My Organizer"}
                                </Typography>
                                <Typography sx={{ color: "#65708c", fontSize: 15, lineHeight: 1.5 }}>
                                    {mode === "login"
                                        ? "Access your organizer and keep your storage spaces in sync."
                                        : "Create an account to start managing storages, items, and locations."}
                                </Typography>
                            </Stack>

                            <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                                <Button
                                    type="button"
                                    variant={mode === "login" ? "contained" : "outlined"}
                                    onClick={() => switchMode("login")}
                                    sx={{
                                        flex: 1,
                                        height: 44,
                                        borderRadius: 99,
                                        textTransform: "none",
                                        fontWeight: 700,
                                        boxShadow: "none",
                                    }}
                                >
                                    Login
                                </Button>
                                <Button
                                    type="button"
                                    variant={mode === "register" ? "contained" : "outlined"}
                                    onClick={() => switchMode("register")}
                                    sx={{
                                        flex: 1,
                                        height: 44,
                                        borderRadius: 99,
                                        textTransform: "none",
                                        fontWeight: 700,
                                        boxShadow: "none",
                                    }}
                                >
                                    Register
                                </Button>
                            </Stack>

                            {mode === "register" ? (
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    name="name"
                                    label="Full Name"
                                    variant="outlined"
                                    value={formValues.name}
                                    onChange={onChangeHandler}
                                    required
                                />
                            ) : null}

                            <TextField
                                fullWidth
                                margin="normal"
                                name="email"
                                label="Email"
                                type="email"
                                variant="outlined"
                                value={formValues.email}
                                onChange={onChangeHandler}
                                required
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
                                required
                            />

                            <Stack
                                direction={{ xs: "column", sm: "row" }}
                                justifyContent="space-between"
                                alignItems={{ xs: "flex-start", sm: "center" }}
                                spacing={1}
                                sx={{ mt: 1.5 }}
                            >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="rememberMe"
                                            checked={formValues.rememberMe}
                                            onChange={onChangeHandler}
                                        />
                                    }
                                    label="Remember me"
                                />
                                <Link
                                    component="button"
                                    type="button"
                                    underline="hover"
                                    onClick={() =>
                                        switchMode(mode === "login" ? "register" : "login")
                                    }
                                    sx={{ fontWeight: 600 }}
                                >
                                    {mode === "login"
                                        ? "Need an account? Register"
                                        : "Already have an account? Login"}
                                </Link>
                            </Stack>

                            {successMessage ? (
                                <Alert severity="success" sx={{ mt: 2 }}>
                                    {successMessage}
                                </Alert>
                            ) : null}
                        </CardContent>

                        <CardActions>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={isLoading}
                                fullWidth
                                sx={{
                                    height: 48,
                                    borderRadius: 2,
                                    textTransform: "none",
                                    fontWeight: 700,
                                    boxShadow: "none",
                                }}
                            >
                                {isLoading
                                    ? mode === "login"
                                        ? "Logging in..."
                                        : "Creating account..."
                                    : mode === "login"
                                        ? "Login"
                                        : "Register"}
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
