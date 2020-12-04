<template>
<div class="projectAdmin">
  <iTable :tableModel="tableModel" :tableData="tableData" border></iTable>
</div>
</template>
<script>
export default {
  name: 'projectAdmin',
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
