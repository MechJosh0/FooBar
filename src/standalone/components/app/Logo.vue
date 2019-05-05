<template>
	<q-btn flat :to="{ name: 'index' }">
		<q-avatar class="on-left">
			<img src="https://cdn.quasar-framework.org/logo/svg/quasar-logo.svg">
		</q-avatar>
		{{ $t('header.title') }}
	</q-btn>
</template>
