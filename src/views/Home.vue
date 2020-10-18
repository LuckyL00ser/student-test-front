<template>
	<div class="home">
		dashboard
		<MultipleChoiceQuestion />
	</div>
</template>

<script>
import MultipleChoiceQuestion from '../components/MultipleChoiceQuestion';

export default {
	name: 'Home',
	components: {
		MultipleChoiceQuestion,
	},
	data() {
		return {
			loading: false,
		};
	},
};
</script>
