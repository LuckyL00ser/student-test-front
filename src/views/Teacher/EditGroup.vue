<template>
	<div>
		<h1>Edytuj grupę</h1>
		<GroupForm :group-i-d="$route.params.groupID"/>
	</div>
</template>

<script>
	import GroupForm from '../../components/Groups/GroupForm';
	export default {
		name: 'EditGroup',
		components: { GroupForm },
	};
</script>

<style scoped></style>
