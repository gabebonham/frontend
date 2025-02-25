'use client';
import DeleteButton from '@/components/application/DeleteButton';
import Link from 'next/link';
import { MOCK_POSTS } from '@/lib/mockData';
import { MOCK_USER } from '@/lib/mockData';
import { PenSquare, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Post } from '@/components/application/User';

export default function MyPosts() {
	const [userPosts, setUserPosts] = useState<Post[]>([]);
	useEffect(() => {
		const handlee = async () => {
			const response = await fetch(
				'https://challenge-phi-ten.vercel.app/api/posts',
				{
					headers: {
						'Content-Type':
							'application/json',
						Authorization: `${MOCK_USER.id}`,
					},
				},
			).then((data) => data.json());
			setUserPosts(response);
		};
		handlee();
	}, []);

	return (
		<div className="max-w-7xl mx-auto py-8">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-4xl font-bold text-gray-800">
					My Posts
				</h1>
				<Link
					href="/create-post"
					className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors duration-200 flex items-center space-x-2"
				>
					<Plus className="h-5 w-5" />
					<span>New Post</span>
				</Link>
			</div>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{userPosts.map((post) => (
					<div
						key={post.id}
						className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
					>
						<div className="p-6">
							<div className="flex items-center mb-4">
								<div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
									<span className="text-white font-semibold">
										{MOCK_USER.username
											.charAt(
												0,
											)
											.toUpperCase()}
									</span>
								</div>
								<div className="ml-3">
									<p className="text-sm text-gray-600">
										{
											MOCK_USER.username
										}
									</p>
								</div>
							</div>

							<h2 className="text-xl font-semibold mb-3 text-gray-800 line-clamp-2">
								{post.title}
							</h2>
							<p className="text-gray-600 mb-4 line-clamp-3">
								{post.content}
							</p>

							<div className="border-t pt-4 mt-4 flex justify-end items-center space-x-4">
								<Link
									href={`/edit-post/${post.id}`}
									className="flex items-center text-blue-500 hover:text-blue-600 transition-colors duration-200"
								>
									<PenSquare className="h-4 w-4 mr-1" />
									<span>
										Edit
									</span>
								</Link>
								<DeleteButton
									postId={
										post.id
									}
								/>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
