<template>
	<div>
		<h4>{{ $t('views.backup.privateKey.title') }}</h4>
		<p>{{ $t('views.backup.privateKey.information') }}</p>
		<q-toggle
			:value="viewPrivateKey"
			:label="$t('views.backup.privateKey.download')"
			class="q-mb-md"
			@input="viewPrivateKeyRequest()"
		/>
		<q-slide-transition>
			<div v-show="viewPrivateKey">
				<div class="q-pa-md">
					<q-input
						ref="textarea"
						v-model="privateKey"
						filled
						type="textarea"
						readonly
						autogrow
						class="privateKey"
						@click="copyPrivateKey"
					>
						<q-tooltip v-if="copiedPrivateKey" v-model="copiedPrivateKey">
							{{ $t('views.backup.privateKey.copied') }}
						</q-tooltip>
					</q-input>
				</div>
			</div>
		</q-slide-transition>
		<h4>{{ $t('views.backup.keystore.title') }}</h4>
		<p>{{ $t('views.backup.keystore.information', { appName: $t('header.title') }) }}</p>
		<q-btn
			color="primary"
			:label="$t('views.backup.keystore.download')"
			@click="triggerDownload"
		/>
		<!-- Dialog window -->
		<q-dialog v-model="passwordDialogIsOpen" persistent>
			<q-card style="min-width: 400px">
				<q-form
					@submit="onSubmit"
					@reset="onReset"
				>
					<q-card-section>
						<div class="text-h6">
							{{ $t('views.backup.privateKey.dialog.title') }}
						</div>
					</q-card-section>

					<q-card-section>
						<q-input
							v-model="password"
							type="password"
							:label="$t('views.backup.privateKey.dialog.input')"
							dense
							autofocus
							lazyRules
							:rules="validation.password"
						/>
					</q-card-section>

					<q-card-actions align="right" class="text-primary">
						<q-btn
							v-close-popup
							flat
							:label="$t('views.backup.privateKey.dialog.cancel')"
						/>
						<q-btn
							:label="$t('views.backup.privateKey.dialog.submit')"
							type="submit"
							color="secondary"
						/>
					</q-card-actions>
				</q-form>
			</q-card>
		</q-dialog>
	</div>
</template>

<script>
	export default {
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
				passwordDialogIsOpen: false,
				password: '',
				viewPrivateKey: false,
				copiedPrivateKey: false,
				privateKeyViewable: false
			};
		},
		computed: {
			privateKey()
			{
				return this.$store.getters['account/decryptedActiveAccountPrivateKey'];
			},
			account()
			{
				return this.$store.getters['account/getActiveAccount'];
			}
		},
		methods: {
			viewPrivateKeyRequest()
			{
				if(!this.privateKeyViewable)
				{
					this.passwordDialogIsOpen = true;
				}
				else
				{
					this.viewPrivateKey = !this.viewPrivateKey;
				}
			},
			onReset()
			{
				this.password = '';
			},
			onSubmit()
			{
				if(this.$store.getters['app/account/isValidPassword'](this.password))
				{
					this.privateKeyViewable = true;
					this.passwordDialogIsOpen = false;
					this.viewPrivateKey = true;
				}
			},
			download(fileName, data)
			{
				const element = document.createElement('a');

				element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`);
				element.setAttribute('download', fileName);

				element.style.display = 'none';
				document.body.appendChild(element);

				element.click();

				document.body.removeChild(element);
			},
			triggerDownload()
			{
				this.download(`${this.account.address}.keystore`, this.account);
			},
			togglePrivateKeyView()
			{
				this.viewPrivateKey = !this.viewPrivateKey;
			},
			copyPrivateKey()
			{
				this.copiedPrivateKey = true;
				this.$refs.textarea.$el.getElementsByTagName('textarea')[0].select();
				document.execCommand('copy');
			}
		}
	};
</script>

<style scoped>
	.privateKey >>> textarea {
		text-align: center;
	}
</style>
