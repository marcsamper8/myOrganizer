import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "qrcode";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import SvgIcon from "@mui/material/SvgIcon";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { checkColorIfLight } from '../utils/customUtils'


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

function StorageQrCode({ storage, onOpenStorage }) {
    const [generatedQrImage, setGeneratedQrImage] = useState("");
    const qrImage = storage.qrCodeImage || generatedQrImage;
    const qrValue = storage.qrCode || storage._id;

    useEffect(() => {
        let isActive = true;

        if (storage.qrCodeImage || !qrValue) {
            return undefined;
        }

        QRCode.toDataURL(qrValue, {
            width: 512,
            margin: 4,
            errorCorrectionLevel: "H",
            color: {
                dark: "#090927",
                light: "#ffffff",
            },
        }).then((image) => {
            if (isActive) {
                setGeneratedQrImage(image);
            }
        });

        return () => {
            isActive = false;
        };
    }, [qrValue, storage.qrCodeImage]);

    return (
        <Box
            component="button"
            type="button"
            onClick={() => onOpenStorage(storage._id)}
            aria-label={`Open ${storage.storageName} from QR code`}
            sx={{
                flex: "0 0 auto",
                order: 0,
                border: 0,
                p: 0,
                m: 0,
                bgcolor: "transparent",
                cursor: "pointer",
                borderRadius: 1,
                "&:focus-visible": {
                    outline: "3px solid rgba(82, 59, 214, 0.45)",
                    outlineOffset: 4,
                },
            }}
        >
            {qrImage ? (
                <Box
                    component="img"
                    src={qrImage}
                    alt={`${storage.storageName} QR code`}
                    sx={{
                        width: { xs: 112, sm: 150 },
                        height: { xs: 112, sm: 150 },
                        objectFit: "contain",
                        bgcolor: "#fff",
                        borderRadius: 1,
                        display: "block",
                    }}
                />
            ) : (
                <Box
                    sx={{
                        width: { xs: 112, sm: 150 },
                        height: { xs: 112, sm: 150 },
                        display: "grid",
                        placeItems: "center",
                        bgcolor: "#fff",
                        borderRadius: 1,
                        color: "#6a708c",
                        fontSize: 13,
                        fontWeight: 700,
                    }}
                >
                    Loading
                </Box>
            )}
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
                            p: { xs: 2, sm: 2.5 },
                            borderRadius: 2,
                            border: `1px solid ${organizedItems.color}`,
                            boxShadow: "0 8px 22px rgba(33, 34, 65, 0.08)",
                        }}
                    >
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="flex-start"
                            spacing={{ xs: 1.75, sm: 3 }}
                            sx={{ minHeight: 0 }}
                        >

                            <StorageQrCode storage={organizedItems} onOpenStorage={storageOnClick} />

                            <Stack
                                spacing={{ xs: 1.8, sm: 2.3 }}
                                sx={{
                                    flex: "1 1 auto",
                                    minWidth: 0,
                                    textAlign: "left",
                                    order: 1,

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
                                        alignItems: "flex-start",
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
                                            {itemCount} {itemCount > 1 ? 'items' : 'item'}
                                        </Typography>
                                    </Stack>
                                </Stack>

                                <Button
                                    onClick={() => storageOnClick(organizedItems._id)}
                                    variant="outlined"
                                    endIcon={<ArrowRightIcon />}
                                    sx={{
                                        alignSelf: "flex-start",
                                        mt: 0,
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
                                    {itemCount > 1 ? 'View Items' : 'View Item'}
                                </Button>
                            </Stack>


                        </Stack>
                    </Paper>
                );
            })}
        </Stack >
    );
}
