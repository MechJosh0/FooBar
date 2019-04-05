<template>
	<div>
		<v-navigation-drawer
			v-model="drawer"
			fixed
			:clipped="$vuetify.breakpoint.mdAndUp"
			app
		>
			<v-list dense>
				<template v-for="item in items">
					<v-layout
						v-if="item.heading"
						:key="item.heading"
						row
						alignCenter
					>
						<v-flex xs6>
							<v-subheader v-if="item.heading">
								{{ item.heading }}
							</v-subheader>
						</v-flex>
						<v-flex xs6 class="text-xs-center">
							<a href="#!" class="body-2 black--text">EDIT</a>
						</v-flex>
					</v-layout>
					<v-list-group
						v-else-if="item.children"
						:key="item.text"
						v-model="item.model"
						:prependIcon="item.model ? item.icon : item['icon-alt']"
						appendIcon=""
					>
						<v-list-tile slot="activator">
							<v-list-tile-content>
								<v-list-tile-title>
									{{ item.text }}
								</v-list-tile-title>
							</v-list-tile-content>
						</v-list-tile>
						<v-list-tile
							v-for="(child, i) in item.children"
							:key="i"
							@click="foo()"
						>
							<v-list-tile-action v-if="child.icon">
								<v-icon>{{ child.icon }}</v-icon>
							</v-list-tile-action>
							<v-list-tile-content>
								<v-list-tile-title>
									{{ child.text }}
								</v-list-tile-title>
							</v-list-tile-content>
						</v-list-tile>
					</v-list-group>
					<v-list-tile
						v-else
						:key="item.text"
						@click="foo()"
					>
						<v-list-tile-action>
							<v-icon>{{ item.icon }}</v-icon>
						</v-list-tile-action>
						<v-list-tile-content>
							<v-list-tile-title>
								{{ item.text }}
							</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
				</template>
			</v-list>
		</v-navigation-drawer>
		<v-toolbar
			color="blue darken-3"
			dark
			app
			:clippedLeft="$vuetify.breakpoint.mdAndUp"
			fixed
		>
			<v-toolbar-title style="width: 300px" class="ml-0 pl-3">
				<v-toolbar-side-icon @click.stop="drawer = !drawer" />
				<span class="hidden-sm-and-down">Google Contacts</span>
			</v-toolbar-title>
			<v-text-field
				flat
				soloInverted
				prependIcon="search"
				label="Search"
				class="hidden-sm-and-down"
			/>
			<v-spacer />
			<v-btn icon>
				<v-icon>apps</v-icon>
			</v-btn>
			<v-btn icon>
				<v-icon>notifications</v-icon>
			</v-btn>
			<v-btn icon large>
				<v-avatar size="32px" tile>
					<img
						src="https://vuetifyjs.com/static/doc-images/logo.svg"
						alt="Vuetify"
					>
				</v-avatar>
			</v-btn>
		</v-toolbar>
		<v-content>
			<v-container fluid fillHeight>
				<v-layout justifyCenter alignCenter>
					<router-view />
				</v-layout>
			</v-container>
		</v-content>
		<v-btn
			fab
			bottom
			right
			color="pink"
			dark
			fixed
			@click.stop="dialog = !dialog"
		>
			<v-icon>add</v-icon>
		</v-btn>
		<v-dialog v-model="dialog" width="800px">
			<v-card>
				<v-card-title
					class="grey lighten-4 py-4 title"
				>
					Create contact
				</v-card-title>
				<v-container gridListSm class="pa-4">
					<v-layout row wrap>
						<v-flex
							xs12
							alignCenter
							justifySpaceBetween
						>
							<v-layout alignCenter>
								<v-avatar size="40px" class="mr-3">
									<img
										src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
										alt=""
									>
								</v-avatar>
								<v-text-field
									placeholder="Name"
								/>
							</v-layout>
						</v-flex>
						<v-flex xs6>
							<v-text-field
								prependIcon="business"
								placeholder="Company"
							/>
						</v-flex>
						<v-flex xs6>
							<v-text-field
								placeholder="Job title"
							/>
						</v-flex>
						<v-flex xs12>
							<v-text-field
								prependIcon="mail"
								placeholder="Email"
							/>
						</v-flex>
						<v-flex xs12>
							<v-text-field
								type="tel"
								prependIcon="phone"
								placeholder="(000) 000 - 0000"
								mask="phone"
							/>
						</v-flex>
						<v-flex xs12>
							<v-text-field
								prependIcon="notes"
								placeholder="Notes"
							/>
						</v-flex>
					</v-layout>
				</v-container>
				<v-card-actions>
					<v-btn flat color="primary">
						More
					</v-btn>
					<v-spacer />
					<v-btn
						flat
						color="primary"
						@click="dialog = false"
					>
						Cancel
					</v-btn>
					<v-btn flat @click="dialog = false">
						Save
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
	export default {
		data()
		{
			return {
				dialog: false,
				drawer: null,
				items: [
					{ icon: 'contacts', text: 'Contacts' },
					{ icon: 'history', text: 'Frequently contacted' },
					{ icon: 'content_copy', text: 'Duplicates' },
					{
						icon: 'keyboard_arrow_up',
						'icon-alt': 'keyboard_arrow_down',
						text: 'Labels',
						model: true,
						children: [
							{ icon: 'add', text: 'Create label' }
						]
					},
					{
						icon: 'keyboard_arrow_up',
						'icon-alt': 'keyboard_arrow_down',
						text: 'More',
						model: false,
						children: [
							{ text: 'Import' },
							{ text: 'Export' },
							{ text: 'Print' },
							{ text: 'Undo changes' },
							{ text: 'Other contacts' }
						]
					},
					{ icon: 'settings', text: 'Settings' },
					{ icon: 'chat_bubble', text: 'Send feedback' },
					{ icon: 'help', text: 'Help' },
					{ icon: 'phonelink', text: 'App downloads' },
					{ icon: 'keyboard', text: 'Go to the old version' }
				]
			};
		},
		methods: {
			foo()
			{
				console.log('Click function');
			}
		}
	};
</script>
