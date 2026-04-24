import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { StorageContainer } from "../components/storageContainer";
import { OrganizerFooter, OrganizerHeader } from "../components/OrganizerChrome";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "@mui/material/Snackbar";
import SvgIcon from "@mui/material/SvgIcon";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Skeleton from '@mui/material/Skeleton';
import { getStoredUser } from "../utils/authStorage";

function PlusIcon(props) {
    return (
        <SvgIcon viewBox="0 0 24 24" {...props}>
            <path d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6V5Z" />
        </SvgIcon>
    );
}

function SearchIcon(props) {
    return (
        <SvgIcon viewBox="0 0 24 24" {...props}>
            <path d="M10.5 4a6.5 6.5 0 0 1 5.12 10.5l4.44 4.44-1.42 1.42-4.44-4.44A6.5 6.5 0 1 1 10.5 4Zm0 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z" />
        </SvgIcon>
    );
}

function QrScanIcon(props) {
    return (
        <SvgIcon viewBox="0 0 24 24" {...props}>
            <path d="M4 4h7v7H4V4Zm2 2v3h3V6H6Zm7-2h7v7h-7V4Zm2 2v3h3V6h-3ZM4 13h7v7H4v-7Zm2 2v3h3v-3H6Zm8-2h2v2h-2v-2Zm4 0h2v3h-3v-2h1v-1Zm-4 4h2v3h-2v-3Zm4 1h2v2h-2v-2Z" />
        </SvgIcon>
    );
}

const qrScannerConfig = {
    formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
    verbose: false,
};

const clearScanner = async (scanner) => {
    if (!scanner) {
        return;
    }

    try {
        if (scanner.isScanning) {
            await scanner.stop();
        }
    } catch {
        // The library throws if stop is called after the scanner already stopped.
    }

    try {
        scanner.clear();
    } catch {
        // Clear can also throw when no camera session was created.
    }
};

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

