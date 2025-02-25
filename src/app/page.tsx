import Link from 'next/link';
import { MOCK_POSTS } from '@/lib/mockData';
import { MOCK_USER } from '@/lib/mockData';

export default function Home() {
	return (
		<div className="max-w-7xl items-center justify-center mx-auto">
			<h1 className="text-3xl font-bold mb-6">All Posts</h1>
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{MOCK_POSTS.map((post) => (
					<Link
						href={`/post/${post.id}`}
						key={post.id}
						className="block"
					>
						<div className="bg-white border border-pink-300 rounded-lg p-6 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
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
							<p className="text-gray-600 line-clamp-3">
								{post.content}
							</p>
							<div className="mt-4 text-pink-500 text-sm font-medium hover:text-pink-600">
								Read more →
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
