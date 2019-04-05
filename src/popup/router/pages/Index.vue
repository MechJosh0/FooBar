<template>
	<div>
		<h1>popup {{ defaultText }}</h1>
		<button @click="open()">
			Click
		</button>
	</div>
</template>

<script>

	export default {
		data()
		{
			return {};
		},
		computed: {
			defaultText()
			{
				return chrome.i18n.getMessage('extName');
			}
		},
		mounted()
		{
			chrome.runtime.sendMessage({});
		},
		methods: {
			open()
			{
				chrome.tabs.create({ url: 'index.html' });
			}
		}
	};
</script>
