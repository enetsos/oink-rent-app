import { Link } from "react-router-dom"
import { ProfileForm } from "@/components/profile-form"
import { Button } from "@/components/ui/button"

export const LoginPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <div className="text-center mb-6">
                    <img src="https://cdn-icons-png.flaticon.com/512/3800/3800591.png" alt="Login Icon" className="mx-auto h-16 w-16" />
                    <h2 className="text-2xl font-bold">Login</h2>
                </div>
                <ProfileForm type="login"/>
                <div className="text-center mt-4">
                    <span className="text-gray-600">Don't have an account?</span>
                    <Link to="/signup">
                        <Button variant="link" className="ml-2">Sign up</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}