import { useNavigate } from "react-router-dom";

export function ErrorPage() {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const tokenUser = localStorage.getItem("user");

    return (
        <div>
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>

            {token ? (
                <>
                    {tokenUser}
                    <p>You are logged in.</p>
                    <button onClick={() => navigate("/organizer")}>
                        Go to Dashboard
                    </button>
                </>
            ) : (
                <>
                    <p>You are not logged in.</p>
                    <button onClick={() => navigate("/")}>
                        Go to Login
                    </button>
                </>
            )}
        </div>
    );
}