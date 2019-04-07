<template>
	<div class="q-pa-md">
		<q-select
			v-model="server"
			filled
			:options="serverOptions"
			:label="$t(`views.settings.form.serverOptions.label`)"
		>
			<template v-slot:option="scope">
				<q-item
					v-bind="scope.itemProps"
					v-on="scope.itemEvents"
				>
					<q-item-section>
						<q-item-label>
							{{ $t(`views.settings.form.serverOptions.options.${scope.opt.value}.label`) }}
						</q-item-label>
						<q-item-label caption>
							{{ $t(`views.settings.form.serverOptions.options.${scope.opt.value}.url`) }}
						</q-item-label>
					</q-item-section>
				</q-item>
			</template>
		</q-select>

		<br>

		<q-field
			:label="$t(`views.settings.form.releaseOptions.label`)"
			stackLabel
			filled
		>
			<q-list link>
				<q-item
					v-for="option in releaseOptions"
					:key="option"
					v-ripple
					tag="label"
				>
					<q-item-section avatar top>
						<q-radio
							v-model="release"
							:val="option"
						/>
					</q-item-section>
					<q-item-section>
						<q-item-label>
							{{ $t(`views.settings.form.releaseOptions.options.${option}.label`) }}
						</q-item-label>
						<q-item-label caption>
							{{ $t(`views.settings.form.releaseOptions.options.${option}.caption`) }}
						</q-item-label>
					</q-item-section>
				</q-item>
			</q-list>
		</q-field>
	</div>
</template>

<script>
	export default {
		data()
		{
			const serverOptions = [
				{
					value: 'nulsWorld',
					url: 'https://nuls.world/',
					label: this.$t('views.settings.form.serverOptions.options.nulsWorld.label')
				}
			];

			return {
				server: serverOptions.find((server) => server.value === this.$store.getters['app/getServerData'].name),
				releaseOptions: ['mainNet', 'testNet'],
				serverOptions,
				release: this.$store.getters['app/getRelease']
			};
		},
		watch: {
			release(newVal)
			{
				this.$store.dispatch('app/setRelease', newVal);
			},
			server(newVal)
			{
				this.$store.dispatch('app/setServer', {
					name: newVal.value,
					url: newVal.url
				});
			}
		}
	};
</script>
