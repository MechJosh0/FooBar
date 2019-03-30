<template>
	<div>
		<h1>popup {{ defaultText }}</h1>
		<button @click="open()">
			Click
		</button>
		<v-btn color="success">
			Success
		</v-btn>
		<v-btn color="error">
			Error
		</v-btn>
		<v-btn color="warning">
			Warning
		</v-btn>
		<v-btn color="info">
			Info
		</v-btn>
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
