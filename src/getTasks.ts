const app = document.querySelector('#app');

interface ResponseProps {
	properties: {
		Name: {
			title: {
				plain_text: string;
			}[];
		};
	};
}

// Render the list of elements
const generateTasksList = (listItems: ResponseProps[]) => {
	const ul = document.createElement('ul');

	// Create li on the ul element with the task title
	listItems.map(item => {
		return (ul.innerHTML += `
    <li>${item.properties.Name.title[0].plain_text}</li>
    `);
	});

	// Add the created list on the app element
	app?.appendChild(ul);
};

// Get the tasks data from api
export const getTasksData = () => {
	// const prodUrl = 'https://notion-tasks-extension-server.vercel.app';
	const devUrl = 'http://localhost:8082';

	fetch(devUrl)
		.then(res => res.json())
		.then((data: ResponseProps[]) => {
			console.log(data);
			generateTasksList(data);
		})
		.catch(err => console.log(err));
};
