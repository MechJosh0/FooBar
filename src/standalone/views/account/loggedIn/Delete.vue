<template>
	<div>
		<h4>{{ $t('views.delete.title') }}</h4>
		<p v-html="$t('views.delete.request', { address: `<b>${account.address}</b>` })" />
		<p v-html="$t('views.delete.backupWarning')" />
		<q-btn
			:label="$t('views.delete.cancel')"
			color="positive"
			:to="{ name: 'index' }"
		/>
		<q-btn
			:label="$t('views.delete.openConfirmWindow')"
			color="negative"
			@click="openDialog()"
		/>
		<DialogPasswordConfirmation
			v-model="passwordHasBeenConfirmed"
			:dialogIsOpen="dialogIsOpen"
			:persistent="false"
			@closed="dialogIsOpen = false"
		>
			<template #information>
				{{ $t('views.delete.dialog.information') }}
			</template>
			<template #submitLabel>
				{{ $t('views.delete.dialog.submit') }}
			</template>
		</DialogPasswordConfirmation>
	</div>
</template>

<script>
	import DialogPasswordConfirmation from '@/standalone/components/account/DialogPasswordConfirmation';

	export default {
		components: {
			DialogPasswordConfirmation
		},
		data()
		{
			return {
				dialogIsOpen: false,
				passwordHasBeenConfirmed: false
			};
		},
		computed: {
			account()
			{
				return this.$store.getters['account/getActiveAccount'];
			}
		},
		watch: {
			passwordHasBeenConfirmed()
			{
				this.deleteWallet();
			}
		},
		methods: {
			openDialog()
			{
				if(!this.passwordHasBeenConfirmed) // I don't know why but enter key is triggering twice when you submit the form via keypress and this avoids trying to open it again :/
				{
					this.dialogIsOpen = true;
				}
			},
			deleteWallet()
			{
				this.$store.dispatch('account/deleteActive', this.account.address);
				this.$router.push({ name: 'index' });
			}
		}
	};
</script>
