<template>
  <div class="create" style="width: 500px">
    <iForm
      ref="iform"
      :formModel="formModel"
      :formData="formData">
    </iForm>
    <el-dialog
      width="1000px"
      :visible="visible"
      @close="$_close"
      title="位置选择">
      <div>
        <el-select
          style="width: 100%"
          v-model="keyWord"
          filterable
          remote
          placeholder="请输入关键词"
          :remote-method="remoteMethod"
          @change="changeHandler">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <br><br>
        <div id="mapContainer"></div>
      </div>
      <br>
      <div align="center">
        <el-button size="medium" @click="$_close">取消</el-button>
        <el-button size="medium" type="primary" @click="setLocation">确定</el-button>
      </div>
     </el-dialog>
      <div align="center">
        <el-button size="medium" type="primary" @click="Submit">提交</el-button>
      </div>
  </div>
</template>
<script type="text/javascript"
src="https://code.jquery.com/jquery-3.3.1.js"
integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60="
crossorigin="anonymous"></script>
<script>
const layOut = {
  xlSpan: 24,
  colSpan: 24,
  mdSpan: 24,
  smSpan: 24,
}
import AMap from 'AMap'

export default {
  name: 'create',
  data () {
    return {
      visible: true,
      formData: {},
      formModel: [
          {
            elemType: 'input',
            prop: 'projectName',
            label: '项目名称',
            rules: ['required'],
            ...layOut
          }, {
            elemType: 'input',
            prop: 'constructionUnit',
            label: '建设单位',
            rules: ['required'],
            ...layOut
          }, {
            elemType: 'input',
            prop: 'address',
            label: '工程地点',
            rules: ['required'],
            ...layOut,
            slot: () => {
              return <i class='el-icon-location-outline' style='font-size: 20px;' onClick={this.positionHandler}></i>
            }
          }, {
            elemType: 'render',
            prop: 'imgList',
            label: '项目照片',
            ...layOut,
            render: () => {
              return <div>
                <ul class="file-wrapper">
                  <li onClick={this.selectFile}><el-icon class="el-icon-plus"></el-icon></li>
                </ul>
                <input type="file" id="upload" accept="image/*" style="display:none" onChange={this.fileChangeHandler}/>
              </div>
            }
          }
        ],
        AMap: null,
        curLocation: {},
        options: [],
        keyWord: '',
        poiList: [],
        picture:'',//图片路径
        longitude:'',//经度
        latitude:''//纬度
    }
  },

  props: {},
  mounted () {
    this.$nextTick(() => {
      this._getLocation()
    })
  },
  methods: {
    // var picture='',//图片路径
    // var longitude='',//经度
    // var latitude='',//纬度
    // 提交
    Submit () {
        // console.log('提交')

        var formdata = this.$refs.iform.getFormData()
        console.log(formdata.projectName)
        var valid = this.$refs.iform.validate()
        if (!valid) return
        // console.log(valid)
        // this.changeHandler('广东省深圳市宝安区西乡街道宝安大道B座')
        // this._getLocation()
        // console.log('图片路径',this.picture)
        // console.log('经度',this.longitude)
        // console.log('纬度',this.latitude)
        if(this.picture=='')
        {
          alert('请选择项目照片')
          return
        }
        if(this.longitude==''||this.latitude=='')
        {
          alert('直接输入地址无法获取定位，请从地图中选取位置')
          return
        }

        let json={
          projectName: formdata.projectName,
          constructionUnit: formdata.constructionUnit,
          address: formdata.address,
          picture: this.picture,
          longitude: this.longitude,
          latitude: this.latitude
        }
        var url = '/api/Admin_Project/AddProject';
        this.$axios.post(url, json, { emulateJSON: true }).then(response => {
        // console.log(response.data);
        console.log(response.data);
        if(response.data.Code==200){
        console.log(response.data.ResultsData);
          // this.tables.tableData = response.data.ResultsData
          // this.$children[0].pager.total = response.data.TotalCount
        }
        else{
          // alert(response.data.Msg)
          console.log(response.data)
        }
        }, response => {
        // error callback
        console.log(response.data);
        })


    },
    // 选择图片
    selectFile () {
      // let form=document.getElementById('imgLocal');
      //  form.submit();
      document.querySelector('#upload').click()
    },
    // 图片上传
    fileChangeHandler (e) {
      let that = this;
      let imgFile = document.getElementById('upload').files[0] //获取文件列表
      let formData = new FormData();
      formData.append('file',imgFile)//只上传一张图片,注意这里的'img'一定要和后端的一致,待会看接口的时候再说
      formData.append('folder','ProjectImage')//
      formData.append('UserID',123132)//
      //上传多张图片
      //具体上传多少张图片由后端接口决定
      // fileList.forEach(item => {
      //     data.append('img',item)
      // })
      var url = '/api/Admin_General/UploadPicture';
      //我用的vuex中的actions方法来调用上传接口,传入formData
      this.$axios.post(url,formData).then(res => {
          let data = res.data;
          console.log(data)
          console.log('https://www.mingongtong.com:8089'+data.ResultsData)
          // that.imgList.push('https://www.mingongtong.com:8089'+data.ResultsData)//将返回的图片url添加到上传图片列表
          this.picture='https://www.mingongtong.com:8089'+data.ResultsData//图片路径

      }).catch(err => {
          console.log(err)
      })
    },
    //  打开地图弹框，并初始化地图
    positionHandler () {
      this.visible = true
      this.$nextTick(() => {
        this._getLocation()
      })
    },
    // 获取地图定位
     _getLocation () {
      var amap = new AMap.Map('mapContainer', {
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
          // console.log('111中心点',position)
          this.longitude=position.R//经度
          this.latitude=position.Q//纬度
          this.curLocation = data
          this.keyWord = this.curLocation.formattedAddress
          amap.setCenter([position.R, position.Q])
          var marker = this.creatMark(position.R, position.Q)
          // this.setCurPos(data)// 将当前定位信息保存到vuex中
          amap.add(marker)
          // 地图覆盖物的拖拽回调
          marker.on('dragend', (data) => {
            amap.setCenter([data.lnglat.R, data.lnglat.Q])
            getAddres([data.lnglat.R, data.lnglat.Q])
            this.center=data.lnglat.R//经度
            this.center=data.lnglat.Q//纬度
          })
          // 拖动地图的时候的回调
          amap.on('dragend', (data) => {
            // 获取地图中心点位置
            let center = amap.getCenter()
            this.center=position.R//经度
            this.center=position.Q//纬度
            let positions = [center.R, center.Q]
            setTimeout(() => {
              marker.setPosition(positions)
              getAddres(positions)
            }, 100)
          })
        })
        AMap.event.addListener(geolocation, 'error', (data) => {
          this.$message.error('定位失败，请检查网络，并稍后重试')
        })
        // 地址逆解析
        var getAddres = (lnglat) => {
          var lnglat=lnglat;
          var geocoder = new AMap.Geocoder()
          geocoder.getAddress(lnglat, (status, result) => {
            if (status === 'complete' && result.regeocode) {
              var address = result.regeocode.formattedAddress
              this.curLocation = result.regeocode
              this.keyWord = this.curLocation.formattedAddress
            }
          })
        }
      })
    },
    // 关闭地图
    $_close () {
      this.visible = false
    },
    // 设置选择的地图位置
    setLocation () {
      if (this.curLocation.formattedAddress) {}
      this.$_close()
      this.$refs.iform.setFormData({
        address: this.curLocation.formattedAddress
      })
      // console.log('经度--',this.AMap.indoorMap.AB.lng)
      // console.log('经度--',this.curLocation)
      // console.log('纬度--',this.curLocation.position.Q)
      this.longitude=this.AMap.indoorMap.AB.lng//经度
      this.latitude=this.AMap.indoorMap.AB.lat//纬度
    },
    // IPO搜索
    remoteMethod (kw) {
      if (!kw) return
      AMap.service(['AMap.PlaceSearch'], () => {
        var placeSearch = new AMap.PlaceSearch({
          pageSize: 10, // 单页显示结果条数
          pageIndex: 1, // 页码
          autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        })
        placeSearch.search(kw, (status, result) => {
          if (status === 'complete' && result.info === 'OK') {
            this.poiList =  result.poiList.pois || []
            this.poiList.forEach(e => {
              var formattedAddress =  `${e.pname || ''}${e.cityname || ''}${e.adname || ''}${e.name}(${e.address || ''})`
              var item = {
                label: formattedAddress,
                value: e.id
              }
              e.formattedAddress = formattedAddress
              this.options.push(item)
            })
          } else {
            this.$message.error('网络繁忙，请稍后重试')
          }
        })
      })
    },
    // 选择地点
    changeHandler (val) {
      this.curLocation = this.poiList.filter(e => {
        return e.id === val
      })[0]
      var {location: {Q, R}} = this.curLocation
      this.AMap.setCenter([R, Q])
      this.AMap.add(this.creatMark(R, Q))
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
    }
  }
}
</script>
<style lang="less" scoped>
#mapContainer{
  width: 100%;
  height: 500px;
}
</style>
