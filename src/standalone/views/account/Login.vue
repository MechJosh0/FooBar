<template>
	<CenteredCard>
		<q-form
			@submit="onSubmit"
			@reset="onReset"
		>
			<q-input
				v-model="password"
				type="password"
				filled
				:label="$t('views.login.form.fields.password.label')"
				lazyRules
				:rules="validation.password"
			/>
			<div class="float-right">
				<q-btn
					:label="$t('views.login.form.buttons.submit')"
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
					password: [
						(val) => // Required
						{
							if(val && val.length > 0) return true;

							return this.$t('views.login.form.fields.password.errors.required');
						},
						(val) => // Validate
						{
							if(this.$store.getters['app/account/isValidPassword'](val)) return true;

							return this.$t('views.login.form.fields.password.errors.incorrect');
						}
					]
				},
				password: ''
			};
		},
		computed: {
			wallets()
			{
				return this.$store.getters['wallets/getWallets'];
			}
		},
		methods: {
			onReset()
			{
				this.password = '';
			},
			async onSubmit()
			{
				const res = this.$store.dispatch('app/account/login', this.password);

				if(res)
				{
					success(this.$t('views.login.form.submit.success'));

					if(Object.keys(this.wallets).length)
					{
						this.$router.push({ name: 'index' });

						return;
					}

					this.$router.push({ name: 'account.wallet.create' });
				}
				else
				{
					error(this.$t('views.login.form.submit.error'));
				}
			}
		}
	};
</script>
