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
	import { success } from '@/utils/notifications';
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
						}
					]
				},
				password: ''
			};
		},
		computed: {
			appPassword()
			{
				return this.$store.getters['app/account/password'];
			}
		},
		methods: {
			onReset()
			{
				this.password = '';
			},
			onSubmit()
			{
				try
				{
					this.$store.dispatch('app/account/login', this.password);
					success(this.$t('views.login.form.submit.success'));
					this.$router.push({ name: 'account.create' });
				}
				catch(e)
				{
					console.error(e.message);

					success(this.$t('views.login.form.submit.error'));
				}
			}
		}
	};
</script>
