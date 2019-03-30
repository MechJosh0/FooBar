import store from './store';

chrome.browserAction.onClicked.addListener((tab) =>
{
	console.log(`Hello ${store.getters.foo}!`);
});
