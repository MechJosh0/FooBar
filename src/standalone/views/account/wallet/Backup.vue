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
		<DialogPasswordConfirmation
			v-model="passwordHasBeenConfirmed"
			:dialogIsOpen="dialogIsOpen"
			:persistent="false"
			@closed="dialogIsOpen = false"
		/>
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
				passwordHasBeenConfirmed: false,
				password: '',
				viewPrivateKey: false,
				copiedPrivateKey: false,
				privateKeyViewable: false
			};
		},
		computed: {
			privateKey()
			{
				return this.$store.getters['wallets/decryptedActiveWalletPrivateKey'];
			},
			wallet()
			{
				return this.$store.getters['wallets/getActiveWallet'];
			}
		},
		watch: {
			passwordHasBeenConfirmed()
			{
				this.onSubmit();
			}
		},
		methods: {
			viewPrivateKeyRequest()
			{
				if(!this.privateKeyViewable)
				{
					this.dialogIsOpen = true;
				}
				else
				{
					this.viewPrivateKey = !this.viewPrivateKey;
				}
			},
			onSubmit()
			{
				if(this.passwordHasBeenConfirmed)
				{
					this.privateKeyViewable = true;
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
				this.download(`${this.wallet.address}.keystore`, this.wallet);
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
