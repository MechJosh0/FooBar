<template>
	<CenteredCard>
		<q-form
			@submit="onSubmit"
			@reset="onReset"
		>
			<q-input
				v-model="file"
				type="file"
				filled
				stackLabel
				:label="$t('views.import.form.fields.file.label')"
				lazyRules
				:rules="validation.file"
			/>
			<q-input
				v-model="name"
				filled
				:label="$t('views.import.form.fields.name.label')"
				lazyRules
				:rules="validation.name"
			/>
			<q-input
				v-model="password"
				filled
				:label="$t('views.import.form.fields.password.label')"
				lazyRules
				:rules="validation.password"
			/>
			<div class="float-right">
				<q-btn
					:label="$t('views.import.form.buttons.create')"
					:to="{ name: 'account.create' }"
					type="submit"
					color="secondary"
				/>
				<q-btn
					:label="$t('views.import.form.buttons.import')"
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
					file: [
						(val) =>
						{
							if(val && val.length > 0) return true;

							return this.$t('views.import.form.fields.file.errors.required');
						},
						(val) =>
						{
							const path = val.split('.');

							if(['keystore', 'txt'].includes(path[path.length - 1])) return true;

							return this.$t('views.import.form.fields.file.errors.fileType');
						}
					],
					name: [
						(val) =>
						{
							if(val && val.length > 0) return true;

							return this.$t('views.import.form.fields.name.errors.required');
						},
						(val) =>
						{
							if(!this.$store.getters['account/getAccountBy']('name', val)) return true;

							return this.$t('views.import.form.fields.name.errors.exists');
						}
					],
					password: [
						(val) =>
						{
							if(val && val.length > 0) return true;

							return this.$t('views.import.form.fields.password.errors.required');
						}
					]
				},
				file: '',
				password: '',
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

					error(this.$t('views.create.form.submit.somethingWentWrong'));

					return;
				}

				success(this.$t('views.create.form.submit.success'));
				this.$router.push({ name: 'account.user', params: { account: this.name } });
			}
		}
	};
</script>
