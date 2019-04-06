<template>
	<CenteredCard>
		<q-form
			@submit="onSubmit"
			@reset="onReset"
		>
			<q-input
				v-model="name"
				filled
				:label="$t('views.login.form.fields.name.label')"
				:hint="$t('views.login.form.fields.name.hint')"
				lazyRules
				:rules="validation.name"
			/>
			<div class="float-right">
				<q-btn
					:label="$t('views.login.form.buttons.import')"
					:to="{ name: 'account.import' }"
					type="submit"
					color="secondary"
				/>
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
					name: [
						(val) =>
						{
							if(val && val.length > 0) return true;

							return this.$t('views.login.form.fields.name.errors.required');
						},
						(val) =>
						{
							if(!this.$store.getters['account/getAccountBy']('name', val)) return true;

							return this.$t('views.login.form.fields.name.errors.exists');
						}
					]
				},
				name: ''
			};
		},
		computed: {
			account()
			{
				return this.$store.getters['account/getActiveAccount'];
			}
		},
		methods: {
			deleteAccount()
			{
				this.$store.dispatch('account/logOut');
			},
			onReset()
			{
				this.name = null;
			},
			onSubmit()
			{
				const res = this.$store.dispatch('account/createNewAccount', this.name);

				if(!res)
				{
					console.log(res);

					error(this.$t('views.login.form.submit.somethingWentWrong'));

					return;
				}

				success(this.$t('views.login.form.submit.success'));
				this.$router.push({ name: 'account.user', params: { account: this.name } });
			}
		}
	};
</script>
