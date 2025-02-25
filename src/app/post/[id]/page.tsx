'use client';

import { use, useEffect, useState } from 'react';
import { MOCK_POSTS, MOCK_USER } from '@/lib/mockData';
import { notFound } from 'next/navigation';
import {
	Calendar,
	User,
	Heart,
	MessageCircle,
	Bookmark,
	Share2,
	ArrowLeft,
	Eye,
	ThumbsUp,
	Award,
	Clock,
	Tag,
} from 'lucide-react';
import Link from 'next/link';
import { Post } from '@/components/application/User';

// Types
interface Comment {
	id: number;
	user: string;
	content: string;
	date: string;
	avatar: string;
}

interface RelatedPost {
	id: number;
	title: string;
	excerpt: string;
	image: string;
}

interface ReactionButtonProps {
	icon: React.ReactNode;
	count: number | string;
	label?: string;
	active?: boolean;
}

interface RelatedPostCardProps {
	title: string;
	excerpt: string;
	image: string;
}

function getReadingTime(content: string): number {
	const wordsPerMinute = 200;
	const wordCount = content.split(/\s+/).length;
	return Math.ceil(wordCount / wordsPerMinute);
}

const ReactionButton: React.FC<ReactionButtonProps> = ({
	icon,
	count,
	label,
	active = false,
}) => {
	return (
		<button
			className={`flex items-center space-x-1 px-3 py-2 rounded-full transition-all ${
				active
					? 'bg-pink-100 text-pink-600'
					: 'text-gray-600 hover:bg-pink-50 hover:text-pink-500'
			}`}
		>
			{icon}
			<span className="text-sm font-medium">{count}</span>
			{label && (
				<span className="text-sm hidden sm:inline">
					{label}
				</span>
			)}
		</button>
	);
};

const RelatedPostCard: React.FC<RelatedPostCardProps> = ({
	title,
	excerpt,
	image,
}) => {
	return (
		<div className="bg-white rounded-lg shadow-sm border border-pink-100 overflow-hidden transform transition-all duration-300 hover:shadow-md hover:-translate-y-1">
			{image && (
				<div className="h-32 overflow-hidden">
					<img
						src={image}
						alt={title}
						className="w-full h-full object-cover"
					/>
				</div>
			)}
			<div className="p-4">
				<h3 className="font-bold text-gray-800 mb-2 line-clamp-2">
					{title}
				</h3>
				<p className="text-gray-600 text-sm line-clamp-3">
					{excerpt}
				</p>
				<div className="mt-3">
					<span className="inline-block px-3 py-1 bg-pink-50 text-pink-600 rounded-full text-xs font-medium">
						Read more
					</span>
				</div>
			</div>
		</div>
	);
};

