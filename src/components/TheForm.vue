<template>
  <section class="form">
    <h1>Registration form 🤩</h1>
    <form @submit.prevent="onSubmit">
      <BaseTextInput
        v-model="username"
        placeholder="Username"
        :error="errors.username"
      />

      <BaseTextInput
        v-model="email"
        placeholder="Your email"
        :error="errors.email"
      />
      <BaseInputError :error="errors.gender">
        <div class="form__checkboxes">
          <h3>Your gender:</h3>
          <BaseRadio value="male" v-model="gender" placeholder="Male" />

          <BaseRadio value="female" v-model="gender" placeholder="Female" />

          <BaseRadio
            value="prefer-not-to"
            v-model="gender"
            placeholder="Prefer not to say"
          />
        </div>
      </BaseInputError>

      <BaseTextInput
        v-model="password"
        placeholder="Your password"
        :error="errors.password"
        type="password"
      />
      <BaseInputError :error="confirmPasswordError">
        <BaseTextInput
          v-model="confirm"
          placeholder="Confirm password"
          :error="errors.confirm"
          type="password"
      /></BaseInputError>

      <BaseInputError :error="errors.gender">
        <BaseCheckbox
          v-model="accept"
          placeholder="Do you accept our terms and rules?"
        />
      </BaseInputError>

      <BaseButton class="outline"> Checked </BaseButton>
    </form>
  </section>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

import BaseCheckbox from "./shared/inputs/BaseCheckbox.vue";
import BaseTextInput from "./shared/inputs/BaseTextInput.vue";

import BaseRadio from "./shared/inputs/BaseRadio.vue";

import BaseButton from "./shared/BaseButton.vue";

import BaseInputError from "./shared/inputs/BaseInputError.vue";
import { useField, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

const passwordSchema = z
  .string()
  .nonempty("Please enter a password")
  .min(8, "Password should have at least 8 characters")
  .regex(
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/,
    "Password should contain at least 1 number, letter and special character"
  );

const validationSchema = toTypedSchema(
  z.object({
    email: z
      .string()
      .nonempty("Email cannot be empty")
      .email("Please enter a correct email"),
    username: z
      .string()
      .nonempty("User name cannot be empty")
      .min(6, "Username should contain at least 6 characters")
      .max(100, "Username cannot contain more than 100 characters"),
    accept: z.boolean(),
    gender: z.string().nonempty("Please select gender"),
    password: passwordSchema,

    confirm: passwordSchema,
  })
);

const { handleSubmit, errors } = useForm({ validationSchema });

const { value: email } = useField("email");
const { value: username } = useField("username");
const { value: accept } = useField("accept");
const { value: gender } = useField("gender");
const { value: password } = useField("password");
const { value: confirm } = useField("confirm");

const confirmPasswordError = ref<null | string>(null);

watch([confirm, password], () => {
  if (confirm.value !== password.value && confirm.value)
    confirmPasswordError.value = "Passwords dont match";
  else confirmPasswordError.value = null;
});

const onSubmit = handleSubmit((values) => {
  if (confirmPasswordError.value) return;

  alert(JSON.stringify(values));
});
</script>

<style scoped lang="scss">
.form {
  max-width: 100rem;
  margin: 0 auto;
  width: 100%;

  margin-top: 3rem;

  display: flex;
  flex-direction: column;
  gap: 2rem;

  h1 {
    font-size: 3rem;
    font-weight: bold;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2.4rem;

    width: 70rem;
    max-width: 90vw;

    padding: 2rem;
    border: 1px solid lightgray;
    border-radius: 2rem;
  }

  &__checkboxes {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    h3 {
      font-size: 1.6rem;
      font-weight: normal;
    }
  }
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  font-size: 1.6rem;
}
</style>
