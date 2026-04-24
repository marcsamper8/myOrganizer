import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import SvgIcon from "@mui/material/SvgIcon";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

function ChevronRightIcon(props) {
    return (
        <SvgIcon viewBox="0 0 24 24" {...props}>
            <path d="m9.4 6 6 6-6 6L8 16.6l4.6-4.6L8 7.4 9.4 6Z" />
        </SvgIcon>
    );
}

function ScissorsIcon(props) {
    return (
        <SvgIcon viewBox="0 0 64 64" {...props}>
            <path fill="#cdcfd6" d="M37 34 54 16c2.4-2.5 6.4.2 5 3.4L43.4 40.2 37 34Z" />
            <path fill="#b7bac3" d="m33.8 29.9 4.1 4.1-22.5 8.9-2.1-3.7 20.5-9.3Z" />
            <path fill="none" stroke="#6d5ec8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M24 42 37 30M24 42c3.8 3.8 3.8 10 0 13.8s-10 3.8-13.8 0-3.8-10 0-13.8 10-3.8 13.8 0Zm0-20L37 34M24 22c3.8-3.8 3.8-10 0-13.8s-10-3.8-13.8 0-3.8 10 0 13.8 10 3.8 13.8 0Z" />
        </SvgIcon>
    );
}

function TapeIcon(props) {
    return (
        <SvgIcon viewBox="0 0 64 64" {...props}>
            <ellipse cx="29" cy="35" rx="24" ry="15" fill="#cfbd95" />
            <ellipse cx="29" cy="32" rx="24" ry="15" fill="#ddcda8" />
            <ellipse cx="29" cy="32" rx="12" ry="7.5" fill="#f4f2f6" />
            <ellipse cx="29" cy="32" rx="7" ry="4.2" fill="#c9cad6" />
            <path fill="#b9a57b" d="m35 28 24 5c2.5.5 2.7 4 .2 4.8l-23 7c-2.8.9-5.2-2.1-3.8-4.7L38 29l-3-1Z" />
            <path fill="#a89064" opacity=".55" d="M6 35c4.5 7.2 13.7 12 24 12 7.2 0 13.7-2.3 18.1-6.1l-12 3.7c-2.8.9-5.2-2.1-3.8-4.7L38 29l-3-1 7.5 1.6C38.8 26.8 34.1 25 29 25 16.3 25 6 31.7 6 40v-5Z" />
        </SvgIcon>
    );
}

function GenericItemIcon(props) {
    return (
        <SvgIcon viewBox="0 0 64 64" {...props}>
            <path fill="#7662d6" d="M16 18h32a5 5 0 0 1 5 5v27a5 5 0 0 1-5 5H16a5 5 0 0 1-5-5V23a5 5 0 0 1 5-5Z" />
            <path fill="#9f8bea" d="M18 13h28v9H18z" />
            <path fill="#fff" opacity=".75" d="M22 28h20v4H22zm0 9h14v4H22z" />
        </SvgIcon>
    );
}

function ItemArt({ name = "", type = "" }) {
    const itemLabel = `${name} ${type}`.toLowerCase();
    const Icon = itemLabel.includes("scissor") ? ScissorsIcon : itemLabel.includes("tape") ? TapeIcon : GenericItemIcon;

    return (
        <Box
            aria-hidden="true"
            sx={{
                width: { xs: 96, sm: 132 },
                height: { xs: 96, sm: 132 },
                borderRadius: { xs: 4, sm: 5 },
                bgcolor: "#f3efff",
                display: "grid",
                placeItems: "center",
                flex: "0 0 auto",
            }}
        >
            <Icon sx={{ fontSize: { xs: 68, sm: 92 } }} />
        </Box>
    );
}

export function ItemContainer({ items = [] }) {
    if (!items.length) {
        return (
            <Paper
                elevation={0}
                sx={{
                    border: "1px solid #e4e7f1",
                    borderRadius: 2,
                    p: { xs: 3, sm: 5 },
                    textAlign: "center",
                    color: "#555b7a",
                    boxShadow: "0 6px 18px rgba(33, 34, 65, 0.05)",
                }}
            >
                <Typography sx={{ fontSize: { xs: 18, sm: 22 } }}>
                    No items found in this organizer.
                </Typography>
            </Paper>
        );
    }

    return (
        <Stack component="section" spacing={{ xs: 3, sm: 4 }}>
            {items.map((item, index) => {
                const itemName = item.itemName || item.name || "Untitled Item";
                const itemType = item.itemType || item.type || "Item";
                const quantity = item.quantity ?? item.qty ?? 0;
                const key = item.id || item._id || `${itemName}-${index}`;

                return (
                    <Box key={key}>

                        <Paper
                            elevation={0}
                            sx={{
                                width: "auto",
                                border: "1px solid #e4e7f1",
                                borderRadius: 2,
                                boxShadow: "0 8px 20px rgba(33, 34, 65, 0.07)",
                                p: { xs: 2, sm: 3 },
                                bgcolor: "#fff",
                            }}
                        >
                            <Stack direction="row"
                                alignItems="center"
                                spacing={{ xs: 2, sm: 5 }}
                            >

                                <Stack
                                    spacing={{ xs: 1.25, sm: 2 }}
                                    sx={{
                                        minWidth: 0,
                                        flex: 1,
                                        alignItems: "start",
                                    }}
                                >
                                    <Typography
                                        component="h3"
                                        sx={{
                                            color: "#090927",
                                            fontSize: { xs: 28, sm: 34 },
                                            fontWeight: 700,
                                            lineHeight: 1.2,
                                            letterSpacing: 0,
                                            m: 0,
                                            mb: { xs: 2, sm: 2.5 },
                                            overflowWrap: "anywhere",
                                        }}
                                    >
                                        {quantity} {itemName}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: "#9b9b9c",
                                            fontSize: { xs: 14, sm: 24 },
                                            lineHeight: 1.2,
                                            overflowWrap: "anywhere",
                                        }}
                                    >
                                        {itemType}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Paper>
                    </Box>
                );
            })}
        </Stack>
    );
}
