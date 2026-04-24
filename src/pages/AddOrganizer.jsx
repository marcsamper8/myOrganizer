import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OrganizerItemFields } from "../components/OrganizerItemFields";
import { OrganizerFooter, OrganizerHeader } from "../components/OrganizerChrome";
import api from "../utils/axios";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { getStoredUser } from "../utils/authStorage";

const initialFormValues = {
    storageName: "",
    location: "",
    qrCode: "",
    color: "#7b63cf",
};

const createEmptyOrganizerItem = () => ({
    itemName: "",
    itemType: "",
    quantity: 1,
});

export function AddOrganizer() {
    const navigate = useNavigate();
    const user = getStoredUser();
    const [formValues, setFormValues] = useState(initialFormValues);
    const [items, setItems] = useState([createEmptyOrganizerItem()]);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState("");

    const onChangeHandler = (event) => {
        const { name, value } = event.target;

        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const onItemChangeHandler = (index, field, value) => {
        setItems((prev) =>
            prev.map((item, itemIndex) =>
                itemIndex === index
                    ? {
                        ...item,
                        [field]: value,
                    }
                    : item
            )
        );
    };

    const addItemField = () => {
        setItems((prev) => [...prev, createEmptyOrganizerItem()]);
    };

    const removeItemField = (index) => {
        setItems((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
    };

    const buildPayload = () => {
        const payload = {
            storageName: formValues.storageName.trim(),
            location: formValues.location.trim(),
            qrCode: formValues.qrCode.trim(),
            color: formValues.color.trim(),
            items: items
                .filter((item) => item.itemName.trim())
                .map((item) => ({
                    itemName: item.itemName.trim(),
                    itemType: item.itemType.trim(),
                    quantity: Number(item.quantity) || 0,
                })),
        };

        return payload;
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (!formValues.storageName.trim()) {
            setError("Storage name is required.");
            return;
        }

        setIsSaving(true);
        setError("");

        try {
            await api.post("/organize-items", buildPayload());
            navigate("/organizer");
        } catch (requestError) {
            setError(requestError.response?.data?.message || "Failed to add organizer.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Box sx={{ minHeight: "100svh", bgcolor: "#f7f8fc", color: "#090927", display: "flex", flexDirection: "column" }}>
            <OrganizerHeader user={user} />

            <Box component="main" sx={{ flex: 1, py: { xs: 3, sm: 5 } }}>
                <Container maxWidth={false} sx={{ px: { xs: 2, sm: 4, lg: 5 }, maxWidth: 1180 }}>
                    <Stack spacing={1.5} sx={{ mb: { xs: 3, sm: 4 } }}>
                        <Typography component="h1" sx={{ color: "#090927", fontSize: { xs: 38, sm: 56 }, fontWeight: 700, lineHeight: 1.05, letterSpacing: 0, m: 0 }}>
                            Add Organizer
                        </Typography>
                        <Typography sx={{ color: "#5f6386", fontSize: { xs: 17, sm: 21 }, lineHeight: 1.4 }}>
                            Create a storage space and add as many starting items as you need.
                        </Typography>
                    </Stack>

                    <Paper
                        component="form"
                        onSubmit={onSubmitHandler}
                        elevation={0}
                        sx={{
                            border: "1px solid #e4e7f1",
                            borderRadius: 2,
                            boxShadow: "0 8px 22px rgba(33, 34, 65, 0.08)",
                            bgcolor: "#fff",
                            p: { xs: 2.5, sm: 4 },
                        }}
                    >
                        <Stack spacing={4}>
                            <Box>
                                <Typography component="h2" sx={{ color: "#090927", fontSize: { xs: 24, sm: 30 }, fontWeight: 700, lineHeight: 1.2, letterSpacing: 0, m: 0, mb: 2.5 }}>
                                    Organizer Details
                                </Typography>
                                <Box
                                    sx={{
                                        display: "grid",
                                        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                                        gap: 2.5,
                                    }}
                                >
                                    <TextField
                                        required
                                        fullWidth
                                        name="storageName"
                                        label="Storage Name"
                                        value={formValues.storageName}
                                        onChange={onChangeHandler}
                                    />
                                    <TextField
                                        fullWidth
                                        name="location"
                                        label="Location"
                                        value={formValues.location}
                                        onChange={onChangeHandler}
                                    />
                                    <TextField
                                        fullWidth
                                        name="qrCode"
                                        label="QR Code"
                                        value={formValues.qrCode}
                                        onChange={onChangeHandler}
                                    />
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <TextField
                                            fullWidth
                                            name="color"
                                            label="Color"
                                            value={formValues.color}
                                            onChange={onChangeHandler}
                                        />
                                        <Box
                                            component="input"
                                            type="color"
                                            name="color"
                                            value={formValues.color}
                                            onChange={onChangeHandler}
                                            aria-label="Organizer color"
                                            sx={{
                                                width: 56,
                                                height: 56,
                                                p: 0.5,
                                                border: "1px solid #cfd3e5",
                                                borderRadius: 1,
                                                bgcolor: "#fff",
                                                cursor: "pointer",
                                            }}
                                        />
                                    </Stack>
                                </Box>
                            </Box>

                            <Divider />

                            <Box>
                                <Typography component="h2" sx={{ color: "#090927", fontSize: { xs: 24, sm: 30 }, fontWeight: 700, lineHeight: 1.2, letterSpacing: 0, m: 0, mb: 1 }}>
                                    Items
                                </Typography>
                                <Typography sx={{ color: "#6a708c", fontSize: 16, mb: 2.5 }}>
                                    Optional. Rows without an item name will not be saved.
                                </Typography>
                                <Stack spacing={2.5}>
                                    {items.map((item, index) => (
                                        <OrganizerItemFields
                                            key={index}
                                            item={item}
                                            index={index}
                                            onChange={onItemChangeHandler}
                                            onRemove={removeItemField}
                                            canRemove={items.length > 1}
                                        />
                                    ))}
                                    <Button
                                        type="button"
                                        variant="outlined"
                                        onClick={addItemField}
                                        sx={{
                                            alignSelf: "flex-start",
                                            minWidth: 150,
                                            height: 46,
                                            borderRadius: 1.5,
                                            borderColor: "#c7c9ef",
                                            color: "#4c47b9",
                                            fontWeight: 700,
                                            textTransform: "none",
                                        }}
                                    >
                                        Add Item
                                    </Button>
                                </Stack>
                            </Box>

                            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="flex-end">
                                <Button
                                    type="button"
                                    variant="outlined"
                                    onClick={() => navigate("/organizer")}
                                    sx={{
                                        minWidth: { xs: "100%", sm: 140 },
                                        height: 52,
                                        borderRadius: 1.5,
                                        borderColor: "#c7c9ef",
                                        color: "#4c47b9",
                                        fontWeight: 700,
                                        textTransform: "none",
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={isSaving}
                                    sx={{
                                        minWidth: { xs: "100%", sm: 180 },
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
                                    {isSaving ? "Saving..." : "Save Organizer"}
                                </Button>
                            </Stack>
                        </Stack>
                    </Paper>
                </Container>
            </Box>

            <OrganizerFooter active="Organizers" />

            <Snackbar open={Boolean(error)} autoHideDuration={4000} onClose={() => setError("")} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                <Alert severity="error" variant="filled" onClose={() => setError("")}>
                    {error}
                </Alert>
            </Snackbar>
        </Box>
    );
}
