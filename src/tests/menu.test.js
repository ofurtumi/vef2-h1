import { describe, expect, test } from '@jest/globals';
import { deleteAndParse, fetchAndParse, postAndParse } from '../lib/utils.js';

describe('menuitems category', () => {
	test('GET /menu?category=burgers', async () => {
		const output = await fetchAndParse(
			'/menu?category=burgers&search=cheeseburger'
		);
		const { id, title, price, categoryid } = output.result[0];

		expect(id).toBe(1);
		expect(title).toBe('cheeseburger');
		expect(price).toBe(500);
		expect(categoryid).toBe('27dc4dc7-7a06-4306-9923-f124066747fa');
	});
});
describe('menuitems search', () => {
	test('GET /menu?search=cheeseburger', async () => {
		const output = await fetchAndParse(
			'/menu?category=burgers&search=cheeseburger'
		);
		const { id, title, price, categoryid } = output.result[0];

		expect(id).toBe(1);
		expect(title).toBe('cheeseburger');
		expect(price).toBe(500);
		expect(categoryid).toBe('27dc4dc7-7a06-4306-9923-f124066747fa');
	});
});
describe('menuitems category and search', () => {
	test('GET /menu?category=burgers&search=cheeseburger', async () => {
		const output = await fetchAndParse(
			'/menu?category=burgers&search=cheeseburger'
		);
		const { id, title, price, categoryid } = output.result[0];

		expect(id).toBe(1);
		expect(title).toBe('cheeseburger');
		expect(price).toBe(500);
		expect(categoryid).toBe('27dc4dc7-7a06-4306-9923-f124066747fa');
	});
});
describe('menuitems delete item that exists, (not admin :)', () => {
	test('DELETE /menu/31', async () => {
		const output = await deleteAndParse('/menu/31');
		const { result, item } = output.result;

		expect(item).toBe('testpizza');
		expect(result).toBe('successfully deleted');
	});
});
describe('menuitems add the item again, (not admin :)', () => {
	test('POST /menu', async () => {
		const output = await postAndParse('/menu', {
			title: 'testpizza',
			price: 1000,
			description: 'test description',
			image: 'testLinkToImage',
			categoryid: 'e7cfb87e-d881-4d23-91b1-47295846ef42',
		});
		console.log('output --> ', output);
		const { title, price, description, image, categoryid } =
			output.result[0];

		expect(title).toBe('testpizza');
		expect(price).toBe(1000);
		expect(description).toBe('test description');
		expect(image).toBe('testLinkToImage');
		expect(categoryid).toBe('e7cfb87e-d881-4d23-91b1-47295846ef42');
	});
});
