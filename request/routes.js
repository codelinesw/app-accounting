
const routes = {
	clients: {
		add:"https://381f5e6f.ngrok.io/app-accounting/clients_/add/",
		list:"https://381f5e6f.ngrok.io/app-accounting/clients_/list/",
		update:"https://381f5e6f.ngrok.io/app-accounting/clients_/update/",
		delete:"https://381f5e6f.ngrok.io/app-accounting/clients_/delete/"
	},
	sales: {
		add:"https://381f5e6f.ngrok.io/app-accounting/sales_/add/",
		list:"https://381f5e6f.ngrok.io/app-accounting/sales_/list/",
		list_id:"https://381f5e6f.ngrok.io/app-accounting/sales_/list_id/",
		list_id_sale:"https://381f5e6f.ngrok.io/app-accounting/sales_/list_id_sale",
		update:"https://381f5e6f.ngrok.io/app-accounting/sales_/update/",
		delete:"https://381f5e6f.ngrok.io/app-accounting/sales_/delete/"
	},
	balances: {
		add:"https://381f5e6f.ngrok.io/app-accounting/payment_product/add/",
		list:"https://381f5e6f.ngrok.io/app-accounting/payment_product/list/",
		update:"https://381f5e6f.ngrok.io/app-accounting/payment_product/update/",
		delete:"https://381f5e6f.ngrok.io/app-accounting/payment_product/delete/"
	},

	categories: {
		add:"",
		list:"https://381f5e6f.ngrok.io/app-accounting/categories_/list/",
	},

	products: {
		add:"https://381f5e6f.ngrok.io/app-accounting/products_/add/",
		list:"https://381f5e6f.ngrok.io/app-accounting/products_/list/",
		update:"https://381f5e6f.ngrok.io/app-accounting/products_/update/",
		delete:"https://381f5e6f.ngrok.io/app-accounting/products_/delete/"
	},

	baseurl: {
		url: "https://381f5e6f.ngrok.io"
	}
};


export default routes;
