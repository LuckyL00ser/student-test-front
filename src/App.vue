<template>
	<main id="app">
		<Navbar />
		<b-container>
			<router-view />
		</b-container>
		<!--		<footer>-->
		<!--			<b-container>-->
		<!--				<b-row>-->
		<!--					<b-col>-->
		<!--						<h2>Aplikacja StudentTest</h2>-->
		<!--					</b-col>-->
		<!--					<b-col>-->
		<!--						<a href="mailto:xyz@gmail.com">Mail kontaktowy 1 </a>-->
		<!--						<br />-->
		<!--						<a href="mailto:abc@gmail.com">Mail kontaktowy 2</a>-->
		<!--					</b-col>-->
		<!--				</b-row>-->
		<!--			</b-container>-->
		<!--		</footer>-->
	</main>
</template>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
}
#app .container {
	flex-grow: 1;
	padding-top: 30px;
}
footer {
	text-align: center;
	background: lightgray;
	padding: 40px 0;
}
</style>
<script>
import Navbar from './components/Navbar';
export default {
	components: { Navbar },
};
</script>
