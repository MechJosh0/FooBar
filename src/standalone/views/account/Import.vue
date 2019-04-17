<template>
	<CenteredCard>
		<q-form
			@submit="onSubmit"
			@reset="onReset"
		>
			<q-input
				ref="file"
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
				type="password"
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
						(val) => // Required
						{
							if(val && val.length > 0) return true;

							return this.$t('views.import.form.fields.file.errors.required');
						},
						() => // File type
						{
							const [file] = this.$refs.file.$refs.input.files;
							const path = file.name.split('.');

							if(['keystore', 'txt'].includes(path[path.length - 1])) return true;

							return this.$t('views.import.form.fields.file.errors.fileType');
						},
						() => // File size
						{
							const [file] = this.$refs.file.$refs.input.files;

							if(file.size < 1000) return true;

							return this.$t('views.import.form.fields.file.errors.fileSize');
						},
						async () => // Valid wallet data
						{
							const [file] = this.$refs.file.$refs.input.files;
							const accountData = await this.readJSONFileContent(file);
							let valid = true;

							if(!accountData.encryptedPrivateKey && !accountData.prikey) valid = false;

							if(valid) return true;

							return this.$t('views.import.form.fields.file.errors.invalidWalletData');
						}
					],
					name: [
						(val) => // Required
						{
							if(val && val.length > 0) return true;

							return this.$t('views.import.form.fields.name.errors.required');
						},
						(val) => // Unique
						{
							if(!this.$store.getters['account/getAccountBy']('name', val)) return true;

							return this.$t('views.import.form.fields.name.errors.exists');
						}
					],
					password: [
						(val) => // Required
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
			async readJSONFileContent(file)
			{
				const reader = new FileReader();

				const fileContents = new Promise((resolve, reject) =>
				{
					reader.onload = (event) => resolve(event.target.result);
					reader.onerror = (error) => reject(error);
					reader.readAsText(file);
				});

				const accountData = JSON.parse(await fileContents);

				// Fix type formats
				accountData.prikey = accountData.prikey === 'null' ? null : accountData.prikey;

				return accountData;
			},
			deleteAccount()
			{
				this.$store.dispatch('account/logOut');
			},
			onReset()
			{
				this.name = null;
				this.password = null;
			},
			async onSubmit()
			{
				const [file] = this.$refs.file.$refs.input.files;
				const accountData = await this.readJSONFileContent(file);
				const res = await this.$store.dispatch('account/importAccount', {
					name: this.name,
					password: this.password,
					accountData
				});

				if(!res.success)
				{
					error(this.$t(`views.import.form.submit.${res.errorCode}`));

					return;
				}

				success(this.$t('views.import.form.submit.success'));
				this.$router.push({ name: 'account.user', params: { account: this.name } });
			}
		}
	};
</script>
