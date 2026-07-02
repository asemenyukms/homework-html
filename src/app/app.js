import html from "./app.html";
import './app.css'
import { initCounterpartiesPage } from "./pages/counterparties/counterparties-page";

const rootElement = document.getElementById('root');
rootElement.innerHTML = html;

initCounterpartiesPage(document);