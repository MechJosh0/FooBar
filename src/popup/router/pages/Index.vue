<template>
	<div>
		<h3>popup {{ defaultText }}</h3>
		<p>{{ applicationPassword }}</p>
		<button @click="open()">
			Click
		</button>
	</div>
</template>

<script>

	export default {
		data()
		{
			return {
				applicationPassword: null
			};
		},
		computed: {
			defaultText()
			{
				return chrome.i18n.getMessage('extName');
			}
		},
		mounted()
		{
			chrome.runtime.sendMessage({ method: 'get', type: 'applicationPassword' }, (res) =>
			{
				this.applicationPassword = res;
			});
		},
		methods: {
			open()
			{
				chrome.tabs.create({ url: 'index.html' });
			}
		}
	};
</script>
