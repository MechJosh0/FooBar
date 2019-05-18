<template>
	<CenteredCard>
		<q-form
			@submit="onSubmit"
			@reset="onReset"
		>
			<q-tabs
				v-model="importMethod"
				dense
				class="bg-grey-3 text-grey-7"
				activeColor="primary"
				indicatorColor="primary"
				align="justify"
			>
				<q-tab name="file" :label="$t('views.import.importMethods.file')" />
				<q-tab name="privateKey" :label="$t('views.import.importMethods.privateKey')" />
			</q-tabs>

			<q-separator />

			<q-tab-panels v-model="importMethod" animated>
				<q-tab-panel name="file">
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
						v-model="password"
						type="password"
						filled
						:label="$t('views.import.form.fields.password.label')"
						lazyRules
						:rules="validation.password"
					/>
					<q-input
						v-model="name"
						filled
						:label="$t('views.import.form.fields.name.label')"
						lazyRules
						:rules="validation.name"
					/>
				</q-tab-panel>

				<q-tab-panel name="privateKey">
					<q-input
						v-model="privateKey"
						filled
						:label="$t('views.import.form.fields.privateKey.label')"
						lazyRules
						:rules="validation.privateKey"
					/>
					<q-input
						v-model="name"
						filled
						:label="$t('views.import.form.fields.name.label')"
						lazyRules
						:rules="validation.name"
					/>
				</q-tab-panel>
			</q-tab-panels>
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
	import Account from '@/utils/nuls-js/account';
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
					privateKey: [
						(val) => // Required
						{
							if(val && val.length > 0) return true;

							return this.$t('views.import.form.fields.privateKey.errors.required');
						}
					],
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
						async (val) => // Required
						{
							if(val && val.length > 0) return true;

							const [file] = this.$refs.file.$refs.input.files;
							const accountData = await this.readJSONFileContent(file);

							if(accountData.prikey)
							{
								return true;
							}

							return this.$t('views.import.form.fields.password.errors.required');
						},
						async (val) => // Validate
						{
							const [file] = this.$refs.file.$refs.input.files;
							const accountData = await this.readJSONFileContent(file);

							if(accountData.prikey)
							{
								return true;
							}

							try
							{
								Account.import(accountData.encryptedPrivateKey, val);

								return true;
							}
							catch(e)
							{
								return this.$t('views.import.form.fields.password.errors.incorrect');
							}
						}
					]
				},
				privateKey: '',
				file: '',
				password: '',
				name: '',
				importMethod: 'file'
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
				if(!file) return {};

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
				this.name = '';
				this.password = '';
				this.file = null;
			},
			async onSubmit()
			{
				let accountData = {};

				if(this.importMethod === 'file')
				{
					const [file] = this.$refs.file.$refs.input.files;

					accountData = await this.readJSONFileContent(file);
				}
				else if(this.importMethod === 'privateKey')
				{
					accountData = { prikey: this.privateKey };
				}

				const res = await this.$store.dispatch('account/importAccount', {
					name: this.name,
					walletPassword: this.password,
					accountData
				});

				if(!res.success)
				{
					error(this.$t(`views.import.form.submit.${res.errorCode}`));
					this.passwordIsValid = false;

					return;
				}

				success(this.$t('views.import.form.submit.success'));
				this.$router.push({ name: 'account.wallet.user', params: { account: this.name } });
			}
		}
	};
</script>
