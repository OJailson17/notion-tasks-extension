import { api } from '../lib/axios';
import { checkTask } from './checkTask';

interface ResponseProps {
	id: string;
	title: string;
	status: string | null;
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

		const isInputChecked = item.status === 'Done';

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
		span.innerText = item.title;

		// Create a div to show task status
		const statusElement = document.createElement('div');
		statusElement.setAttribute('class', 'status');

		// Change status div class depending on the status
		switch (item.status) {
			case 'Not Started':
				statusElement.classList.remove('in-progress', 'overdue', 'todo');
				statusElement.classList.add('todo');
				break;
			case 'In progress':
				statusElement.classList.remove('in-progress', 'overdue', 'todo');
				statusElement.classList.add('in-progress');
				break;
			case 'Overdue':
				statusElement.classList.remove('in-progress', 'overdue', 'todo');
				statusElement.classList.add('overdue');
				break;
			default:
				statusElement.classList.remove('in-progress', 'overdue', 'todo');
				statusElement.classList.add('todo');
		}

		// Append the input, span and div element in the task div container
		taskDiv.appendChild(checkboxInput);
		taskDiv.appendChild(span);
		taskDiv.appendChild(statusElement);

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
		const response = await api.get('/projects');
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
