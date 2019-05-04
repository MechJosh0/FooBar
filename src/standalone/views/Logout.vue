<template>
	<div>
		Logout page...
	</div>
</template>

<script>
	export default {
		mounted()
		{
			this.$store.dispatch('app/account/logout');
		}
	};
</script>
