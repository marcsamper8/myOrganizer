import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ItemContainer } from "../components/ItemContainer";
import { OrganizerFooter, OrganizerHeader } from "../components/OrganizerChrome";
import api from "../utils/axios";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Link from "@mui/material/Link";
import Snackbar from "@mui/material/Snackbar";
import SvgIcon from "@mui/material/SvgIcon";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { getStoredUser } from "../utils/authStorage";

function BackIcon(props) {
    return (
        <SvgIcon viewBox="0 0 24 24" {...props}>
            <path d="M11 5.4 12.4 6.8 8.2 11H20v2H8.2l4.2 4.2L11 18.6 4.4 12 11 5.4Z" />
        </SvgIcon>
    );
}

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

function ToolboxArt() {
    return (
        <Box aria-hidden="true" sx={{ width: { xs: 132, sm: 168 }, aspectRatio: "1 / 1", borderRadius: { xs: 5, sm: 7 }, display: "grid", placeItems: "center", bgcolor: "#f3efff", flex: "0 0 auto" }}>
            <BriefcaseIcon sx={{ color: "#7b63cf", fontSize: { xs: 72, sm: 98 } }} />
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
        <Box aria-hidden="true" sx={{ display: { xs: "none", md: "block" }, position: "absolute", right: 0, bottom: 0, width: 280, height: 220 }}>
            <Box sx={{ ...boxStyles, right: 0, bottom: 0, width: 110, height: 96, bgcolor: "#f7f6fd", border: "1px solid #e3e0f3" }} />
            <Box sx={{ ...boxStyles, right: 106, bottom: 0, width: 96, height: 98, bgcolor: "#76a6ed" }} />
            <Box sx={{ ...boxStyles, right: 0, bottom: 98, width: 150, height: 92, bgcolor: "#a79bef" }} />
            <Box sx={{ position: "absolute", right: 0, bottom: 76, width: 110, height: 20, bgcolor: "#ffffff", borderRadius: 2 }} />
            <Box sx={{ position: "absolute", right: 106, bottom: 78, width: 96, height: 20, bgcolor: "#6fa0ea", borderRadius: 2 }} />
            <Box sx={{ position: "absolute", right: 0, bottom: 170, width: 150, height: 20, bgcolor: "#b9a9ec", borderRadius: 2 }} />
        </Box>
    );
}

const emptyNewItem = {
    itemName: "",
    itemType: "",
    quantity: 1,
};