export function MyOrganizer({ organizerItems, isLoading = false }) {
    const navigate = useNavigate();
    const user = getStoredUser();
    const scannerRef = useRef(null);
    const fileInputRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [isScannerOpen, setIsScannerOpen] = useState(false);
    const [scanError, setScanError] = useState("");

    const filteredOrganizerItems = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        if (!query) {
            return organizerItems;
        }

        return organizerItems.filter((storage) => {
            const storageText = [
                storage.storageName,
                storage.location,
                storage.qrCode,
                ...(storage.items || []).flatMap((item) => [
                    item.itemName,
                    item.itemType,
                ]),
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

            return storageText.includes(query);
        });
    }, [organizerItems, searchQuery]);

    const closeScanner = () => {
        setIsScannerOpen(false);
    };

    const findScannedStorage = useMemo(() => {
        return (value) => {
            const normalizedValue = value.trim().toLowerCase();

            return organizerItems.find((storage) =>
                [storage._id, storage.storageName, storage.qrCode]
                    .filter(Boolean)
                    .some((field) => String(field).trim().toLowerCase() === normalizedValue)
            );
        };
    }, [organizerItems]);

    const handleScannedValue = useCallback((value) => {
        const matchedStorage = findScannedStorage(value);

        if (matchedStorage) {
            setIsScannerOpen(false);
            navigate(`/items/${matchedStorage._id}`);
        } else {
            setScanError("No organizer matches this QR code.");
        }
    }, [findScannedStorage, navigate]);

    useEffect(() => {
        if (!isScannerOpen) {
            return undefined;
        }

        let isActive = true;

        const stopScanner = () => {
            if (!scannerRef.current) {
                return Promise.resolve();
            }

            const scanner = scannerRef.current;
            scannerRef.current = null;

            return clearScanner(scanner);
        };

        const startScanner = async () => {
            try {
                if (!isActive) {
                    return;
                }

                const scanner = new Html5Qrcode("qr-reader", qrScannerConfig);
                scannerRef.current = scanner;
                const cameras = await Html5Qrcode.getCameras();
                const preferredCamera = cameras.find((camera) =>
                    /back|rear|environment/i.test(camera.label)
                ) || cameras.at(-1);
                const cameraConfig = preferredCamera?.id || { facingMode: "environment" };

                await scanner.start(
                    cameraConfig,
                    {
                        fps: 10,
                        qrbox: (viewfinderWidth, viewfinderHeight) => {
                            const size = Math.floor(Math.min(viewfinderWidth, viewfinderHeight) * 0.78);
                            return { width: size, height: size };
                        },
                    },
                    async (decodedText) => {
                        await stopScanner();
                        handleScannedValue(decodedText);
                    }
                );
            } catch (error) {
                setScanError(error.message || "Unable to open the camera. Check camera permission and HTTPS.");
            }
        };

        startScanner();

        return () => {
            isActive = false;
            stopScanner();
        };
    }, [isScannerOpen, handleScannedValue]);

    const onScanImageFile = async (event) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        try {
            if (scannerRef.current) {
                await clearScanner(scannerRef.current);
                scannerRef.current = null;
            }

            const scanner = new Html5Qrcode("qr-reader", qrScannerConfig);
            const decodedText = await scanner.scanFile(file, true);
            await clearScanner(scanner);
            handleScannedValue(decodedText);
        } catch {
            setScanError("Could not read a QR code from that image. Use a clear, uncropped QR image.");
        } finally {
            event.target.value = "";
        }
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
                            <Button
                                onClick={() => {
                                    setScanError("");
                                    setIsScannerOpen(true);
                                }}
                                variant="outlined"
                                startIcon={<QrScanIcon />}
                                sx={{
                                    display: { xs: "inline-flex", sm: "none" },
                                    minWidth: "100%",
                                    height: 52,
                                    borderRadius: 1.5,
                                    borderColor: "#c7c9ef",
                                    color: "#4c47b9",
                                    fontSize: 16,
                                    fontWeight: 700,
                                    textTransform: "none",
                                }}
                            >
                                Scan QR Code
                            </Button>
                        </Stack>
                    </Stack>
                </Box>

                <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 5 }, px: { xs: 5, sm: 4 } }}>
                    <TextField
                        fullWidth
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        placeholder="Search storage or items"
                        sx={{
                            mb: { xs: 2.5, sm: 4 },
                            bgcolor: "#fff",
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                            },
                        }}
                        InputProps={{
                            startAdornment: <SearchIcon sx={{ color: "#6a708c", mr: 1.5 }} />,
                        }}
                    />
                    {isLoading ?
                        <Skeleton variant="rectangular" height={120} sx={{
                            borderRadius: "10px",
                        }} /> :

                        <StorageContainer organizerItems={filteredOrganizerItems} />
                    }

                    {organizerItems.length === 0 && !isLoading &&
                        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 13, letterSpacing: 1.2, mb: 0 }}>
                            Start to organize your things now
                        </Typography>
                    }
                    {organizerItems.length > 0 && filteredOrganizerItems.length === 0 && !isLoading &&
                        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 16, mb: 0 }}>
                            No storage matches your search.
                        </Typography>
                    }

                </Container>
            </Box>

            <OrganizerFooter active="Home" />

            <Dialog open={isScannerOpen} onClose={closeScanner} fullWidth maxWidth="xs">
                <DialogTitle>Scan QR Code</DialogTitle>
                <DialogContent>
                    <Box
                        id="qr-reader"
                        sx={{
                            width: "100%",
                            minHeight: 280,
                            borderRadius: 2,
                            bgcolor: "#090927",
                            overflow: "hidden",
                            "& video": {
                                width: "100% !important",
                            },
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        component="label"
                        sx={{ textTransform: "none", fontWeight: 700 }}
                    >
                        Scan Image
                        <Box
                            component="input"
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={onScanImageFile}
                            sx={{ display: "none" }}
                        />
                    </Button>
                    <Button onClick={closeScanner} sx={{ textTransform: "none", fontWeight: 700 }}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={Boolean(scanError)} autoHideDuration={4000} onClose={() => setScanError("")} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                <Alert severity="error" variant="filled" onClose={() => setScanError("")}>
                    {scanError}
                </Alert>
            </Snackbar>
        </Box>
    );
}
