<template>
<div class="report">
  <iTable :tableModel="tableModel" :tableData="tableData" border></iTable>
</div>
</template>
<script>
export default {
  name: 'report',
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    tableModel: {
      type: Array,
      default: () => []
    }
  }
}
</script>
