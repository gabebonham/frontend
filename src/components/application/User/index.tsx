export type User = {
	id: string;
	username: string;
	password: string;
};

export type Post = {
	id: string;
	title: string;
	content: string;
};

export const MOCK_USER: User = {
	id: '1',
	username: 'eu',
	password: 'eu',
};