export function Items({ organizerItems, setOrganizerItems }) {
    const navigate = useNavigate();
    const { storageId } = useParams();
    const selectedStorage = organizerItems.find((item) => item._id === storageId);
    const items = selectedStorage?.items || [];
    const user = getStoredUser();
    const [removalTarget, setRemovalTarget] = useState(null);
    const [removeQuantity, setRemoveQuantity] = useState(1);
    const [isRemoving, setIsRemoving] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isAddItemOpen, setIsAddItemOpen] = useState(false);
    const [newItem, setNewItem] = useState(emptyNewItem);
    const [isSavingItem, setIsSavingItem] = useState(false);

    const closeRemovalDialog = () => {
        if (isRemoving) {
            return;
        }

        setRemovalTarget(null);
    };

    const startRemoveItem = (itemIndex) => {
        const item = items[itemIndex];
        const quantity = Number(item?.quantity ?? item?.qty ?? 1) || 1;

        setRemovalTarget({
            itemIndex,
            itemName: item?.itemName || item?.name || "this item",
            quantity,
        });
        setRemoveQuantity(quantity);
    };

    const openAddItemDialog = () => {
        setNewItem(emptyNewItem);
        setError("");
        setIsAddItemOpen(true);
    };

    const closeAddItemDialog = () => {
        if (!isSavingItem) {
            setIsAddItemOpen(false);
        }
    };

    const onNewItemChange = (event) => {
        const { name, value } = event.target;

        setNewItem((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const saveNewItem = async () => {
        if (!selectedStorage) {
            return;
        }

        if (!newItem.itemName.trim()) {
            setError("Add a name for the item first.");
            return;
        }

        const itemToAdd = {
            itemName: newItem.itemName.trim(),
            itemType: newItem.itemType.trim(),
            quantity: Math.max(Number(newItem.quantity) || 1, 1),
        };

        setIsSavingItem(true);
        setError("");

        try {
            const response = await api.put(`/organize-items/${selectedStorage._id}`, {
                items: [...items, itemToAdd],
                lastUpdate: new Date().toISOString(),
            });

            setOrganizerItems((prev) =>
                prev.map((storage) =>
                    storage._id === selectedStorage._id ? response.data : storage
                )
            );
            setSuccessMessage(`${itemToAdd.itemName} was added.`);
            setIsAddItemOpen(false);
            setNewItem(emptyNewItem);
        } catch (requestError) {
            setError(requestError.response?.data?.message || "Could not add this item. Please try again.");
        } finally {
            setIsSavingItem(false);
        }
    };

    const confirmRemoveItem = async () => {
        if (!selectedStorage || removalTarget === null) {
            return;
        }

        const currentQuantity = removalTarget.quantity;
        const quantityToRemove = Math.min(Math.max(Number(removeQuantity) || currentQuantity, 1), currentQuantity);
        const isRemovingAll = quantityToRemove >= currentQuantity;
        const nextItems = items
            .map((item, index) => {
                if (index !== removalTarget.itemIndex) {
                    return item;
                }

                if (isRemovingAll) {
                    return null;
                }

                return {
                    ...item,
                    quantity: currentQuantity - quantityToRemove,
                };
            })
            .filter(Boolean);

        setIsRemoving(true);
        setError("");

        try {
            const response = await api.put(`/organize-items/${selectedStorage._id}`, {
                items: nextItems,
                lastUpdate: new Date().toISOString(),
            });

            setOrganizerItems((prev) =>
                prev.map((storage) =>
                    storage._id === selectedStorage._id ? response.data : storage
                )
            );
            setSuccessMessage(
                isRemovingAll
                    ? `${removalTarget.itemName} was removed.`
                    : `${quantityToRemove} ${removalTarget.itemName} removed.`
            );
            setRemovalTarget(null);
        } catch (requestError) {
            setError(requestError.response?.data?.message || "Failed to remove item.");
        } finally {
            setIsRemoving(false);
        }
    };

    return (
        <Box sx={{
            minHeight: "100svh",
            bgcolor: "#f7f8fc",
            color: "#090927",
            display: "flex",
            flexDirection: "column"
        }}>
            <OrganizerHeader user={user} />

            <Box component="main" sx={{ flex: 1, py: { xs: 3, sm: 5 } }}>
                <Container

                    sx={{
                        px: { xs: 2, sm: 4, lg: 5 }

                    }}>
                    <Link
                        component="button"
                        underline="none"
                        onClick={() => navigate("/organizer")}
                        sx={{ display: "inline-flex", alignItems: "center", gap: 1.2, color: "#6656dc", fontSize: { xs: 18, sm: 22 }, mb: { xs: 3, sm: 4 }, cursor: "pointer" }}
                    >
                        <BackIcon sx={{ fontSize: 26 }} />
                        Back to Organizers
                    </Link>

                    <Box
                        sx={{
                            position: "relative",
                            overflow: "hidden",
                            bgcolor: "#fff",
                            border: "1px solid #e4e7f1",
                            borderRadius: 2,
                            boxShadow: "0 6px 18px rgba(33, 34, 65, 0.06)",
                            minHeight: { xs: "auto", md: 270 },
                            p: { xs: 2.5, sm: 4 },
                            mb: { xs: 4, sm: 5 },
                        }}
                    >
                        <Box sx={{ position: "absolute", right: { xs: -80, md: 80 }, top: { xs: -90, md: 0 }, width: { xs: 220, md: 310 }, height: { xs: 220, md: 310 }, bgcolor: "#f0f1fc", borderRadius: "42% 58% 36% 64%" }} />
                        <BoxesIllustration />

                        <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 2.5, sm: 4 }} alignItems="center" sx={{ position: "relative", zIndex: 1 }}>

                            <Stack spacing={{ xs: 1.8, sm: 2 }} sx={{ textAlign: { xs: "center", sm: "left" }, minWidth: 0 }}>
                                <Typography component="h1" sx={{ color: "#090927", fontSize: { xs: 40, sm: 50 }, fontWeight: 700, lineHeight: 1.1, letterSpacing: 0, m: 0, overflowWrap: "anywhere" }}>
                                    {selectedStorage?.storageName || "Storage"}
                                </Typography>
                                <Stack spacing={1.5} sx={{ alignItems: { xs: "center", sm: "flex-start" } }}>
                                    <Stack direction="row" spacing={1.5} alignItems="center">
                                        <HomeIcon sx={{ color: "#545a79", fontSize: 30 }} />
                                        <Typography sx={{ color: "#555b7a", fontSize: { xs: 19, sm: 24 }, lineHeight: 1.2 }}>
                                            {selectedStorage?.location || "Storage room"}
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" spacing={1.5} alignItems="center">
                                        <CubeIcon sx={{ color: "#545a79", fontSize: 30 }} />
                                        <Typography sx={{ color: "#555b7a", fontSize: { xs: 19, sm: 24 }, lineHeight: 1.2 }}>
                                            {items.length} {items.length > 1 ? 'items' : 'item'}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Box>

                    <Typography component="h2" sx={{ color: "#090927", fontSize: { xs: 28, sm: 34 }, fontWeight: 700, lineHeight: 1.2, letterSpacing: 0, m: 0 }}>
                        {items.length > 1 ? 'Items' : 'Item'} in {selectedStorage?.storageName || "Storage"}
                    </Typography>
                    <Button
                        type="button"
                        variant="contained"
                        onClick={openAddItemDialog}
                        sx={{
                            mt: 2,
                            minWidth: 150,
                            height: 48,
                            borderRadius: 1.5,
                            bgcolor: "#523bd6",
                            color: "white",
                            fontWeight: 700,
                            textTransform: "none",
                            boxShadow: "none",
                            "&:hover": { bgcolor: "#442fc0" },
                        }}
                    >
                        Add Item
                    </Button>
                    <Box sx={{
                        height: 1,
                        bgcolor: "#e4e7f1",
                        my: { xs: 2.5, sm: 3.5 }
                    }}
                    />

                    <ItemContainer items={items} onRemoveItem={startRemoveItem} isUpdating={isRemoving} />
                </Container>
            </Box>

            <OrganizerFooter active="Organizers" />

            <Dialog open={isAddItemOpen} onClose={closeAddItemDialog} fullWidth maxWidth="xs">
                <DialogTitle>Add item</DialogTitle>
                <DialogContent>
                    <Stack spacing={2.5} sx={{ pt: 1 }}>
                        <Typography sx={{ color: "#555b7a", fontSize: 16 }}>
                            Add a new item to {selectedStorage?.storageName || "this organizer"}.
                        </Typography>
                        <TextField
                            required
                            fullWidth
                            name="itemName"
                            label="Item Name"
                            value={newItem.itemName}
                            onChange={onNewItemChange}
                        />
                        <TextField
                            fullWidth
                            name="itemType"
                            label="Item Type"
                            value={newItem.itemType}
                            onChange={onNewItemChange}
                        />
                        <TextField
                            fullWidth
                            name="quantity"
                            label="Quantity"
                            type="number"
                            value={newItem.quantity}
                            onChange={onNewItemChange}
                            inputProps={{ min: 1 }}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2.5 }}>
                    <Button onClick={closeAddItemDialog} disabled={isSavingItem} sx={{ textTransform: "none", fontWeight: 700 }}>
                        Cancel
                    </Button>
                    <Button
                        onClick={saveNewItem}
                        disabled={isSavingItem}
                        variant="contained"
                        sx={{
                            bgcolor: "#523bd6",
                            textTransform: "none",
                            fontWeight: 700,
                            boxShadow: "none",
                            "&:hover": { bgcolor: "#442fc0" },
                        }}
                    >
                        {isSavingItem ? "Saving..." : "Save Item"}
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={Boolean(removalTarget)} onClose={closeRemovalDialog} fullWidth maxWidth="xs">
                <DialogTitle>Remove this item?</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ pt: 1 }}>
                        <Typography sx={{ color: "#555b7a", fontSize: 16 }}>
                            {removalTarget?.quantity > 1
                                ? `How many ${removalTarget?.itemName} would you like to remove?`
                                : `${removalTarget?.itemName} will be removed from this organizer.`}
                        </Typography>
                        {(removalTarget?.quantity || 0) > 1 && (
                            <TextField
                                fullWidth
                                type="number"
                                label="Quantity to remove"
                                value={removeQuantity}
                                onChange={(event) => setRemoveQuantity(event.target.value)}
                                inputProps={{
                                    min: 1,
                                    max: removalTarget?.quantity || 1,
                                }}
                                helperText={`Leave it as ${removalTarget?.quantity || 1} to remove them all.`}
                            />
                        )}
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2.5 }}>
                    <Button onClick={closeRemovalDialog} disabled={isRemoving} sx={{ textTransform: "none", fontWeight: 700 }}>
                        Cancel
                    </Button>
                    <Button
                        onClick={confirmRemoveItem}
                        disabled={isRemoving}
                        variant="contained"
                        sx={{
                            bgcolor: "#b42318",
                            textTransform: "none",
                            fontWeight: 700,
                            boxShadow: "none",
                            "&:hover": { bgcolor: "#971b12" },
                        }}
                    >
                        {isRemoving ? "Removing..." : "Remove"}
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={Boolean(error)} autoHideDuration={4000} onClose={() => setError("")} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                <Alert severity="error" variant="filled" onClose={() => setError("")}>
                    {error}
                </Alert>
            </Snackbar>
            <Snackbar open={Boolean(successMessage)} autoHideDuration={3500} onClose={() => setSuccessMessage("")} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                <Alert severity="success" variant="filled" onClose={() => setSuccessMessage("")}>
                    {successMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}
