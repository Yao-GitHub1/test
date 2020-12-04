<template>
  <div class="passed">
    <iTable
      border
      :tableModel="tableModel"
      :tableData="tableData">
    </iTable>
  </div>
</template>
<script>
export default {
  name: 'passed',
  props: {
    tableModel: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: () => []
    }
  }
}
</script>
