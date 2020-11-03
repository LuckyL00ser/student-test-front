<template>
	<div class="home">
		{{$store.getters.isLoggedIn? 'Panel główny':'Strona główna'}}
<!--		<MultipleChoiceQuestion />-->
	</div>
</template>

<script>
// import MultipleChoiceQuestion from '../components/MultipleChoiceQuestion';

export default {
	name: 'Home',
	// components: {
	// 	MultipleChoiceQuestion,
	// },
	data() {
		return {
			loading: false,
		};
	},
};
</script>
