'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

import { useRouter } from 'next/navigation';

export default function AuthPage() {
	const [isLogin, setIsLogin] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault(); // Prevent the default form submission

		const formData = new FormData(e.currentTarget); // Get form data
		const username = formData.get('username') as string; // Get username
		const password = formData.get('password') as string; // Get password

		console.log('Form submitted with:', { username, password });

		const response = isLogin
			? await fetch('http://localhost:3030/api/login', {
					method: 'POST',
					headers: {
						'Content-Type':
							'application/json',
					},
					body: JSON.stringify({
						username,
						password,
					}),
			  }).then((data) => data.json())
			: await fetch('http://localhost:3030/api/register', {
					method: 'POST',
					headers: {
						'Content-Type':
							'application/json',
					},
					body: JSON.stringify({
						username,
						password,
					}),
			  }).then((data) => data.json());

		if (response) {
			router.push('/my-posts');
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center p-4">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-2xl font-bold text-center text-pink-600">
						{isLogin ? 'Login' : 'Sign Up'}
					</CardTitle>
					<CardDescription className="text-center text-pink-400">
						{isLogin
							? 'Log into your account'
							: 'Create a new account'}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit}>
						<div className="space-y-4">
							<div className="space-y-2">
								<Label
									htmlFor="name"
									className="text-pink-600"
								>
									Name
								</Label>
								<Input
									id="name"
									name={
										'username'
									}
									placeholder="Your name"
									className="border-pink-300"
								/>
							</div>

							<div className="space-y-2">
								<Label
									htmlFor="password"
									className="text-pink-600"
								>
									Password
								</Label>
								<Input
									id="password"
									type="password"
									placeholder="••••••••"
									className="border-pink-300"
									name={
										'password'
									}
								/>
							</div>
							<Button
								type="submit"
								className="w-full bg-pink-500 hover:bg-pink-600 text-white"
							>
								{isLogin
									? 'Login'
									: 'Register'}
							</Button>
						</div>
					</form>
				</CardContent>
				<CardFooter>
					<p className="text-sm text-center text-pink-600 w-full">
						{isLogin
							? "Don't have an account?"
							: 'Already have an account?'}
						<Button
							variant="link"
							className="text-pink-500 hover:text-pink-700 pl-1"
							onClick={() =>
								setIsLogin(
									!isLogin,
								)
							}
						>
							{isLogin
								? 'Sign up'
								: 'Log in'}
						</Button>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
