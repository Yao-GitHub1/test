<template>
  <div style="width: 400px">
    <iForm :formModel="formModel" :formData="formData" :labelWidth="100"></iForm>
  </div>
</template>
<script>
export default {
  name: 'projectInfo',
  props: {
    formModel: {
      type: Array,
      default: () => []
    },
    formData: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
