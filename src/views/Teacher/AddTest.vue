<template>
	<div>
		<h1>Stwórz nowy test</h1>
		<TestForm/>
	</div>
</template>

<script>
import TestForm from '../../components/Tests/TestForm';
export default {
	name: 'AddTest',
	components: { TestForm },
};
</script>

<style scoped></style>
