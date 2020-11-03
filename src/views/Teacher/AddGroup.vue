<template>
	<div>
		<h1>Dodaj grupę</h1>
		<GroupForm/>
	</div>
</template>

<script>
import GroupForm from '../../components/Groups/GroupForm';
export default {
	name: 'AddSubject',
	components: { GroupForm },
};
</script>

<style scoped></style>
