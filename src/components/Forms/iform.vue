<template>
  <div class="_iform">
    <div class="formHeader">
      <slot name='header'></slot>
    </div>
    <el-form :model='iformData' :validate-on-rule-change='false' :rules="!disabled ? iRules : {}" :ref="formName" :label-width="labelWidth + 'px' "  :inline='inline' :disabled='disabled'>
      <el-row >
        <el-col v-for='(item, index) in iformModel' :key='index'
          :xl="!item.colSpan?colSpan:item.xlSpan" :lg='!item.colSpan?colSpan:item.colSpan' :md='!item.mdSpan?4:item.mdSpan' :sm='!item.smSpan?4:item.smSpan'>
          <el-form-item :prop="item.prop" :label="item.label" v-if='item.visible(iformData, iformModel, index)' :class='item.classes(iformData, iformModel, index)' :label-width='!item.labelWidth ? labelWidth + "px" : item.labelWidth'>
            <el-input
              size='small'
              class="cusInput"
              v-if=" item.elemType == 'input' "
              :type="item.type"
              v-model="iformData[item.prop]"
              :maxlength = 'item.maxlength'
              :readonly='item.readonly'
              :disabled='item.disabled'
              @click="item.onClick"
              :clearable='item.clearable === false ? false : true'
              :placeholder="item.placeholder?item.placeholder:''"
              @change='item.onChange($event, iformModel, iformData, index)'
              :style="{width:item.width+'!important'}">
              <template slot="append" v-if="item.slot != undefined ">
                <div class="el-input-group__append_render">
                  <span v-if="Object.prototype.toString.call(item.slot) === '[object String]'">{{item.slot}}</span>
                  <Render v-else :render="item.slot" ></Render>
                </div>
              </template>
            </el-input>
            <el-input
              size='small'
              :clearable='disabled || item.clearable === false ? false : true'
              type="textarea"
              v-else-if=" item.elemType == 'textarea' "
              v-model="iformData[item.prop]"
              :maxlength = 'item.maxlength'
              :readonly='item.readonly'
              resize='both'
              :autosize="item.autosize"
              :disabled='item.disabled'
              :placeholder="item.placeholder?item.placeholder:''"
              @change='item.onChange($event, iformModel, iformData, index)'
              :style="{width:item.width+'!important'}">
            </el-input>
            <el-select
              size='small'
              :clearable='disabled || item.clearable === false ? false : true'
              v-else-if=" item.elemType == 'select' "
              v-model="iformData[item.prop]"
              :filterable='item.filterable'
              :multiple='item.multiple'
              :disabled='item.disabled'
              :placeholder="item.placeholder?item.placeholder:''"
              @change='item.onChange($event, iformModel, iformData, index)'
              @focus='item.onFocus($event, iformModel, iformData, index)'
              :style="{width:item.width+'!important'}">
              <el-option
                v-for=" (option, index) in item.options "
                :key="index"
                :disabled="option.disabled"
                :label="option[item.col]"
                :value="option[item.colVal]">
              </el-option>
            </el-select>
            <el-date-picker
              size='mini'
              :editable='item.dateEditable'
              :clearable='disabled || item.clearable === false ? false : true'
              :disabled= 'item.disabled'
              v-else-if=" item.elemType == 'date' "
              v-model="iformData[item.prop]"
              :type="item.type"
              @change='item.onChange($event, iformModel, iformData, index)'
              :placeholder="item.placeholder?item.placeholder:item.label"
              :readonly="item.readonly"
              :style="{width:item.width+'!important'}">
            </el-date-picker>
            <el-checkbox-group
              v-else-if=" item.elemType == 'checkbox' "
              v-model="iformData[item.prop]"
              size='small'
              :placeholder="item.placeholder?item.placeholder:''"
              @change='item.onChange($event, iformModel, iformData, index)'
              :style="{width:item.width+'important'}">
              <el-checkbox
                v-for='(option, oindex) in item.options'
                :label="option[item.colVal]" :key='oindex'>
                {{option[item.col]}}
              </el-checkbox>
            </el-checkbox-group>
            <el-checkbox-group
              size='small'
              v-else-if=" item.elemType == 'checkbox_label' "
              v-model="iformData[item.prop]"
              :placeholder="item.placeholder?item.placeholder:''"
              @change='item.onChange($event, iformModel, iformData, index)'
              :style="{width:item.width+'important'}">
              <el-checkbox
                v-for='(option, oindex) in item.options'
                :label="option[item.colVal]+'_' +option[item.col]" :key='oindex'>
                {{option[item.col]}}
              </el-checkbox>
            </el-checkbox-group>
            <el-radio-group
              size='small'
              v-else-if=" item.elemType == 'radio' "
              v-model="iformData[item.prop]"
              @change='item.onChange($event, iformModel, iformData, index)'
              :style="{width:item.width+'important'}">
              <el-radio
                v-for='(option, rindex) in item.options'
                v-if='!item.type'
                :label="option[item.colVal]" :key='rindex'>
                {{option[item.col]}}
              </el-radio>
              <el-radio-button
                v-else
                :label="option[item.colVal]" :key='rindex'>
                {{option[item.col]}}
              </el-radio-button>
            </el-radio-group>
            <el-time-picker
              size='small'
              v-else-if=" item.elemType == 'time' "
              v-model="iformData[item.prop]"
              :clearable='disabled || item.clearable === false ? false : true'
              v-validate='!item.directive?"void":{model: iformData, prop:item.prop, rule: item.directive}'
              :picker-options="{
                selectableRange: item.timeRange
              }"
              :placeholder="item.placeholder?item.placeholder:''">
            </el-time-picker>
            <el-date-picker
              size='small'
              :editable='item.dateEditable'
              :clearable='disabled || item.clearable === false ? false : true'
              v-else-if=' item.elemType == "daterange"'
              v-model="iformData[item.prop]"
              @change='item.onChange($event, iformModel, iformData, index)'
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="item.options"
              :style="{width:item.width+'!important'}">
            </el-date-picker>
            <div v-else-if='item.elemType === "layout"'></div>
            <el-switch
              size='small'
              v-else-if='item.elemType === "switch"'
              v-model="iformData[item.prop]"
              :active-text="item.activeText"
              @change='item.onChange($event, iformModel, iformData, index)'
              :inactive-text="item.inactiveText">
            </el-switch>
            <div v-else-if='item.elemType === "field"'>
              <div @click="item.onClick">
                <el-input :placeholder='item.placeholder' readonly v-model="iformData[item.prop]"/>
              </div>
            </div>
            <div v-else-if='item.elemType === "render"'>
              <Render :render="item.render" :formData="iformData" :formModel="iformModel"></Render>
            </div>
          </el-form-item>
        </el-col>
        <div style="float: left;">
          <el-form-item label-width='20px' v-if="$slots['iform-btns']">
            <slot name="iform-btns"></slot>
          </el-form-item>
        </div>
        <div style="clear:both"></div>
      </el-row>
    </el-form>
  </div>
