<template>
	<CenteredCard>
		<q-form
			@submit="onSubmit"
			@reset="onReset"
		>
			<q-input
				v-model="name"
				filled
				:label="$t('views.create.form.fields.name.label')"
				lazyRules
				:rules="validation.name"
			/>
			<div class="float-right">
				<q-btn
					:label="$t('views.create.form.buttons.import')"
					:to="{ name: 'account.wallet.import' }"
					type="submit"
					color="secondary"
				/>
				<q-btn
					:label="$t('views.create.form.buttons.submit')"
					type="submit"
					color="primary"
				/>
			</div>
		</q-form>
	</CenteredCard>
</template>

<script>
	import { success, error } from '@/utils/notifications';
	import CenteredCard from '@/standalone/components/pageContainers/CenteredCard';

	export default {
		components: {
			CenteredCard
		},
		data()
		{
			return {
				validation: {
					name: [
						(val) => // Required
						{
							if(val && val.length > 0) return true;

							return this.$t('views.create.form.fields.name.errors.required');
						},
						(val) => // Unique
						{
							if(!this.$store.getters['wallets/getWalletBy']('name', val)) return true;

							return this.$t('views.create.form.fields.name.errors.exists');
						}
					]
				},
				name: ''
			};
		},
		computed: {
			appPassword()
			{
				return this.$store.getters['app/account/password'];
			},
			wallet()
			{
				return this.$store.getters['wallets/getActiveWallet'];
			}
		},
		methods: {
			onReset()
			{
				this.name = '';
			},
			async onSubmit()
			{
				const res = await this.$store.dispatch('wallets/createNewWallet', this.name);

				if(!res.success)
				{
					error(this.$t('views.create.form.submit.somethingWentWrong'));

					return;
				}

				success(this.$t('views.create.form.submit.success'));
				this.$router.push({ name: 'account.wallet.user', params: { wallet: this.name } });
			}
		}
	};
</script>
