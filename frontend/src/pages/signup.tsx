import { Link } from "react-router-dom"
import { ProfileForm } from "@/components/profile-form"
import { Button } from "@/components/ui/button"

export const SignupPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <div className="text-center mb-6">
                    <img src="https://cdn-icons-png.flaticon.com/512/3800/3800591.png" alt="Signup Icon" className="mx-auto h-16 w-16" />
                    <h2 className="text-2xl font-bold">Signup</h2>
                </div>
                <ProfileForm type="signup"/>
                <div className="text-center mt-4">
                    <span className="text-gray-600">Already have an account?</span>
                    <Link to="/login">
                        <Button variant="link" className="ml-2">Log in</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}