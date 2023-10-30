import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SERVER_BASE_URL = import.meta.env.SERVER_BASE_URL;

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loginResult, setLoginResult] = useState(null);
	const [user, setUser] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(true);
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`${SERVER_BASE_URL}/api/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			if (response.ok) {
				const result = await response.json();
				setLoginResult(result);
				toast.success(result.message);

				console.log(result);

				// Redirect to the Dashboard page if login is successful
				// setIsLoggedIn(!isLoggedIn);
				navigate("/dashboard"); // Redirect to the Dashboard route

				// Store the user information in your application state
				setUser(result.user);
			} else if (response.status === 401) {
				// Handle 401 (Unauthorized) error
				const errorData = await response.json();
				toast.error(response.status + " " + errorData.message);
			} else {
				throw toast.error(response.status);
			}
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}
	};

	return (
		<>
			<div className="mx-auto max-w-screen-xl min-h-screen px-4 py-16 sm:px-6 lg:px-8 -mb-20 sm:mt-0">
				<div className="mx-auto max-w-lg">
					<h1 className="flex-inline text-center text-2xl font-bold sm:text-3xl">
						Welcome to{" "}
					</h1>
					<div className="logo flex justify-center text-4xl">
						<h1 className="text-yellow-500 ">fit</h1>
						<h1 className="text-black">NEST</h1>
					</div>

					<p className="mx-auto mt-4 max-w-md text-center text-gray-200">
						Welcome back! We&apos;re thrilled to see you again.
						Please enter your credentials to access your account.
					</p>

					<form
						action="/login"
						id="loginForm"
						onSubmit={handleLogin}
						className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
					>
						<p className="text-center text-lg font-medium">
							Sign in to your account
						</p>

						<div>
							<label className="sr-only">Email</label>

							<div className="relative">
								<input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
									placeholder="Enter email"
								/>

								<span className="absolute inset-y-0 end-0 grid place-content-center px-4">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4 text-gray-400"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
										/>
									</svg>
								</span>
							</div>
						</div>

						<div>
							<label className="sr-only">Password</label>

							<div className="relative">
								<input
									type="password"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
									placeholder="Enter password"
								/>

								<span className="absolute inset-y-0 end-0 grid place-content-center px-4">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4 text-gray-400"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
										/>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
										/>
									</svg>
								</span>
							</div>
						</div>

						<button
							type="submit"
							className="block w-full rounded-lg bg-blue-600 hover:bg-blue-700 px-5 py-3 text-sm font-medium text-white"
						>
							Sign In
						</button>
						<p className="text-center text-sm text-gray-200 ">
							No account?{" "}
							<Link to="/register" className="underline">
								Register
							</Link>
						</p>
					</form>
				</div>
			</div>
		</>
	);
};

export default Login;
