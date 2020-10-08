<template>
  <b-container>
    <b-row>
      <b-col cols="12" md="8" lg="6" class="mx-auto position-relative">
        <div class="center-horizontally shadow-sm p-5">
          <h3>Zaloguj się</h3>
          <ValidationObserver v-slot="{ handleSubmit }" ref="form">
            <b-form @submit.prevent="handleSubmit(login)">
              <ValidationProvider
                rules="email"
                class="flex-grow-1"
                v-slot="vContext"
              >
                <b-form-group label="E-mail">
                  <b-form-input v-model="loginData.email" name="email" />
                  <CustomInvalidFeedback :validationContext="vContext" />
                </b-form-group>
              </ValidationProvider>
              <ValidationProvider rules="required" class="flex-grow-1">
                <b-form-group label="Hasło">
                  <b-form-input
                    v-model="loginData.password"
                    type="password"
                    name="password"
                  />
                </b-form-group>
              </ValidationProvider>
              <div class="w-100 text-center">
                <b-btn
                  squared
                  variant="outline-primary"
                  size="lg"
                  :disabled="loggingIn"
                  class="shadow"
                  type="submit"
                  >Zaloguj</b-btn
                >
              </div>
            </b-form>
          </ValidationObserver>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import CustomInvalidFeedback from "../components/common/CustomInvalidFeedback";
export default {
  name: "Login",
  components: { CustomInvalidFeedback },
  data() {
    return {
      loggingIn: false,
      loginData: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async login() {
      try {
        this.loggingIn = true;
        await this.$store.dispatch("login", this.loginData);
        this.$router.push("/");
        this.toast("info", "Zalogowano");
      } catch (e) {
        console.error(e);
      }
      this.loggingIn = false;
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
