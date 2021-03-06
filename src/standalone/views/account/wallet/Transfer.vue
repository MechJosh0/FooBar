<template>
	<CenteredCard>
		<q-form
			v-if="!isMainNet && !errorConnectingToServer"
			@submit="onSubmit"
			@reset="onReset"
		>
			<div class="row q-pa-sm">
				<q-space />
				<q-toggle
					v-model="transaction.advanced"
					class="float-right"
					:label="$t('views.transfer.form.fields.advanced.label')"
					leftLabel
				/>
			</div>
			<div v-if="transaction.advanced" class="row q-pa-sm">
				<q-space />
				<q-icon
					name="fas fa-user-plus"
					class="cursor-pointer"
					@click="newRecipient"
				/>
			</div>
			<q-input
				v-for="(address, i) in transaction.recipients"
				:key="i"
				v-model="transaction.recipients[i]"
				filled
				:label="$t('views.transfer.form.fields.recipients.label')"
				lazyRules
				:rules="validation.recipients"
			>
				<template v-slot:append>
					<q-icon
						v-if="i !== 0"
						name="fas fa-user-minus"
						class="cursor-pointer"
						@click="removeRecipient(i)"
					/>
				</template>
			</q-input>
			<q-input
				v-model="transaction.amount"
				filled
				:label="$t('views.transfer.form.fields.amount.label')"
				lazyRules
				:rules="validation.amount"
			>
				<!-- <template v-slot:append>
					£40.00 // TODO I could use CoinMarketCap API here
				</template> -->
			</q-input>
			<q-input
				v-if="transaction.advanced"
				v-model="transaction.remark"
				type="textarea"
				filled
				:label="$t('views.transfer.form.fields.remark.label')"
				lazyRules
			/>
			<q-list v-if="transaction.advanced" dense>
				<q-item>
					<q-item-section>
						<q-slider
							v-model="transaction.fee"
							:min="0.001"
							:max="0.01"
							:step="0.001"
							:labelValue="$t('views.transfer.form.fields.fee.label', { amount: transaction.fee })"
							:disable="transaction.autoFee"
							label
						/>
					</q-item-section>
					<q-item-section avatar>
						<q-toggle
							v-model="transaction.autoFee"
							class="float-right"
							:label="$t('views.transfer.form.fields.autoFee.label')"
							leftLabel
						/>
					</q-item-section>
				</q-item>
			</q-list>
			<div class="float-right">
				<q-btn
					v-if="errorConnectingToServer === false"
					:label="$t('views.transfer.form.buttons.submit')"
					type="submit"
					color="secondary"
				/>
				<q-btn
					v-else
					type="disabled"
					color="secondary"
				>
					<q-spinner
						color="primary"
					/>
				</q-btn>
			</div>
		</q-form>
		<div v-else-if="errorConnectingToServer">
			<q-banner inlineActions class="text-white bg-red">
				{{ $t('views.transfer.serverError') }}
			</q-banner>
		</div>
		<div v-else>
			{{ $t('views.transfer.beta') }}
		</div>
	</CenteredCard>
</template>

<script>
	import { TransferTransaction, nulsToNa, Utxo } from 'nuls-js';
	import CenteredCard from '@/standalone/components/pageContainers/CenteredCard';

	// 32 character limit on addresses (maybe check for first characters - testnet/mainnet differences!)

	export default {
		components: {
			CenteredCard
		},
		data()
		{
			const release = this.$store.getters['app/getRelease'];

			return {
				release,
				validation: {
					amount: [
						(val) =>
						{
							if(Number(val)) return true;

							return this.$t('views.transfer.form.fields.amount.errors.number');
						},
						(val) =>
						{
							if(Number(val) >= 0.01) return true;

							return this.$t('views.transfer.form.fields.amount.errors.minimum');
						}
					],
					recipients: [
						(val) => // Required
						{
							if(val && val.length > 0) return true;

							return this.$t('views.transfer.form.fields.recipients.errors.required');
						},
						(val) => // Invalid length
						{
							if(val.length === 32) return true;

							return this.$t('views.transfer.form.fields.recipients.errors.length');
						},
						(val) => // TestNet vs MainNet
						{
							switch(release)
							{
								case 'testNet':
									if(['TTa'].includes(val.substr(0, 3))) return true;

									return this.$t('views.transfer.form.fields.recipients.errors.testNet');
								case 'mainNet':
									if(['Nsd', 'Nse'].includes(val.substr(0, 3))) return true;

									return this.$t('views.transfer.form.fields.recipients.errors.testNet');
								default:
									console.error('Unknown release', release);

									return this.$t('views.transfer.form.fields.recipients.errors.unknownRelease');
							}
						}
					]
				},
				errorConnectingToServer: null,
				utxos: null,
				tx: null,
				transactionHash: null,
				transaction: this.transactionForm(),
				transactionConfig: {
					api: {
						host: 'https://explorer.nuls.services'
					}
				}
			};
		},
		computed: {
			wallet()
			{
				return this.$store.getters['wallets/getActiveWallet'];
			},
			isMainNet()
			{
				return this.$store.getters['app/isMainNet'];
			}
		},
		watch: {
			'transaction.advanced': function (newVal)
			{
				if(!newVal)
				{
					this.transaction = this.transactionForm(true);
				}
			}
		},
		async mounted()
		{
			try
			{
				this.utxos = await Utxo.getUtxos(this.wallet.address, this.transactionConfig.api);

				this.tx = TransferTransaction
					.fromUtxos(this.utxos)
					.config(this.transactionConfig)
					.change(this.wallet.address);

				this.errorConnectingToServer = false;
			}
			catch(e)
			{
				console.error(e.message);
				this.errorConnectingToServer = true;
			}
		},
		methods: {
			newRecipient()
			{
				this.transaction.recipients.push('');
			},
			removeRecipient(i)
			{
				this.transaction.recipients.splice(i, 1);
			},
			transactionForm(advancedReset = false)
			{
				const data = {
					recipients: [''],
					remark: null,
					amount: 0.01,
					fee: 0.005,
					autoFee: true,
					advanced: false
				};

				if(advancedReset)
				{
					data.recipients[0] = this.transaction.recipients[0];
					data.remark = this.transaction.remark;
					data.amount = this.transaction.amount;
				}

				return data;
			},
			onReset()
			{
				this.transaction = this.transactionForm();
			},
			onSubmit()
			{
				try
				{
					this.transaction.recipients.forEach((recipient) =>
					{
						this.tx.to(recipient, nulsToNa(this.transaction.amount));
					});

					if(this.transaction.remark)
					{
						this.tx.remark(this.transaction.remark);
					}

					if(!this.transaction.autoFee)
					{
						this.tx.fee(nulsToNa(this.transaction.fee));
					}

					this.broadcast();
				}
				catch(e)
				{
					console.error(e.message);
				}
			},
			async broadcast()
			{
				this.tx.sign(this.$store.getters['wallets/decryptedActiveWalletPrivateKey']);
				this.$store.dispatch('transactions/write/sendTransaction', { transaction: this.transaction, tx: this.tx });
				this.$router.push({ name: 'account.wallet.transactions', params: { wallet: this.wallet.name } });
			}
		}
	};
</script>
