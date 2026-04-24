import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import SvgIcon from "@mui/material/SvgIcon";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { checkColorIfLight } from '../utils/customUtils'


function BriefcaseIcon(props) {
    return (
        <SvgIcon viewBox="0 0 24 24" {...props}>
            <path d="M8 6V4.8A2.8 2.8 0 0 1 10.8 2h2.4A2.8 2.8 0 0 1 16 4.8V6h2.5A2.5 2.5 0 0 1 21 8.5v9A2.5 2.5 0 0 1 18.5 20h-13A2.5 2.5 0 0 1 3 17.5v-9A2.5 2.5 0 0 1 5.5 6H8Zm2-1.2V6h4V4.8a.8.8 0 0 0-.8-.8h-2.4a.8.8 0 0 0-.8.8ZM5 12v5.5a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5V12h-5v1.5A1.5 1.5 0 0 1 12.5 15h-1A1.5 1.5 0 0 1 10 13.5V12H5Zm0-3.5V10h14V8.5a.5.5 0 0 0-.5-.5h-13a.5.5 0 0 0-.5.5Z" />
        </SvgIcon>
    );
}

function HomeIcon(props) {
    return (
        <SvgIcon viewBox="0 0 24 24" {...props}>
            <path d="m12 3 9 8h-3v9h-5v-6h-2v6H6v-9H3l9-8Zm0 2.7L8 9.25V18h1v-6h6v6h1V9.25l-4-3.55Z" />
        </SvgIcon>
    );
}

function CubeIcon(props) {
    return (
        <SvgIcon viewBox="0 0 24 24" {...props}>
            <path d="m12 2 9 5v10l-9 5-9-5V7l9-5Zm0 2.3L6.15 7.55 12 10.8l5.85-3.25L12 4.3ZM5 9.25v6.55l6 3.35V12.6L5 9.25Zm8 9.9 6-3.35V9.25l-6 3.35v6.55Z" />
        </SvgIcon>
    );
}

function ArrowRightIcon(props) {
    return (
        <SvgIcon viewBox="0 0 24 24" {...props}>
            <path d="m13.2 5.8 5.2 5.2H4v2h14.4l-5.2 5.2 1.4 1.4L22.2 12l-7.6-7.6-1.4 1.4Z" />
        </SvgIcon>
    );
}

function ChevronRightIcon(props) {
    return (
        <SvgIcon viewBox="0 0 24 24" {...props}>
            <path d="m9.4 6 6 6-6 6L8 16.6l4.6-4.6L8 7.4 9.4 6Z" />
        </SvgIcon>
    );
}

function ToolboxArt({ tone = "purple" }) {
    const isBlue = tone === "blue";
    const main = isBlue ? "#2f7df0" : "#7b63cf";
    const top = isBlue ? "#61a0ff" : "#9b86df";
    const bg = isBlue ? "#edf5ff" : "#f3efff";
    const border = isBlue ? "#d9e8ff" : "#e7defa";

    return (
        <Box
            aria-hidden="true"
            sx={{
                width: { xs: 118, sm: 176 },
                aspectRatio: "1 / 1",
                borderRadius: { xs: 5, sm: 7 },
                display: "grid",
                placeItems: "center",
                bgcolor: bg,
                border: `1px solid ${border}`,
                flex: "0 0 auto",
            }}
        >
            <Box sx={{ position: "relative", width: "66%", height: "56%" }}>
                <Box
                    sx={{
                        position: "absolute",
                        left: "29%",
                        top: 0,
                        width: "42%",
                        height: "28%",
                        border: `7px solid ${main}`,
                        borderBottom: 0,
                        borderRadius: "14px 14px 0 0",
                    }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: "68%",
                        bgcolor: main,
                        borderRadius: "6px 6px 10px 10px",
                        boxShadow: "inset 0 -7px 0 rgba(5, 18, 70, 0.18)",
                    }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: "30%",
                        height: "32%",
                        bgcolor: top,
                        borderRadius: "6px",
                        border: `2px solid ${main}`,
                    }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        left: "42%",
                        top: "52%",
                        width: "17%",
                        height: "26%",
                        bgcolor: "#fff",
                        border: `3px solid ${top}`,
                        borderRadius: "4px",
                    }}
                />
            </Box>
        </Box>
    );
}