</template>

<script>

import * as validators from './validator'
import Render from './render'

export default {
  name: 'Iform',
  data () {
    return {
      iformModel: [],
      iformData: this.formData,
      iRules: {}
    }
  },
  components: {
    Render
  },
  props: {
    // 表单模型数据
    formModel: {
      type: Array,
      default () {
        return []
      }
    },
    // 表单初始化数据
    formData: {
      type: Object,
      default () {
        return {}
      }
    },
    // 是否为行内表单
    inline: {
      type: [Boolean, String],
      default () {
        return false
      }
    },
    // 表单的布局
    colSpan: {
      type: Number,
      default () {
        return 4
      }
    },
    // 表单初始校验数据
    rules: {
      type: Object,
      default () {
        return {}
      }
    },
    // 表单名
    formName: {
      type: String,
      default () {
        return 'iform'
      }
    },
    // 表单的label宽度
    labelWidth: {
      type: Number,
      default () {
        return 60
      }
    },
    // 表单是否禁用
    disabled: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  watch: {
    formData: {
      handler (val) {
        this.iformData = clearObj(this.formData)
      },
      deep: true
    },
    iformData: {
      handler (val) {
        /*
         * 发送表单数据到业务组件中
         */
        this.$emit('$update', this.iformData)
      },
      deep: true
    },
    /*
     * 监听表单模型的变化，重新生成校验规则
     */
    iformModel: {
      handler (val) {
        // 根据表单模型数据的变化
        this._initRules()
      },
      deep: true
    },
    /* validateting: {
      handler (val) {
        !val && this.clearValidate()
      },
      deep: true
    } */
  },
  created () {
    this.iformModel = this.formModel.slice(0)
    this.disabled && this.iformModel.forEach(item => {
      if (item.clearable) {
        item.clearable = false
      }
    })
    this._initRules()
    this._initForm(this.iformModel)
  },
  methods: {
    /*
     * 初始化验证规则
     */
    _initRules () {
      /*
       * 判断是否存在表单验证规则
       */
      if (Object.keys(this.rules).length === 0) {
        this.iRules = initRules(this.iformModel)
      } else {
        this.iRules = this.rules
      }
    },
    /*
     * 初始化表单数据
     */
    _initForm (list) {
      let formData = {}
      list.map(item => {
        if (item.group) {
          this.initForm(item.childs, formData)
        } else {
          /*
           * 初始化表单数据
           */
          if (!this.iformData[item.prop]) {
            formData[item.prop] = item.defaultValue !== undefined ? item.defaultValue : ''
          } else {
            formData[item.prop] = this.iformData[item.prop]
          }
          /**
          * 初始化 select options
          */
          if (item.options && item.options instanceof Function) {
            item.options = item.options()
          }
          /*
           * 给每个表单控件添加change时间
           */
          if (!item.onChange) {
            item.onChange = ($event, formModel, formData, index) => {}
          }
          /**
           * 添加click时间
           */
          if (!item.onClick) {
            item.onClick = ($event, formModel, formData, index) => {}
          }
          /*
           * 给每个表单控件添加显示隐藏函数
           */
          if (item.visible === undefined) {
            item.visible = (formData, formModel, index) => { return true }
          }
          if (item.classes === undefined) {
            item.classes = (formData, formModel, index) => { return '' }
          }
          /*
           * 给每个表单控件添加focus函数
           */
          if (!item.onFocus) {
            item.onFocus = () => {}
          }
        }
      })
      /*
       * 将初始化的formData和props => formData合并
       */
      this.iformData = clearObj(Object.assign({}, formData, this.formData))
      /*
       * 设置表单渲染的模型
       */
      this.$set(this, 'iformModel', list)
      /*
       * 执行表单数据里的初始化change事件
       */
      this.iformModel.map((item, index) => {
        if (item.onChange) {
          if (this.iformData[item.prop]) {
            item.onChange(this.iformData[item.prop], this.iformModel, this.iformData, index)
          }
        }
      })
    },
    /*
     * 重置表单
     */
    resetForm () {
      this.$refs[this.formName].resetFields()
      if (this.$refs[this.formName + 'searchTree']) {
        this.$refs[this.formName + 'searchTree'][0].resetTree()
      }
    },
    /*
     * 手动获取当前表单的数据
     */
    getFormData () {
      return this.iformData
    },
    /*
     * 手动设置当前表单的数据
     */
    setFormData (obj) {
      this.iformData = {...this.iformData, ...obj}
    },
    /*
     * 表单验证
     */
    validate () {
      let status = false
      this.$refs[this.formName].validate((valid) => {
        status = valid
      })
      return status
    },
    /*
     * 清除校验的信息
     */
    clearValidate () {
      this.$refs[this.formName].clearValidate()
    }
  }
}
/**
 * 深度克隆
 */
function clearObj (obj) {
  return JSON.parse(JSON.stringify(obj))
}
/**
 * 根据formModel初始化表单数据
 */
const initRules = (formModel) => {
    let rules = {}
    function makeValidator (item) {
      if (item.rules !== undefined && item.visible !== false) {
        rules[item.prop] = []
        item.rules && item.rules.map(rule => {
            if (typeof rule === 'function') {
            rules[item.prop].push({validator: rule})
            } else {
            if (rule === 'required') {
                rules[item.prop].push({required: true, message: '此项为必填项'})
            } else {
                rules[item.prop].push({validator: validators[rule + 'Check']})
            }
            }
        })
      }
    }
    if (!formModel.map) {
      throw new Error('请传入数组')
    } else {
      formModel.map(item => {
        if (item.visible !== false) {
           makeValidator(item)
        }
      })
    }
    return rules
  }
</script>

<style lang='less'>
._iform{
  .el-form-item__label{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 12px;
    height: 100%;
  }
  .el-form-item{
    margin-bottom: 18px;
  }
  .el-switch__label{
    font-size: 12px;
  }
  .clearfix{
    overflow: hidden;
  }
  .clearfix:after{
    content: '';
    display: block;
    clear: both;
  }
  .el-input-group__append_render {
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    user-select: none;
    -webkit-user-select: none;
  }
}

</style>
