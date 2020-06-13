
const routes = {
	clients: {
		add:"https://f364eb975a92.ngrok.io/app-accounting/clients_/add/",
		list:"https://f364eb975a92.ngrok.io/app-accounting/clients_/list/",
		update:"https://f364eb975a92.ngrok.io/app-accounting/clients_/update/",
		delete:"https://f364eb975a92.ngrok.io/app-accounting/clients_/delete/"
	},
	sales: {
		add:"https://f364eb975a92.ngrok.io/app-accounting/sales_/add/",
		list:"https://f364eb975a92.ngrok.io/app-accounting/sales_/list/",
		list_id:"https://f364eb975a92.ngrok.io/app-accounting/sales_/list_id/",
		list_id_sale:"https://f364eb975a92.ngrok.io/app-accounting/sales_/list_id_sale",
		update:"https://f364eb975a92.ngrok.io/app-accounting/sales_/update/",
		delete:"https://f364eb975a92.ngrok.io/app-accounting/sales_/delete/"
	},
	balances: {
		add:"https://f364eb975a92.ngrok.io/app-accounting/payment_product/add/",
		list:"https://f364eb975a92.ngrok.io/app-accounting/payment_product/list/",
		update:"https://f364eb975a92.ngrok.io/app-accounting/payment_product/update/",
		delete:"https://f364eb975a92.ngrok.io/app-accounting/payment_product/delete/"
	},

	categories: {
		add:"",
		list:"https://f364eb975a92.ngrok.io/app-accounting/categories_/list/",
	},

	products: {
		add:"https://f364eb975a92.ngrok.io/app-accounting/products_/add/",
		list:"https://f364eb975a92.ngrok.io/app-accounting/products_/list/",
		update:"https://f364eb975a92.ngrok.io/app-accounting/products_/update/",
		delete:"https://f364eb975a92.ngrok.io/app-accounting/products_/delete/"
	},

	baseurl: {
		url: "https://f364eb975a92.ngrok.io"
	}
};


export default routes;
