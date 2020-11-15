<template>
	<div class="home">
		{{ $store.getters.isLoggedIn ? 'Panel główny' : 'Strona główna' }}
		<Task />
	</div>
</template>

<script>
import Task from '../components/Task';

export default {
	name: 'Home',
	components: {
		Task,
	},
	data() {
		return {
			loading: false,
		};
	},
};
</script>
