const API_URL = "http://127.0.0.1:8000/auth";

export async function SignupUser({ FullName, email, password }) {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                full_name: FullName,
                username: email,
                password: password
            })
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.detail || "Registration failed"
            };
        }

        return { success: true, data };

    } catch (error) {
        return {
            success: false,
            message: "Cannot connect to server"
        };
    }
}