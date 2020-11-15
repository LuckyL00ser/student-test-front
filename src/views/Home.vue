<template>
	<div class="home">
		{{ $store.getters.isLoggedIn ? 'Panel główny' : 'Strona główna' }}

	</div>
</template>

<script>

export default {
	name: 'Home',
	data() {
		return {
			loading: false,
		};
	},
};
</script>
