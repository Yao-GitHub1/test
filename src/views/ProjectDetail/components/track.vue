<template>
  <div class="track-wrapper">
    <div class="btn-group">
      <el-select
        size="medium"
        v-model="staffGroup">
        <el-option v-for="opt in groupOptions" :label="opt.label" :value="opt.value" :key="opt.value"></el-option>
      </el-select>
      <el-select
        v-model="staffName"
        filterable
        remote
        size="medium"
        placeholder="请输入员工姓名/工号"
        :remote-method="remoteMethod"
        @change="changeHandler">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button @click="startEdit" size="medium">查询</el-button>
    </div>
    <div id="trackMap" style="width: 100%; height: calc(100% - 80px)"></div>
  </div>
</template>
<script>
import AMap from 'AMap'
export default {
  name: 'trackMap',
  data () {
    return {
      staffName: '',
      staffGroup: [],
      linePath: [],
      polyLineEditor: null,
      groupOptions: [
        {
          label: '红树湾班组',
          value: 1,
        }, {
          label: '宝安班组',
          value: 2,
        }
      ],
      options: []
    }
  },
  mounted () {
    this.$nextTick(() => {
      this._getLocation()
    })
  },
  methods: {
    // 获取地图定位
     _getLocation () {
      var amap = new AMap.Map('trackMap', {
        zoom: 14,
        resizeEnable: true
      })
      this.AMap = amap
      amap.plugin('AMap.Geolocation', () => {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
          // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
          buttonOffset: new AMap.Pixel(10, 20),
          //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          zoomToAccuracy: true,
          //  定位按钮的排放位置,  RB表示右下
          buttonPosition: 'RB'
        })
        geolocation.getCurrentPosition()
        AMap.event.addListener(geolocation, 'complete', (data) => {
          let position = data.position
          amap.setCenter([position.R, position.Q])
          var marker = this.creatMark(position.R, position.Q)
          amap.add(marker)
        })
        AMap.event.addListener(geolocation, 'error', (data) => {
          this.$message.error('定位失败，请检查网络，并稍后重试')
        })
      })
    },
    // 创建点标记
    creatMark (R, Q) {
      var marker = new AMap.Marker({
        position: new AMap.LngLat(R, Q),
        // 设置是否可以拖拽
        draggable: true,
        cursor: 'move',
        // 设置拖拽效果
        raiseOnDrag: true
      })
      return marker
    },
    //  远程搜索
    remoteMethod () {},
    changeHandler () {},
    // 折线图绘制
    createLine () {
      var polyline = new AMap.Polyline({
        path: this.linePath,
        borderWeight: 1,
        strokeColor: "#3366FF", 
        strokeOpacity: 1,
        strokeWeight: 6,
        // 折线样式还支持 'dashed'
        strokeStyle: "solid",
        // strokeStyle是dashed时有效
        strokeDasharray: [10, 5],
        lineJoin: 'round',
        lineCap: 'round',
        zIndex: 50,
      })
      polyline.setMap(this.AMap)
      // 缩放地图到合适的视野级别
      map.setFitView([ polyline ])
      this.polyLineEditor = new AMap.PolyEditor(this.AMap, polyline)
    },
    // 关闭折线绘制
    closeLineEditor () {
      this.polyLineEditor.close()
    }
  }
}
</script>
<style lang="less" scoped>
.track-wrapper{
  height: 100%;
  .btn-group{
    padding-bottom: 20px;
    .el-input{
      margin-right: 10px;
      width: 200px;
    }
  }
}
</style>
