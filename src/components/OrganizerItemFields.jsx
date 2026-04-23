import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export function OrganizerItemFields({
    item,
    index,
    onChange,
    onRemove,
    canRemove = true,
}) {
    const handleChange = (event) => {
        const { name, value } = event.target;
        onChange(index, name, value);
    };

    return (
        <Paper
            elevation={0}
            sx={{
                border: "1px solid #e4e7f1",
                borderRadius: 2,
                bgcolor: "#fbfcff",
                p: { xs: 2, sm: 2.5 },
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                    mb: 2,
                }}
            >
                <Typography sx={{ color: "#090927", fontSize: 18, fontWeight: 700 }}>
                    Item {index + 1}
                </Typography>
                {canRemove && (
                    <Button
                        type="button"
                        onClick={() => onRemove(index)}
                        sx={{
                            color: "#b42318",
                            fontWeight: 700,
                            textTransform: "none",
                        }}
                    >
                        Remove
                    </Button>
                )}
            </Box>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 180px" },
                    gap: 2.5,
                }}
            >
                <TextField
                    fullWidth
                    name="itemName"
                    label="Item Name"
                    value={item.itemName}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    name="itemType"
                    label="Item Type"
                    value={item.itemType}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    name="quantity"
                    label="Quantity"
                    type="number"
                    value={item.quantity}
                    onChange={handleChange}
                    inputProps={{ min: 0 }}
                />
            </Box>
        </Paper>
    );
}
