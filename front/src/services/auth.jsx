const API_URL = "http://127.0.0.1:8000/auth";

// SIGNUP
export async function SignupUser({ FullName, email, password, role }) {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                full_name: FullName,
                username: email,
                password: password,
                role: role
            })
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.detail || "Registration failed"
            };
        }

        return {
            success: true,
            data: data
        };

    } catch (error) {
        return {
            success: false,
            message: "Cannot connect to server"
        };
    }
}

// LOGIN
export async function loginUser(email, password) {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: email,
                password: password
            })
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.detail || "Invalid email or password"
            };
        }

        return {
            success: true,
            data: data
        };

    } catch (error) {
        return {
            success: false,
            message: "Cannot connect to server"
        };
    }
}

// GOOGLE
export function googleLogin() {
    window.location.href = `${API_URL}/google`;
}