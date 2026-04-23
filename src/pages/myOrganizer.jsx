import { useNavigate } from "react-router-dom";
import { StorageContainer } from "../components/storageContainer";
import { OrganizerFooter, OrganizerHeader } from "../components/OrganizerChrome";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import SvgIcon from "@mui/material/SvgIcon";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

function LogoutIcon(props) {
    return (
        <SvgIcon viewBox="0 0 24 24" {...props}>
            <path d="M10 4h9v16h-9v-2h7V6h-7V4Zm-1.3 4.3 1.4 1.4L7.8 12l2.3 2.3-1.4 1.4L4 11l4.7-4.7Z" />
        </SvgIcon>
    );
}

function PlusIcon(props) {
    return (
        <SvgIcon viewBox="0 0 24 24" {...props}>
            <path d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6V5Z" />
        </SvgIcon>
    );
}

function PlantIllustration() {
    return (
        <Box aria-hidden="true" sx={{ display: { xs: "none", md: "block" }, position: "absolute", left: 24, bottom: 0, width: 210, height: 230 }}>
            <Box sx={{ position: "absolute", left: 22, bottom: 0, width: 80, height: 52, bgcolor: "#fff", borderRadius: "0 0 10px 10px" }} />
            <Box sx={{ position: "absolute", left: 62, bottom: 52, width: 4, height: 150, bgcolor: "#619e8b", borderRadius: 4 }} />
            {[
                { left: 34, bottom: 118, rotate: -42, w: 38, h: 78 },
                { left: 75, bottom: 135, rotate: 42, w: 38, h: 74 },
                { left: 60, bottom: 168, rotate: 10, w: 34, h: 82 },
                { left: 20, bottom: 72, rotate: -48, w: 34, h: 76 },
                { left: 80, bottom: 82, rotate: 58, w: 30, h: 66 },
            ].map((leaf, index) => (
                <Box
                    key={index}
                    sx={{
                        position: "absolute",
                        left: leaf.left,
                        bottom: leaf.bottom,
                        width: leaf.w,
                        height: leaf.h,
                        bgcolor: "#77bd93",
                        borderRadius: "50% 50% 50% 4px",
                        opacity: 0.94,
                        transform: `rotate(${leaf.rotate}deg)`,
                        boxShadow: "inset 0 -12px 0 rgba(55, 122, 97, 0.12)",
                    }}
                />
            ))}
        </Box>
    );
}

function BoxesIllustration() {
    const boxStyles = {
        position: "absolute",
        borderRadius: "5px 5px 8px 8px",
        boxShadow: "inset 0 -8px 0 rgba(42, 42, 96, 0.08)",
    };

    return (
        <Box aria-hidden="true" sx={{ display: { xs: "none", md: "block" }, position: "absolute", right: 0, bottom: 0, width: 260, height: 210 }}>
            <Box sx={{ ...boxStyles, right: 0, bottom: 0, width: 112, height: 96, bgcolor: "#f7f6fd", border: "1px solid #e3e0f3" }} />
            <Box sx={{ ...boxStyles, right: 112, bottom: 0, width: 96, height: 94, bgcolor: "#7ea2ea" }} />
            <Box sx={{ ...boxStyles, right: 12, bottom: 96, width: 144, height: 90, bgcolor: "#a995df" }} />
            <Box sx={{ position: "absolute", right: 0, bottom: 74, width: 112, height: 20, bgcolor: "#ffffff", borderRadius: 2 }} />
            <Box sx={{ position: "absolute", right: 112, bottom: 74, width: 96, height: 20, bgcolor: "#7398df", borderRadius: 2 }} />
            <Box sx={{ position: "absolute", right: 12, bottom: 166, width: 144, height: 20, bgcolor: "#b9a9ec", borderRadius: 2 }} />
        </Box>
    );
}

export function MyOrganizer({ organizerItems }) {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <Box sx={{ width: "100%", minHeight: "100svh", bgcolor: "#f8f9fd", color: "#090927" }}>
            <OrganizerHeader user={user} />

            <Box component="main" sx={{ width: "100%", bgcolor: "#fff" }}>
                <Box
                    sx={{
                        position: "relative",
                        overflow: "hidden",
                        minHeight: { xs: 330, sm: 380 },
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderBottom: "1px solid #eceef6",
                        background: "linear-gradient(180deg, #fbfcff 0%, #f7f8fe 100%)",
                    }}
                >
                    <Box sx={{ position: "absolute", left: { xs: -80, sm: -48 }, top: { xs: 74, sm: 98 }, width: { xs: 210, sm: 310 }, height: { xs: 210, sm: 310 }, bgcolor: "#eff1fc", borderRadius: "42% 58% 36% 64%" }} />
                    <Box sx={{ position: "absolute", right: { xs: -86, sm: -16 }, top: { xs: 112, sm: 110 }, width: { xs: 220, sm: 330 }, height: { xs: 220, sm: 300 }, bgcolor: "#f0f1fc", borderRadius: "50% 35% 50% 36%" }} />
                    <PlantIllustration />
                    <BoxesIllustration />

                    <Stack alignItems="center" spacing={{ xs: 2.25, sm: 3 }} sx={{ position: "relative", zIndex: 1, px: 2, maxWidth: 720, textAlign: "center" }}>
                        <Typography component="h1" sx={{ color: "#090927", fontSize: { xs: 46, sm: 68, md: 78 }, fontWeight: 700, lineHeight: 1, letterSpacing: 0, m: 0 }}>
                            My Organizer
                        </Typography>
                        <Typography sx={{ color: "#5f6386", fontSize: { xs: 17, sm: 24 }, lineHeight: 1.35, letterSpacing: 0 }}>
                            Welcome to your personal organizer!
                        </Typography>
                        <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 1.5, sm: 3 }} sx={{ width: { xs: "100%", sm: "auto" }, pt: 1 }}>
                            <Button
                                onClick={handleLogout}
                                variant="outlined"
                                startIcon={<LogoutIcon />}
                                sx={{
                                    minWidth: { xs: "100%", sm: 150 },
                                    height: 52,
                                    borderRadius: 1.5,
                                    borderColor: "#c7c9ef",
                                    color: "#4c47b9",
                                    bgcolor: "rgba(255,255,255,0.72)",
                                    fontSize: 16,
                                    fontWeight: 700,
                                    textTransform: "none",
                                    "&:hover": { borderColor: "#4c47d8", bgcolor: "#fff" },
                                }}
                            >
                                Logout
                            </Button>
                            <Button
                                onClick={() => navigate("/organizer/add")}
                                variant="contained"
                                startIcon={<PlusIcon />}
                                sx={{
                                    minWidth: { xs: "100%", sm: 196 },
                                    height: 52,
                                    borderRadius: 1.5,
                                    bgcolor: "#523bd6",
                                    color: "white",
                                    fontSize: 16,
                                    fontWeight: 700,
                                    textTransform: "none",
                                    boxShadow: "none",
                                    "&:hover": { bgcolor: "#442fc0", boxShadow: "0 10px 24px rgba(82, 59, 214, 0.22)" },
                                }}
                            >
                                Add Organizer
                            </Button>
                        </Stack>
                    </Stack>
                </Box>

                <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 5 }, px: { xs: 2, sm: 4 } }}>
                    <StorageContainer organizerItems={organizerItems} />
                </Container>
            </Box>

            <OrganizerFooter active="Home" />
        </Box>
    );
}