export default function PostPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const resolvedParams = use(params);
	const [post, setPost] = useState<Post>(MOCK_POSTS[0]);
	const readingTime = getReadingTime(post?.content);
	const user = MOCK_USER;
	useEffect(() => {
		const handlee = async () => {
			setPost(
				await fetch(
					'https://challenge-phi-ten.vercel.app/api/posts/' +
						resolvedParams.id,
					{
						headers: {
							'Content-Type':
								'application/json',
							authorization: `${user.id}`,
						},
					},
				).then((data) => data.json()),
			);
		};
		handlee();
	}, []);

	const mockComments: Comment[] = [
		{
			id: 1,
			user: 'Alice Wilson',
			content: 'This is such a wonderful post! I really enjoyed reading it.',
			date: '2 days ago',
			avatar: 'A',
		},
		{
			id: 2,
			user: 'Robert Chen',
			content: 'Thank you for sharing these insights. Very helpful!',
			date: '1 day ago',
			avatar: 'R',
		},
	];

	const relatedPosts: RelatedPost[] = [
		{
			id: 101,
			title: 'Finding Inspiration in Everyday Life',
			excerpt: 'Discover how the smallest moments can spark your greatest ideas...',
			image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
		},
	];

	return (
		<div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 min-h-screen">
			<div className="mb-8">
				<Link
					href="/my-posts"
					className="inline-flex items-center space-x-2 text-pink-600 hover:text-pink-700 transition-colors"
				>
					<ArrowLeft className="w-4 h-4" />
					<span className="font-medium">
						Back to all posts
					</span>
				</Link>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<div className="lg:col-span-2">
					<div className="bg-white rounded-xl shadow-md border border-pink-100 overflow-hidden">
						<div className="p-8">
							<div className="flex flex-wrap justify-between items-center border-b border-gray-100 pb-6 mb-6">
								<div className="flex items-center space-x-4 mb-4 sm:mb-0">
									<div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center shadow-md">
										<span className="text-white font-bold text-lg">
											{MOCK_USER.username
												.charAt(
													0,
												)
												.toUpperCase()}
										</span>
									</div>
									<div>
										<p className="font-medium text-gray-800">
											{
												MOCK_USER.username
											}
										</p>
										<p className="text-sm text-gray-500">
											Content
											Creator
										</p>
									</div>
								</div>

								<div className="flex flex-wrap items-center space-x-4">
									<div className="flex items-center text-gray-600">
										<Eye className="w-4 h-4 mr-2 text-pink-500" />
										<span className="text-sm">
											{Math.floor(
												Math.random() *
													1000,
											) +
												500}{' '}
											views
										</span>
									</div>
								</div>
							</div>

							{/* Conteúdo do post */}
							<div className="prose max-w-none">
								<p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
									{
										post.content
									}
								</p>

								<div className="my-8 p-6 border-l-4 border-pink-500 bg-pink-50 rounded-r-lg">
									<p className="text-lg font-medium text-pink-800 italic">
										"The
										essence
										of
										creativity
										is
										not
										in
										what
										we
										create,
										but
										in
										how
										we
										transform
										ourselves
										through
										the
										process."
									</p>
								</div>

								{/* Continuação do conteúdo */}
								<p className="text-gray-700 leading-relaxed">
									Thank
									you for
									reading
									this
									post. If
									you
									enjoyed
									it,
									please
									feel
									free to
									share it
									with
									others
									who
									might
									find it
									valuable!
								</p>
							</div>

							<div className="mt-8 border-t border-b border-gray-100 py-4 flex flex-wrap justify-between">
								<div className="flex space-x-2">
									<ReactionButton
										icon={
											<Heart className="w-5 h-5" />
										}
										count={
											24
										}
										label="Like"
										active={
											true
										}
									/>
									<ReactionButton
										icon={
											<MessageCircle className="w-5 h-5" />
										}
										count={
											mockComments.length
										}
										label="Comment"
									/>
									<ReactionButton
										icon={
											<Share2 className="w-5 h-5" />
										}
										count={
											5
										}
										label="Share"
									/>
								</div>
								<ReactionButton
									icon={
										<Bookmark className="w-5 h-5" />
									}
									count=""
									label="Save"
								/>
							</div>

							{/* Seção de comentários */}
							<div className="mt-8">
								<h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
									<MessageCircle className="w-5 h-5 mr-2 text-pink-500" />
									Comments
									(
									{
										mockComments.length
									}
									)
								</h3>

								<div className="space-y-6">
									{mockComments.map(
										(
											comment,
										) => (
											<div
												key={
													comment.id
												}
												className="flex space-x-4"
											>
												<div className="flex-shrink-0">
													<div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full flex items-center justify-center">
														<span className="text-white font-medium">
															{
																comment.avatar
															}
														</span>
													</div>
												</div>
												<div className="flex-1">
													<div className="bg-gray-50 p-4 rounded-lg">
														<div className="flex justify-between items-center mb-2">
															<h4 className="font-medium text-gray-800">
																{
																	comment.user
																}
															</h4>
															<span className="text-xs text-gray-500">
																{
																	comment.date
																}
															</span>
														</div>
														<p className="text-gray-700 text-sm">
															{
																comment.content
															}
														</p>
													</div>
													<div className="mt-2 ml-2 flex space-x-4">
														<button className="text-xs text-gray-500 hover:text-pink-500">
															Like
														</button>
														<button className="text-xs text-gray-500 hover:text-pink-500">
															Reply
														</button>
													</div>
												</div>
											</div>
										),
									)}
								</div>

								{/* Formulário de comentário */}
								<div className="mt-6">
									<div className="flex space-x-4">
										<div className="flex-shrink-0">
											<div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center">
												<span className="text-white font-bold">
													{MOCK_USER.username
														.charAt(
															0,
														)
														.toUpperCase()}
												</span>
											</div>
										</div>
										<div className="flex-1">
											<textarea
												className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition duration-200 resize-none"
												placeholder="Add a comment..."
												rows={
													3
												}
											></textarea>
											<div className="mt-2 flex justify-end">
												<button className="px-4 py-2 bg-pink-500 text-white font-medium rounded-lg hover:bg-pink-600 transition duration-200">
													Post
													Comment
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="space-y-8">
					<div className="bg-white rounded-xl shadow-md border border-pink-100 overflow-hidden">
						<div className="p-6">
							<h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
								<User className="w-5 h-5 mr-2 text-pink-500" />
								About the Author
							</h3>

							<div className="flex flex-col items-center text-center mb-4">
								<div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center mb-3 shadow-md">
									<span className="text-white font-bold text-2xl">
										{MOCK_USER.username
											.charAt(
												0,
											)
											.toUpperCase()}
									</span>
								</div>
								<h4 className="font-bold text-gray-800">
									{
										MOCK_USER.username
									}
								</h4>
								<p className="text-sm text-gray-600">
									Content
									Creator
									&
									Storyteller
								</p>

								<div className="mt-3 flex space-x-2">
									<span className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-xs font-medium">
										<ThumbsUp className="w-3 h-3 mr-1 inline" />{' '}
										4.8k
									</span>
									<span className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-xs font-medium">
										<Award className="w-3 h-3 mr-1 inline" />{' '}
										Top
										Writer
									</span>
								</div>
							</div>

							<p className="text-gray-700 text-sm mb-4">
								Passionate about
								sharing stories
								that inspire and
								connect. Writing
								about life,
								creativity, and
								personal growth.
							</p>

							<button className="w-full py-2 border border-pink-500 text-pink-600 font-medium rounded-lg hover:bg-pink-50 transition duration-200">
								Follow
							</button>
						</div>
					</div>

					<div className="bg-white rounded-xl shadow-md border border-pink-100 overflow-hidden">
						<div className="p-6">
							<h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
								<Tag className="w-5 h-5 mr-2 text-pink-500" />
								Related Stories
							</h3>

							<div className="space-y-4">
								{relatedPosts.map(
									(
										relatedPost,
									) => (
										<RelatedPostCard
											key={
												relatedPost.id
											}
											title={
												relatedPost.title
											}
											excerpt={
												relatedPost.excerpt
											}
											image={
												relatedPost.image
											}
										/>
									),
								)}
							</div>
						</div>
					</div>

					<div className="bg-white rounded-xl shadow-md border border-pink-100 overflow-hidden">
						<div className="p-6">
							<h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
								<Tag className="w-5 h-5 mr-2 text-pink-500" />
								Popular Tags
							</h3>

							<div className="flex flex-wrap gap-2">
								{[
									'Inspiration',
									'Creativity',
									'Growth',
									'Mindfulness',
									'Productivity',
									'Self-care',
									'Learning',
									'Community',
									'Success',
									'Motivation',
								].map((tag) => (
									<span
										key={
											tag
										}
										className="px-3 py-1 bg-pink-50 text-pink-600 rounded-full text-sm hover:bg-pink-100 transition-colors cursor-pointer"
									>
										{
											tag
										}
									</span>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
