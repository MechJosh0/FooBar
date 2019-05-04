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
				:label="$t('views.register.form.fields.password.label')"
				lazyRules
				:rules="validation.password"
			/>
			<q-input
				v-model="passwordVerify"
				type="password"
				filled
				:label="$t('views.register.form.fields.passwordVerify.label')"
				lazyRules
				:rules="validation.passwordVerify"
			/>
			<div class="float-right">
				<q-btn
					:label="$t('views.register.form.buttons.submit')"
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

							return this.$t('views.register.form.fields.password.errors.required');
						}
					],
					passwordVerify: [
						(val) => // Required
						{
							if(val && val.length > 0) return true;

							return this.$t('views.register.form.fields.passwordVerify.errors.required');
						},
						(val) => // Must match
						{
							if(val === this.password) return true;

							return this.$t('views.register.form.fields.passwordVerify.errors.noMatch');
						}
					]
				},
				password: '',
				passwordVerify: ''
			};
		},
		methods: {
			onReset()
			{
				this.password = '';
				this.passwordVerify = '';
			},
			onSubmit()
			{
				this.$store.dispatch('app/account/register', this.password);
				success(this.$t('views.register.form.submit.success'));
				this.$router.push({ name: 'account.create' });
			}
		}
	};
</script>
