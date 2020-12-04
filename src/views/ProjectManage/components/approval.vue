<template>
  <div class="approval">
    <iTable
      border
      :tableModel="tableModel"
      :tableData="tableData">
    </iTable>
  </div>
</template>
<script>
export default {
  name: 'approval',
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
