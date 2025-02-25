import { Post } from '@/components/application/PostForm';

export const MOCK_USER = {
	id: '1',
	username: 'eu',
	password: 'eu',
};

const initialPosts: Post[] = [
	{
		id: '1',
		title: 'First Post',
		content: 'This is the first post content',
	},
	{
		id: '2',
		title: 'Second Post',
		content: 'This is the second post content',
	},
];

let MOCK_POSTS: Post[] = [...initialPosts];

export { MOCK_POSTS };