export function StorageContainer({ organizerItems = [] }) {
    const navigate = useNavigate();


    const storageOnClick = (storageId) => {
        navigate(`/items/${storageId}`);
    };

    return (
        <Stack
            component="section"
            spacing={{ xs: 2.5, sm: 4 }}
            sx={{
                width: "100%",
                alignItems: "center",
                mx: "auto",
                px: "2"
            }}
        >
            {organizerItems.map((organizedItems, index) => {
                const itemCount = (organizedItems.items || []).length;
                const tone = index % 2 === 0 ? "purple" : "blue";
                const accent = tone === "purple" ? "#523bd6" : "#2474ee";
                const accentSoft = tone === "purple" ? "#f4f0ff" : "#eef6ff";

                return (
                    <Paper
                        key={organizedItems._id}
                        component="article"
                        elevation={0}
                        sx={{
                            width: "100%",
                            maxWidth: 1010,
                            p: { xs: 2.25, sm: 3.5 },
                            borderRadius: 2,
                            border: `1px solid ${organizedItems.color}`,
                            boxShadow: "0 8px 22px rgba(33, 34, 65, 0.08)",
                        }}
                    >
                        <Stack
                            direction={{ xs: "column", sm: "row" }}
                            alignItems={{ xs: "stretch", sm: "center" }}
                            spacing={{ xs: 2.5, sm: 4 }}
                        >

                            <Stack
                                spacing={{ xs: 1.8, sm: 2.3 }}
                                sx={{
                                    flex: 1,
                                    minWidth: 0,
                                    textAlign: { xs: "center", sm: "left" },

                                }}
                            >
                                <Typography
                                    component="h2"
                                    sx={{
                                        color: "#090927",
                                        fontSize: { xs: 36, sm: 44 },
                                        fontWeight: 700,
                                        lineHeight: 1.1,
                                        letterSpacing: 0,
                                        m: 0,
                                        overflowWrap: "anywhere",
                                    }}
                                >
                                    {organizedItems.storageName}
                                </Typography>

                                <Stack
                                    spacing={1.5}
                                    sx={{
                                        alignItems: { xs: "center", sm: "flex-start" },
                                    }}
                                >
                                    <Stack direction="row" spacing={1.5} alignItems="center">
                                        <HomeIcon sx={{ color: "#5f6386", fontSize: 27 }} />
                                        <Typography sx={{ color: "#555b7a", fontSize: { xs: 18, sm: 23 }, lineHeight: 1.2 }}>
                                            {organizedItems.location || "Storage room"}
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" spacing={1.5} alignItems="center">
                                        <CubeIcon sx={{ color: "#5f6386", fontSize: 27 }} />
                                        <Typography sx={{ color: "#555b7a", fontSize: { xs: 18, sm: 23 }, lineHeight: 1.2 }}>
                                            {itemCount} items
                                        </Typography>
                                    </Stack>
                                </Stack>

                                <Button
                                    onClick={() => storageOnClick(organizedItems._id)}
                                    variant="outlined"
                                    endIcon={<ArrowRightIcon />}
                                    sx={{
                                        alignSelf: { xs: "center", sm: "flex-start" },
                                        mt: { xs: 0.5, sm: 1 },
                                        minWidth: 182,
                                        height: 56,
                                        borderRadius: 1.5,
                                        color: `${checkColorIfLight(organizedItems.color) ? "Black" : "White"}`,
                                        borderColor: `${organizedItems.color}`,
                                        bgcolor: `${organizedItems.color}`,
                                        fontSize: 17,
                                        fontWeight: 700,
                                        textTransform: "none",
                                        "&:hover": {
                                            borderColor: accent,
                                            bgcolor: accentSoft,
                                        },
                                    }}
                                >
                                    View Items
                                </Button>
                            </Stack>


                        </Stack>
                    </Paper>
                );
            })}
        </Stack >
    );
}
