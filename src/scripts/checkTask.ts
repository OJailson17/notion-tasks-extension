import { api } from '../lib/axios';

interface APIResponse {
	status: number;
	data: {
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
	};
}

/* 
  The function receives a html input event and change task status on Notion to DONE if input is checked
 */
export const checkTask = async (
	event: HTMLInputElement,
): Promise<APIResponse> => {
	const { id } = event.dataset;

	try {
		const response: APIResponse = await api.post(
			`/projects/status/update/${id}`,
			{
				isChecked: event.checked,
			},
		);

		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
	}

	return null;
};
