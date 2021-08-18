<template lang="pug">
form(@submit.prevent="onFormSubmit")
  .form-group
    label.form-label(for="email") {{t('label.email')}}
    .input-group
      input.form-input(type="text" v-model="payload.email" placeholder="user@tenant.com")
  .form-group
    label.form-label(for="passwd") {{t('label.passwd')}}
    .input-group
      input.form-input(type="password" v-model="payload.passwd" placeholder="********")
  .form-group
    button.btn(type="submit") Submit
</template>

<script lang="ts" setup>
import type { DtoSignIn } from 'types/dto/auth'
import { useI18n } from 'vue-i18n'
import { useAuth } from '~/services'

const { t } = useI18n()
const { SignIn } = useAuth()

const payload = ref<DtoSignIn>({
  email: 'dmarx@marxulm.de',
  passwd: '',
})

const onFormSubmit = async () => await SignIn(payload)
</script>
