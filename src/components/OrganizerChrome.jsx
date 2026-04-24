import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SvgIcon from "@mui/material/SvgIcon";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { clearAuthSession } from "../utils/authStorage";

export function OrganizerIcon(props) {
    return (
        <SvgIcon viewBox="0 0 24 24" {...props}>
            <path d="M5 5.5A2.5 2.5 0 0 1 7.5 3h9A2.5 2.5 0 0 1 19 5.5V19a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5.5Zm2.5-.75a.75.75 0 0 0-.75.75V8h10.5V5.5a.75.75 0 0 0-.75-.75h-9ZM9 11h6v2H9v-2Z" />
        </SvgIcon>
    );
}

function UserIcon(props) {
    return (
        <SvgIcon viewBox="0 0 24 24" {...props}>
            <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0h-2a5 5 0 0 0-10 0H5Z" />
        </SvgIcon>
    );
}

function ChevronDownIcon(props) {
    return (
        <SvgIcon viewBox="0 0 24 24" {...props}>
            <path d="m7.4 8.6 4.6 4.6 4.6-4.6L18 10l-6 6-6-6 1.4-1.4Z" />
        </SvgIcon>
    );
}

function LogoutIcon(props) {
    return (
        <SvgIcon viewBox="0 0 24 24" {...props}>
            <path d="M10 4h9v16h-9v-2h7V6h-7V4Zm-1.3 4.3 1.4 1.4L7.8 12l2.3 2.3-1.4 1.4L4 11l4.7-4.7Z" />
        </SvgIcon>
    );
}

export function OrganizerHeader({ user }) {
    const navigate = useNavigate();
    const [accountMenuAnchor, setAccountMenuAnchor] = useState(null);
    const isAccountMenuOpen = Boolean(accountMenuAnchor);

    const openAccountMenu = (event) => {
        setAccountMenuAnchor(event.currentTarget);
    };

    const closeAccountMenu = () => {
        setAccountMenuAnchor(null);
    };

    const handleLogout = () => {
        setAccountMenuAnchor(null);
        clearAuthSession();
        navigate("/");
    };

    return (
        <AppBar position="static" elevation={0} sx={{ bgcolor: "#211d5b" }}>
            <Toolbar sx={{ minHeight: { xs: 72, sm: 88 }, px: { xs: 2, sm: 3 }, gap: 2 }}>
                <Stack direction="row" alignItems="center" spacing={{ xs: 1.25, sm: 2 }} sx={{ flex: 1, minWidth: 0 }}>
                    <Box
                        sx={{
                            width: { xs: 38, sm: 48 },
                            height: { xs: 38, sm: 48 },
                            borderRadius: 1,
                            display: "grid",
                            placeItems: "center",
                            bgcolor: "#6656dc",
                            color: "#edeaff",
                            flex: "0 0 auto",
                        }}
                    >
                        <OrganizerIcon sx={{ fontSize: { xs: 25, sm: 30 } }} />
                    </Box>
                    <Typography sx={{ color: "white", fontWeight: 700, fontSize: { xs: 21, sm: 28 }, lineHeight: 1.1, whiteSpace: "nowrap" }}>
                        My Organizer
                    </Typography>
                </Stack>

                <Stack
                    component="button"
                    type="button"
                    direction="row"
                    alignItems="center"
                    spacing={{ xs: 1, sm: 2 }}
                    onClick={openAccountMenu}
                    aria-controls={isAccountMenuOpen ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={isAccountMenuOpen ? "true" : undefined}
                    sx={{
                        minWidth: 0,
                        border: 0,
                        p: 0,
                        m: 0,
                        bgcolor: "transparent",
                        cursor: "pointer",
                        font: "inherit",
                        borderRadius: 1,
                        "&:focus-visible": {
                            outline: "2px solid rgba(255,255,255,0.85)",
                            outlineOffset: 4,
                        },
                    }}
                >
                    <UserIcon sx={{ display: { xs: "none", sm: "block" }, color: "white", fontSize: 28 }} />
                    <Box sx={{ minWidth: 0, textAlign: "left" }}>
                        <Typography sx={{ color: "white", fontWeight: 700, fontSize: { xs: 12, sm: 18 }, lineHeight: 1.15, maxWidth: { xs: 126, sm: 300 }, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {user?.id || "Organizer"}
                        </Typography>
                        <Typography sx={{ color: "#d7d5f3", fontSize: { xs: 12, sm: 16 }, lineHeight: 1.25, maxWidth: { xs: 126, sm: 300 }, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            Welcome, {user?.name || "Guest"}!
                        </Typography>
                    </Box>
                    <ChevronDownIcon
                        sx={{
                            color: "white",
                            fontSize: { xs: 22, sm: 26 },
                            flex: "0 0 auto",
                            transition: "transform 160ms ease",
                            transform: isAccountMenuOpen ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                    />
                </Stack>
                <Menu
                    id="account-menu"
                    anchorEl={accountMenuAnchor}
                    open={isAccountMenuOpen}
                    onClose={closeAccountMenu}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    slotProps={{
                        paper: {
                            sx: {
                                mt: 1.5,
                                minWidth: 180,
                                borderRadius: 2,
                                boxShadow: "0 14px 34px rgba(21, 19, 62, 0.18)",
                            },
                        },
                    }}
                >
                    <MenuItem onClick={handleLogout} sx={{ py: 1.25, color: "#211d5b", fontWeight: 600 }}>
                        <ListItemIcon>
                            <LogoutIcon fontSize="small" sx={{ color: "#6656dc" }} />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
}

export function OrganizerFooter() {
    return (
        <Box
            component="footer"
            sx={{
                borderTop: "1px solid #e1e5f0",
                bgcolor: "#fff",
                px: { xs: 2.5, sm: 7 },
                py: { xs: 3, sm: 4 },
            }}
        >

            <Typography sx={{ color: "#7d84a2", fontSize: 16, textAlign: "center", mt: { xs: 3, sm: 1.5 } }}>
                {"\u00A9"} Marc Ahlen Samper
            </Typography>
        </Box>
    );
}
