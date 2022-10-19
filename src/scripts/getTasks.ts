import { checkTask } from './checkTask';

interface ResponseProps {
	id: string;
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
	const taskListContainer = document.querySelector('#tasks-container');

	// Create li on the ul element with the task title
	listItems.forEach(item => {
		// Create task element
		const taskDiv = document.createElement('div');
		taskDiv.setAttribute('class', 'task');

		// Create a checkbox input and set atributes to it
		const checkboxInput = document.createElement('input');
		checkboxInput.setAttribute('type', 'checkbox');
		checkboxInput.setAttribute('id', 'taskCheck');
		checkboxInput.setAttribute('name', 'isDone');
		checkboxInput.setAttribute('data-id', item.id);

		// Add a event listener to verify if input is checked
		checkboxInput.addEventListener('change', e => {
			const target = e.target as HTMLInputElement;

			// Call function to change task status on Notion
			checkTask(target);
		});

		// Create a span element to add the task text value
		const span = document.createElement('span');
		span.innerText = item.properties.Name.title[0].plain_text;

		// Append the input and the span in the task div container
		taskDiv.appendChild(checkboxInput);
		taskDiv.appendChild(span);

		// Append the task container on the
		taskListContainer?.appendChild(taskDiv);
	});

	// Add the created list on the app element
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
