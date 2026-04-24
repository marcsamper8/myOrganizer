import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import { OrganizerFooter, OrganizerHeader } from "../components/OrganizerChrome";
import { getAuthToken, getStoredUser } from "../utils/authStorage";

function CompassIcon(props) {
    return (
        <SvgIcon viewBox="0 0 24 24" {...props}>
            <path d="M12 2a10 10 0 1 1 0 20a10 10 0 0 1 0-20Zm0 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16Zm4.75 3.75-2.6 7.1-7.1 2.6 2.6-7.1 7.1-2.6Zm-5.3 3.8-.95 2.6 2.6-.95.95-2.6-2.6.95Z" />
        </SvgIcon>
    );
}

export function ErrorPage() {
    const navigate = useNavigate();
    const token = getAuthToken();
    const user = getStoredUser();

    return (
        <Box sx={{ minHeight: "100svh", bgcolor: "#f7f8fc", color: "#090927", display: "flex", flexDirection: "column" }}>
            {token ? <OrganizerHeader user={user} /> : null}

            <Box component="main" sx={{ flex: 1, display: "flex", alignItems: "center", py: { xs: 4, sm: 6 } }}>
                <Container maxWidth={false} sx={{ px: { xs: 2, sm: 4 }, maxWidth: 1120 }}>
                    <Paper
                        elevation={0}
                        sx={{
                            position: "relative",
                            overflow: "hidden",
                            border: "1px solid #e4e7f1",
                            borderRadius: 2,
                            boxShadow: "0 10px 30px rgba(33, 34, 65, 0.08)",
                            bgcolor: "#fff",
                            p: { xs: 3, sm: 5 },
                        }}
                    >
                        <Box sx={{ position: "absolute", left: { xs: -70, sm: -40 }, top: { xs: -60, sm: -30 }, width: { xs: 180, sm: 260 }, height: { xs: 180, sm: 260 }, bgcolor: "#eef1fd", borderRadius: "42% 58% 36% 64%" }} />
                        <Box sx={{ position: "absolute", right: { xs: -60, sm: -20 }, bottom: { xs: -90, sm: -80 }, width: { xs: 190, sm: 280 }, height: { xs: 190, sm: 280 }, bgcolor: "#f1edff", borderRadius: "50% 35% 50% 36%" }} />

                        <Stack
                            direction={{ xs: "column", md: "row" }}
                            spacing={{ xs: 4, md: 6 }}
                            alignItems="center"
                            sx={{ position: "relative", zIndex: 1 }}
                        >
                            <Box
                                aria-hidden="true"
                                sx={{
                                    width: { xs: 144, sm: 180 },
                                    height: { xs: 144, sm: 180 },
                                    borderRadius: { xs: 5, sm: 7 },
                                    display: "grid",
                                    placeItems: "center",
                                    bgcolor: "#f3efff",
                                    color: "#6a53dd",
                                    boxShadow: "inset 0 -16px 0 rgba(106, 83, 221, 0.08)",
                                    flex: "0 0 auto",
                                }}
                            >
                                <CompassIcon sx={{ fontSize: { xs: 82, sm: 104 } }} />
                            </Box>

                            <Stack spacing={2} sx={{ maxWidth: 560, textAlign: { xs: "center", md: "left" } }}>
                                <Typography sx={{ color: "#6a53dd", fontSize: 14, fontWeight: 800, letterSpacing: 1.4 }}>
                                    ERROR 404
                                </Typography>
                                <Typography component="h1" sx={{ color: "#090927", fontSize: { xs: 40, sm: 58 }, fontWeight: 700, lineHeight: 1.05, m: 0 }}>
                                    This page could not be found.
                                </Typography>
                                <Typography sx={{ color: "#5f6386", fontSize: { xs: 17, sm: 21 }, lineHeight: 1.45 }}>
                                    {token
                                        ? `Signed in as ${user?.name || user?.email || "Organizer"}. The route you opened does not exist in My Organizer.`
                                        : "The route you opened does not exist in My Organizer. You can return to login or head back to your dashboard if you already have a session."}
                                </Typography>

                                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ pt: 1 }}>
                                    <Button
                                        variant="contained"
                                        onClick={() => navigate(token ? "/organizer" : "/")}
                                        sx={{
                                            minWidth: { xs: "100%", sm: 190 },
                                            height: 52,
                                            borderRadius: 1.5,
                                            bgcolor: "#523bd6",
                                            color: "white",
                                            fontWeight: 700,
                                            textTransform: "none",
                                            boxShadow: "none",
                                            "&:hover": { bgcolor: "#442fc0", boxShadow: "0 10px 24px rgba(82, 59, 214, 0.22)" },
                                        }}
                                    >
                                        {token ? "Go to Dashboard" : "Go to Login"}
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        onClick={() => navigate(-1)}
                                        sx={{
                                            minWidth: { xs: "100%", sm: 170 },
                                            height: 52,
                                            borderRadius: 1.5,
                                            borderColor: "#c7c9ef",
                                            color: "#4c47b9",
                                            fontWeight: 700,
                                            textTransform: "none",
                                            "&:hover": { borderColor: "#4c47d8", bgcolor: "#fff" },
                                        }}
                                    >
                                        Go Back
                                    </Button>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Paper>
                </Container>
            </Box>

            <OrganizerFooter />
        </Box>
    );
}
