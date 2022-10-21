import { api } from '../lib/axios';
import { checkTask } from './checkTask';

interface ResponseProps {
	id: string;
	properties: {
		Name: {
			title: {
				plain_text: string;
			}[];
		};
		Status: {
			status: {
				name: string;
			};
		};
	};
}

// The container the will render the whole task list
const taskListContainer = document.querySelector('#tasks-container');

// Render the list of elements
const generateTasksList = (listItems: ResponseProps[]) => {
	taskListContainer.innerHTML = '';

	// Create li on the ul element with the task title
	listItems.forEach(item => {
		// Create task element
		const taskDiv = document.createElement('div');
		taskDiv.setAttribute('class', 'task');

		const isInputChecked = item.properties?.Status?.status?.name === 'Done';

		// Create a checkbox input and set atributes to it
		const checkboxInput = document.createElement('input');
		checkboxInput.setAttribute('type', 'checkbox');
		checkboxInput.setAttribute('id', 'taskCheck');
		checkboxInput.setAttribute('name', 'isDone');
		checkboxInput.setAttribute('data-id', item.id);

		// Mark input as checked if task status is 'Done'
		checkboxInput.checked = isInputChecked;

		// Add a event listener to verify if input is checked
		checkboxInput.addEventListener('change', async e => {
			const target = e.target as HTMLInputElement;

			// Call function to change task status on Notion
			const response = await checkTask(target);

			// Re-reder the list if the status changes correctly
			if (response.status === 200) {
				console.log({ response });
				await getTasksData();
			}
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
};

// Render a paragraph to show empty list message
const generateEmptyComponent = () => {
	taskListContainer.innerHTML = `
	<p class="empty-list">Nenhuma tarefa</p>
	`;
};

// Get the tasks data from api
export const getTasksData = async () => {
	try {
		const response = await api.get('/');
		const tasks = (await response.data) as ResponseProps[];

		console.log(tasks);

		if (tasks.length <= 0) {
			generateEmptyComponent();
		} else {
			generateTasksList(tasks);
		}
	} catch (error) {
		console.log(error);
	}
};
