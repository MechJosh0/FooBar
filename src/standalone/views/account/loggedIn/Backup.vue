<template>
	<div>
		<h4>{{ $t('views.backup.privateKey.title') }}</h4>
		<p>{{ $t('views.backup.privateKey.information') }}</p>
		<q-toggle
			v-model="viewPrivateKey"
			:label="$t('views.backup.privateKey.download')"
			class="q-mb-md"
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
	</div>
</template>

<script>
	export default {
		data()
		{
			return {
				viewPrivateKey: false,
				copiedPrivateKey: false
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
				this.download(`${this.account.address}.keystore`, {
					...this.account,
					prikey: null
				});
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
