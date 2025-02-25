'use client';

import type React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MOCK_USER, MOCK_POSTS } from '@/lib/mockData';
import { Heart, Image, Tag, Sparkles, Divide } from 'lucide-react';

// Mock data structure
export type Post = {
	id: string;
	title: string;
	content: string;
};

interface PostFormProps {
	post?: Post | null;
}

export default function PostForm({ post = null }: PostFormProps) {
	const [title, setTitle] = useState<string>(post?.title || '');
	const [content, setContent] = useState<string>(post?.content || '');
	const [activeTab, setActiveTab] = useState<'write' | 'preview'>(
		'write',
	);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Mock authentication check
		const user = MOCK_USER;

		if (!user) {
			alert('You must be logged in to create a post');
			return;
		}

		if (post) {
			// Update existing post in mock data
			await fetch(
				'https://challenge-phi-ten.vercel.app/api/posts/' +
					post.id,
				{
					method: 'PUT',
					headers: {
						'Content-Type':
							'application/json',
						authorization: user.id,
					},
					body: JSON.stringify({
						id: post.id,
						title,
						content,
					}),
				},
			).then((data) => console.log(data.json()));
		} else {
			// Create new post in mock data
			await fetch(
				'https://challenge-phi-ten.vercel.app/api/posts',
				{
					method: 'POST',
					headers: {
						'Content-Type':
							'application/json',
						authorization: `${user.id}`,
					},
					body: JSON.stringify({
						title,
						content,
					}),
				},
			).then((data) => console.log(data.json()));
		}

		router.push('/my-posts');
		router.refresh();
	};

	const renderPreview = () => {
		return (
			<div className="prose max-w-none">
				<h1 className="text-2xl font-bold text-pink-800">
					{title || 'Your Post Title'}
				</h1>
				<div className="whitespace-pre-wrap text-gray-700">
					{content ||
						'Your content will appear here...'}
				</div>
			</div>
		);
	};

	return (
		<div className="w-full bg-white rounded-xl shadow-md border border-pink-100 overflow-hidden">
			{/* Tabs */}
			<div className="flex border-b border-pink-100">
				<button
					onClick={() => setActiveTab('write')}
					className={`flex-1 py-3 px-4 text-sm font-medium flex items-center justify-center ${
						activeTab === 'write'
							? 'text-pink-600 border-b-2 border-pink-500 bg-pink-50'
							: 'text-gray-600 hover:text-pink-500 hover:bg-pink-50'
					}`}
				>
					<Sparkles className="w-4 h-4 mr-2" />
					Write Your Story
				</button>
				<button
					onClick={() => setActiveTab('preview')}
					className={`flex-1 py-3 px-4 text-sm font-medium flex items-center justify-center ${
						activeTab === 'preview'
							? 'text-pink-600 border-b-2 border-pink-500 bg-pink-50'
							: 'text-gray-600 hover:text-pink-500 hover:bg-pink-50'
					}`}
				>
					<Heart className="w-4 h-4 mr-2" />
					Preview
				</button>
			</div>

			{activeTab === 'write' ? (
				<form
					onSubmit={handleSubmit}
					className="p-6 space-y-5"
				>
					<div className="space-y-2">
						<label
							htmlFor="title"
							className=" text-sm font-medium text-pink-800 flex items-center"
						>
							<Sparkles className="w-4 h-4 mr-2 text-pink-500" />
							Title
						</label>
						<input
							type="text"
							id="title"
							value={title}
							onChange={(e) =>
								setTitle(
									e.target
										.value,
								)
							}
							required
							placeholder="A captivating title for your story..."
							className="w-full px-4 py-3 text-gray-700 bg-pink-50 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition duration-200"
						/>
					</div>

					<div className="space-y-2">
						<label
							htmlFor="content"
							className=" text-sm font-medium text-pink-800 flex items-center"
						>
							<Heart className="w-4 h-4 mr-2 text-pink-500" />
							Your Story
						</label>
						<textarea
							id="content"
							value={content}
							onChange={(e) =>
								setContent(
									e.target
										.value,
								)
							}
							required
							rows={10}
							placeholder="Start writing your amazing story here..."
							className="w-full px-4 py-3 text-gray-700 bg-pink-50 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition duration-200 resize-none"
						></textarea>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
						<div className="space-y-2">
							<label
								htmlFor="tags"
								className=" text-sm font-medium text-pink-800 flex items-center"
							>
								<Tag className="w-4 h-4 mr-2 text-pink-500" />
								Tags (comma
								separated)
							</label>
						</div>

						<div className="space-y-2">
							<label
								htmlFor="image"
								className=" text-sm font-medium text-pink-800 flex items-center"
							>
								<Image className="w-4 h-4 mr-2 text-pink-500" />
								Cover Image URL
								(optional)
							</label>
						</div>
					</div>

					<div className="pt-4 flex justify-between items-center">
						<span className="text-xs text-pink-600 italic">
							{post
								? 'Editing existing post'
								: 'Creating new story'}
						</span>
						<button
							type="submit"
							className="px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-medium rounded-lg shadow-md hover:from-pink-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 transform transition duration-200 hover:scale-105"
						>
							{post
								? 'Update Story'
								: 'Publish Story'}
							<span className="ml-1">
								✨
							</span>
						</button>
					</div>
				</form>
			) : (
				<div className="p-6 bg-white">
					<div className="p-5 border border-pink-100 rounded-lg bg-pink-50 min-h-64">
						{renderPreview()}
					</div>
				</div>
			)}
		</div>
	);
}
