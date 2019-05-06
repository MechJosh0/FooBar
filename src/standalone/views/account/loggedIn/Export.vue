<template>
	<div v-if="!processingExport && !downloadReady">
		<h4>{{ $t('views.export.title') }}</h4>
		<p>{{ $t('views.export.information') }}</p>
		<div v-if="pages">
			<p>
				{{ $t('views.export.accountInformation', {
					totalTransactions: info.totalTransactionsFormatted,
					expectedTime: info.expectedTimeFormatted
				}) }}
			</p>
			<q-btn
				color="primary"
				icon="fas fa-cogs"
				:label="$t('views.export.beginDownload')"
				@click="startExport"
			/>
		</div>
		<q-spinner
			v-else
			color="primary"
		/>
	</div>
	<div v-else-if="downloadReady">
		<h4>{{ $t('views.export.download.title') }}</h4>
		<p>{{ $t('views.export.download.information') }}</p>
		<q-btn
			color="primary"
			icon="fas fa-cloud-download-alt"
			:label="$t('views.export.download.button')"
			@click="download"
		/>
	</div>
	<div v-else>
		<portal to="appOverlay">
			<q-inner-loading :showing="true" class="loadingPortal">
				<div>
					<q-spinner-gears size="150px" color="primary" />
					<h4 class="text-center">
						{{ $t('views.export.exportingProgress', { num: downloadPercentage }) }}
					</h4>
					<q-tooltip contentClass="tooltipPortal">
						{{ $t('views.export.exportingProgressTooltip', {
							pageX: pages.active.toLocaleString(),
							pageY: pages.total.toLocaleString()
						}) }}
					</q-tooltip>
				</div>
			</q-inner-loading>
		</portal>
	</div>
</template>

<script>
	import Duration from 'luxon/src/duration';
	import { date } from 'quasar';
	import createCSVFile from '@/utils/createCSVFile';
	import { sleep } from '@/utils/helpers';

	export default {
		data()
		{
			return {
				downloadPercentage: 0,
				downloadReady: false,
				processingExport: false,
				callSleeper: 10, // milliseconds
				pages: null
			};
		},
		computed: {
			account()
			{
				return this.$store.getters['account/getActiveAccount'];
			}
		},
		mounted()
		{
			this.getInitData();
		},
		methods: {
			async startExport()
			{
				this.downloadPercentage = 0;
				this.processingExport = true;

				const transactions = [];
				const header = [
					this.$t('views.export.headers.blockHeight'),
					this.$t('views.export.headers.datetime'),
					this.$t('views.export.headers.hash'),
					this.$t('views.export.headers.address'),
					this.$t('views.export.headers.amountReceived'),
					this.$t('views.export.headers.amountSent'),
					this.$t('views.export.headers.remark')
				];

				for(this.pages.active = 1; this.pages.active <= this.pages.total; this.pages.active += 1)
				{
					const res = await this.getFullTransactions(this.pages.active); // eslint-disable-line no-await-in-loop

					res.transactions.forEach((transaction) =>
					{
						if(transaction.type !== 1 && transaction.type !== 2) return; // If not reward or transfer types we skip it

						transactions.push([
							transaction.blockHeight,
							`="${date.formatDate(transaction.time, 'DD MMM YYYY HH:mm:SS')}"`,
							transaction.hash,
							transaction.display_type === 'OUT' ? transaction.target || transaction.source : transaction.source,
							this.calcFee('IN', transaction),
							this.calcFee('OUT', transaction),
							transaction.remark
						]);
					});

					this.downloadPercentage = Math.floor((this.pages.active / this.pages.total) * 100);

					await sleep(this.callSleeper); // eslint-disable-line no-await-in-loop
				}

				this.fileData = [header, ...transactions];
				this.downloadReady = true;
				this.processingExport = false;
				this.download();
			},
			calcFee(type, transaction)
			{
				if(type === 'OUT' && transaction.display_type !== 'OUT')
				{
					return 0;
				}

				if(type === 'IN' && (transaction.display_type !== 'IN' && transaction.display_type !== 'Reward'))
				{
					return 0;
				}

				const num = (Math.abs(transaction.value) + transaction.fee) / 100000000;

				if(transaction.display_type === 'OUT')
				{
					return num.toString().substring(1);
				}

				return num;
			},
			endExport()
			{
				this.$q.loading.hide();
			},
			download()
			{
				createCSVFile(`${this.account.address}.csv`, this.fileData);
			},
			async getInitData()
			{
				const res = await this.getFullTransactions(1);

				this.pages = {
					active: 0,
					total: Math.ceil(res.pagination_total / res.pagination_per_page),
					perPage: res.pagination_per_page
				};

				this.info = {};
				this.info.totalTransactions = res.pagination_total;
				this.info.totalTransactionsFormatted = this.makeNumberPretty(this.info.totalTransactions);
				this.info.expectedTime = this.pages.total * this.callSleeper;

				const duration = Duration.fromMillis(this.info.expectedTime).shiftTo('hours', 'minutes', 'seconds').toObject();
				let hours,
					minutes;

				if(duration.hours !== 0)
				{
					hours = this.$tc('dates.duration.hours', duration.hours, { hours: duration.hours + 1 });
				}

				if(duration.minutes !== 0)
				{
					minutes = this.$tc('dates.duration.minutes', duration.minutes, { minutes: duration.minutes + 1 });
				}

				if(hours && minutes)
				{
					this.info.expectedTimeFormatted = this.$t('dates.duration.timeAndTime', { xTime: hours, yTime: minutes });
				}
				else if(minutes)
				{
					this.info.expectedTimeFormatted = minutes;
				}
				else
				{
					this.info.expectedTimeFormatted = this.$t('dates.duration.lessThanAMinute');
				}
			},
			async getFullTransactions(page)
			{
				const res = await this.$store.dispatch('transactions/read/getAddressFullTransactions', { address: this.account.address, page });

				return res;
			},
			makeNumberPretty(num)
			{
				let prepend = num.toString().substring(0, 2),
					append;

				prepend = `${prepend.slice(0, 1)}.${prepend.slice(1)}`;

				if(num > 1000000000) // X billion
				{
					append = 'billion';
				}
				else if(num > 1000000) // X million
				{
					append = 'million';
				}
				else if(num > 1000) // X thousand
				{
					append = 'thousand';
				}

				if(append)
				{
					return `${prepend}${this.$t(`views.export.numberFormat.${append}`)}`;
				}

				return num;
			}
		}
	};
</script>

<style>
	.loadingPortal {
		z-index: 9999;
		background: rgba(0, 0, 0, 0.5);
	}

	.tooltipPortal {
		z-index: 10000;
		background: purple;
		font-size: 12px;
	}
</style>
